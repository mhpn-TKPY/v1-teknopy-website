-- Sécurise is_admin — trouvé en préparant la migration d'identité
-- atelier-maths (2026-09-04) : is_admin est référencé partout dans le code
-- (app/admin, app/espace-client, notify-message) mais n'apparaît dans
-- AUCUNE migration versionnée de 001_create_profiles.sql — ajouté un jour
-- directement en base, hors dépôt. Pire : ni la policy INSERT
-- (`profiles_insert_own`) ni la policy UPDATE (`profiles_update_own`) ne
-- restreignent cette colonne — n'importe quel utilisateur connecté pouvait
-- s'auto-attribuer is_admin=true via un simple appel
-- `.from('profiles').update({is_admin: true})`, contournant entièrement
-- app/auth/inscription/page.tsx qui ne le fait QUE pour
-- manuel.harpon@teknopy.com (un contrôle côté client, jamais appliqué côté
-- base — la vraie porte d'entrée d'un attaquant n'a pas besoin de cette page).
--
-- Colonne ajoutée ici si elle manque encore (IF NOT EXISTS, sans risque si
-- déjà présente en prod) ; protection par trigger BEFORE INSERT/UPDATE qui
-- réinitialise is_admin sauf pour service_role — la seule façon fiable de
-- protéger UNE colonne quand PostgreSQL RLS ne permet pas un WITH CHECK
-- différent par colonne dans une policy UPDATE.

alter table public.profiles
  add column if not exists is_admin boolean not null default false;

create or replace function public.protect_is_admin()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  -- Bloque UNIQUEMENT un appel direct, non privilégié (une requête PostgREST
  -- venant d'un client anon/authenticated). Deux échappatoires légitimes,
  -- toutes deux nécessaires :
  --   - current_user = 'service_role' : appel direct avec la clé
  --     service_role (server.ts / route API), rôle réel de connexion.
  --   - pg_trigger_depth() > 1 : cette mise à jour est un EFFET DE BORD d'un
  --     autre trigger (ex. on_auth_user_created_admin dans setup-admin.sql,
  --     qui tourne SECURITY DEFINER — current_user y devient le PROPRIÉTAIRE
  --     de la fonction, 'postgres', PAS 'service_role' ; vérifier le rôle
  --     seul aurait donc aussi bloqué ce trigger légitime. La profondeur de
  --     déclenchement distingue correctement "appel direct" de "déclenché en
  --     cascade par un autre trigger", peu importe le propriétaire de ce
  --     dernier.
  if current_user <> 'service_role' and pg_trigger_depth() <= 1 then
    if tg_op = 'INSERT' then
      new.is_admin := false;
    elsif tg_op = 'UPDATE' then
      new.is_admin := old.is_admin;
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists protect_is_admin_trigger on public.profiles;
create trigger protect_is_admin_trigger
  before insert or update on public.profiles
  for each row execute function public.protect_is_admin();

-- setup-admin.sql reste la voie légitime pour marquer un compte admin : son
-- trigger (on_auth_user_created_admin) déclenche la mise à jour de
-- is_admin depuis un AUTRE trigger (celui sur auth.users), donc à une
-- profondeur > 1 — non affecté par la protection ci-dessus (voir son
-- commentaire). Rejoué ici pour couvrir le compte déjà existant sans
-- attendre une nouvelle inscription :
update public.profiles
set is_admin = true
where id in (select id from auth.users where email = 'manuel.harpon@teknopy.com')
  and is_admin is distinct from true;
