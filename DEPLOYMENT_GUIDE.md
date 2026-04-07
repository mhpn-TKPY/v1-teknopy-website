# 🚀 Guide de déploiement sur Vercel

## Vue d'ensemble

Votre système de formulaire avec vérification par magic link est maintenant prêt à être déployé en production sur Vercel.

---

## ✅ Checklist pré-déploiement

- [ ] Tous les fichiers sont créés et testés localement
- [ ] Variables d'environnement configurées dans `.env.local`
- [ ] Base de données Supabase créée et accessible
- [ ] Web3Forms API key validée et fonctionnelle
- [ ] Domaine custom plistech.com disponible
- [ ] GitHub repository poussé avec tous les changements
- [ ] Tests locaux effectués (formulaire → email → vérification)

---

## 📝 Étape 1: Mise à jour du dépôt Git

```bash
# Assurez-vous d'être dans le bon repo
cd v1-teknopy-website

# Ajouter les nouveaux fichiers
git add -A

# Commit des changements
git commit -m "feat: add email verification system with magic links"

# Pousser vers GitHub
git push origin main
```

---

## 🔧 Étape 2: Variables d'environnement sur Vercel

1. Allez sur votre projet Vercel (https://vercel.com/dashboard)
2. Cliquez sur votre projet "v1-teknopy-website"
3. Allez dans **Settings** → **Environment Variables**
4. Ajoutez les variables suivantes (ou mettez à jour si elles existent) :

### Variables à ajouter/mettre à jour:

```
WEB3FORMS_ACCESS_KEY = dd2f81b5-56ac-4e05-8320-ae65fddec383
NEXT_PUBLIC_BASE_URL = https://www.plistech.com
ADMIN_EMAIL = manuel.harpon@teknopy.com
```

### Variables Supabase (vérifiez qu'elles existent):

```
NEXT_PUBLIC_SUPABASE_URL = [votre URL Supabase]
NEXT_PUBLIC_SUPABASE_ANON_KEY = [votre clé anon Supabase]
SUPABASE_SERVICE_ROLE_KEY = [votre clé service role Supabase]
```

---

## 🗄️ Étape 3: Mise en place de la base de données

### Option A: Via Supabase Console (Recommandé)

1. Allez sur https://app.supabase.com
2. Sélectionnez votre projet
3. Allez dans **SQL Editor**
4. Créez une nouvelle query avec le contenu de `scripts/002_add_email_verification.sql`
5. Exécutez la query
6. Vérifiez que les tables sont créées

### Option B: Via ligne de commande Supabase CLI

```bash
# Installer Supabase CLI (si pas fait)
npm install -g @supabase/cli

# Authentifier
supabase login

# Lancer le script
supabase db push scripts/002_add_email_verification.sql
```

---

## 🧪 Étape 4: Test pré-déploiement

Avant de déployer, testez en local :

```bash
# Installer les dépendances
pnpm install

# Lancer le serveur local
pnpm dev

# Tester le formulaire
# 1. Allez sur http://localhost:3000
# 2. Remplissez le formulaire
# 3. Soumettez
# 4. Vérifiez les logs serveur pour erreurs
# 5. Vérifiez votre email pour le lien de vérification
```

---

## 🌐 Étape 5: Déploiement sur Vercel

### Via GitHub (Automatique)

1. Poussez vos changements sur GitHub main branch
2. Vercel détecte automatiquement les changements
3. Un déploiement se lance
4. Vérifiez que le build passe sans erreurs

### Via Vercel CLI (Manuel)

```bash
# Installer Vercel CLI
npm install -g vercel

# Déployer
vercel --prod

# Vercel vous guidera à travers le processus
```

---

## ✅ Étape 6: Tests post-déploiement

Après le déploiement sur https://www.plistech.com :

1. **Test du formulaire:**
   - Allez sur https://www.plistech.com/#contact
   - Remplissez le formulaire avec un vrai email
   - Soumettez
   - Vérifiez que vous recevez un email de vérification

2. **Test du magic link:**
   - Cliquez sur le lien dans l'email
   - Vérifiez que la page /verify-email charge correctement
   - Vérifiez que vous êtes redirigé après 3 secondes

3. **Test des emails:**
   - Vérifiez que manuel.harpon@teknopy.com reçoit l'email résumé
   - Vérifiez que l'utilisateur reçoit l'email de confirmation
   - Vérifiez le formatage HTML des emails

4. **Test des erreurs:**
   - Tentez avec un email invalide (doit être rejeté)
   - Tentez avec un token expiré (doit afficher erreur)
   - Tentez sans token (doit afficher erreur)

---

## 🔍 Monitoring en production

### Logs Vercel

1. Allez sur Vercel Dashboard
2. Sélectionnez votre projet
3. Cliquez sur **Logs** ou **View Runtime Logs**
4. Cherchez les erreurs avec le prefix `[v0]`

### Logs Supabase

1. Allez sur https://app.supabase.com
2. Sélectionnez votre projet
3. Allez dans **Logs** pour voir les requêtes SQL
4. Vérifiez que les tables sont accessibles

### Test Web3Forms

1. Allez sur https://web3forms.com
2. Connectez-vous avec votre compte
3. Vérifiez les logs des emails envoyés
4. Cherchez les erreurs de délivrance

---

## 🆘 Troubleshooting

### "Build failed on Vercel"
- Vérifiez les logs de build
- Cherchez les erreurs de TypeScript
- Vérifiez que toutes les imports sont correctes
- Confirmez que les variables d'environnement sont configurées

### "Email ne s'envoie pas"
- Vérifiez `WEB3FORMS_ACCESS_KEY` dans Vercel env vars
- Vérifiez les logs Vercel pour erreurs API Web3Forms
- Testez directement via Web3Forms API
- Vérifiez que le domaine `from_email` est autorisé

### "Lien de vérification ne fonctionne pas"
- Vérifiez que `NEXT_PUBLIC_BASE_URL` = https://www.plistech.com
- Vérifiez que le certificat SSL est valide
- Testez le lien dans un incognito/private window
- Vérifiez les logs pour "Token invalide ou expiré"

### "Erreur Supabase en production"
- Vérifiez que la clé `SUPABASE_SERVICE_ROLE_KEY` est configurée
- Vérifiez que les tables `email_verifications` et colonnes `contacts` existent
- Vérifiez les permissions RLS dans Supabase
- Exécutez le script de migration manuelle si needed

---

## 📊 Optimisations recommandées

### 1. Rate Limiting
Ajouter rate limiting pour les soumissions de formulaire :

```typescript
// Dans /app/api/contact/route.ts
import { Ratelimit } from '@upstash/ratelimit';
const ratelimit = new Ratelimit({...});
```

### 2. Analytics
Suivre les soumissions de formulaire :

```typescript
// Envoyer un événement analytics
analytics.track('contact_form_submitted', { service });
```

### 3. Backup des emails
Archiver les emails envoyés dans une table separate pour audit.

---

## 🔒 Sécurité en production

- ✅ HTTPS obligatoire (fourni par Vercel)
- ✅ Tokens cryptographiques sécurisés
- ✅ Variables d'environnement protégées
- ✅ Pas d'exposition de secrets dans les logs
- ✅ Validation stricte des inputs
- ✅ Protection CORS configurée
- ✅ Rate limiting recommandé

---

## 📞 Support

Si vous rencontrez des problèmes :

1. **Vérifiez les logs** (Vercel + Supabase + Web3Forms)
2. **Relisez la documentation** (`CONTACT_FORM_SETUP.md`, `IMPLEMENTATION.md`)
3. **Testez localement** pour isoler le problème
4. **Consultez le dépannage** (voir section Troubleshooting)

---

## ✨ Résumé

Votre système de formulaire est maintenant **production-ready** et prêt à être déployé sur Vercel ! 

Une fois déployé, vous aurez :
- ✅ Un formulaire sécurisé avec vérification par magic link
- ✅ Trois emails automatisés et sécurisés
- ✅ Tous les contacts stockés en Supabase
- ✅ Scalabilité automatique via Vercel
- ✅ Support 99.9% uptime
