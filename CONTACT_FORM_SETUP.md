# Système de Formulaire de Contact avec Vérification par Magic Link

## Vue d'ensemble

Ce système implémente un processus sécurisé de soumission de formulaire de contact en trois étapes :

1. **Soumission du formulaire** : L'utilisateur remplit le formulaire et soumet son message
2. **Vérification par email** : Un email avec un magic link est envoyé à l'adresse de l'utilisateur
3. **Confirmation et notification** : Une fois le lien cliqué, les emails de confirmation sont envoyés à l'utilisateur et à l'administrateur

## Architecture

### Composants

- **`components/contact-form.tsx`** : Formulaire React interactif
- **`app/verify-email/page.tsx`** : Page de vérification qui traite le magic link
- **`app/api/contact/route.ts`** : Endpoint pour la soumission initiale du formulaire
- **`app/api/contact/verify/route.ts`** : Endpoint pour la vérification du token

### Utilitaires

- **`lib/token.ts`** : Génération et validation des tokens de vérification
- **`lib/email-templates.ts`** : Templates HTML pour les emails
- **`lib/web3forms.ts`** : Service d'envoi d'emails via Web3Forms API
- **`lib/supabase-service.ts`** : Opérations Supabase pour stocker les données

### Base de données

#### Table `email_verifications`

```sql
CREATE TABLE public.email_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  contact_data JSONB NOT NULL,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '24 hours',
  verified_at TIMESTAMPTZ
);
```

#### Modifications à la table `contacts`

```sql
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false;
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS sent_to_admin BOOLEAN DEFAULT false;
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS sent_to_user BOOLEAN DEFAULT false;
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS service TEXT;
```

## Flux de travail complet

### Étape 1 : Soumission du formulaire

```
POST /api/contact
{
  name: "Jean Dupont",
  email: "jean@example.com",
  phone: "+596 696 123456",
  service: "Site Web Vitrine",
  message: "Je souhaite créer un site..."
}
```

**Actions:**
- Validation des données
- Stockage du contact en base de données (is_verified = false)
- Génération d'un token unique de 32 bytes
- Stockage du token avec un délai d'expiration de 24h
- Envoi d'un email de vérification avec magic link

**Réponse:**
```json
{
  "success": true,
  "message": "Email de vérification envoyé. Veuillez vérifier votre inbox.",
  "contactId": "uuid"
}
```

### Étape 2 : Clic sur le magic link

L'utilisateur reçoit un email avec un lien du type :
```
https://www.plistech.com/verify-email?token=abc123...
```

### Étape 3 : Vérification et confirmation

```
GET /api/contact/verify?token=abc123...
```

**Actions:**
- Récupération du token en base de données
- Vérification de l'expiration (24h max)
- Récupération des données de contact stockées
- Envoi de l'email de résumé à l'administrateur
- Envoi de l'email de confirmation à l'utilisateur
- Marquage du token comme vérifié

**Réponse:**
```json
{
  "success": true,
  "message": "Merci ! Votre email a été vérifié...",
  "email": "jean@example.com"
}
```

## Configuration requise

### Variables d'environnement

```env
# Web3Forms
WEB3FORMS_ACCESS_KEY=dd2f81b5-56ac-4e05-8320-ae65fddec383

# URL de base (pour générer les magic links)
NEXT_PUBLIC_BASE_URL=https://www.plistech.com

# Email administrateur
ADMIN_EMAIL=manuel.harpon@teknopy.com

# Supabase (déjà configuré par l'intégration)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

## Emails envoyés

### 1. Email de vérification (à l'utilisateur)

Contient un bouton de vérification avec le magic link.
- Destinataire : l'utilisateur
- Expire après 24h si non cliqué

### 2. Email de résumé administrateur (après vérification)

Contient tous les détails de la demande.
- Destinataire : manuel.harpon@teknopy.com
- Envoyé uniquement après vérification de l'email

### 3. Email de confirmation utilisateur (après vérification)

Récapitulatif du message avec numéro de suivi.
- Destinataire : l'utilisateur
- Preuve que la demande a été traitée

## Sécurité

- **Tokens cryptographiques** : Générés avec `crypto.randomBytes(32)`
- **Expiration des tokens** : 24 heures maximum
- **Validation des emails** : Vérification du format avec regex
- **Stockage sécurisé** : Supabase avec chiffrement
- **Protection contre les robots** : Vérification de l'email valide et non éphémère

## Dépannage

### L'email de vérification n'est pas reçu

1. Vérifiez la clé `WEB3FORMS_ACCESS_KEY` dans les variables d'environnement
2. Vérifiez que l'adresse email est valide (pas d'email éphémère)
3. Vérifiez les logs d'erreur dans la console du serveur

### Le lien de vérification ne fonctionne pas

1. Vérifiez que la `NEXT_PUBLIC_BASE_URL` est correcte
2. Vérifiez que le token n'a pas expiré (24h maximum)
3. Vérifiez les logs avec la clé token

### Les emails d'admin/utilisateur ne sont pas reçus

1. Vérifiez la clé `ADMIN_EMAIL`
2. Vérifiez que Web3Forms est configuré correctement
3. Vérifiez les logs du serveur pour les erreurs d'envoi

## Scripts de nettoyage (optionnel)

Pour nettoyer les tokens expirés :

```sql
DELETE FROM public.email_verifications 
WHERE expires_at < NOW();
```
