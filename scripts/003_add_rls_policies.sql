-- Script pour configurer les politiques RLS (Row Level Security) sur Supabase
-- Conformément aux recommandations Supabase pour sécuriser les données

-- ============================================
-- TABLE: contacts
-- ============================================

-- S'assurer que RLS est activé
ALTER TABLE IF EXISTS public.contacts ENABLE ROW LEVEL SECURITY;

-- Supprimer toutes les politiques existantes sur la table contacts
DO $$ 
DECLARE
    policy_record RECORD;
BEGIN
    FOR policy_record IN 
        SELECT policyname FROM pg_policies WHERE tablename = 'contacts' AND schemaname = 'public'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.contacts', policy_record.policyname);
    END LOOP;
END $$;

-- 1. Politique d'insertion publique (pour le formulaire de contact)
-- Permet à n'importe qui de soumettre un formulaire de contact
CREATE POLICY "contacts_insert_public" 
ON public.contacts
FOR INSERT 
WITH CHECK (true);

-- 2. Politique de lecture pour les utilisateurs authentifiés
-- Seuls les utilisateurs authentifiés peuvent lire les contacts
CREATE POLICY "contacts_select_authenticated" 
ON public.contacts
FOR SELECT 
USING (auth.role() = 'authenticated');

-- 3. Politique de mise à jour pour les utilisateurs authentifiés
CREATE POLICY "contacts_update_authenticated" 
ON public.contacts
FOR UPDATE 
USING (auth.role() = 'authenticated');

-- 4. Politique de suppression pour les utilisateurs authentifiés
CREATE POLICY "contacts_delete_authenticated" 
ON public.contacts
FOR DELETE 
USING (auth.role() = 'authenticated');
