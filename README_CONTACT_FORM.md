## 🎉 Système de Formulaire de Contact avec Vérification par Magic Link

### Qu'est-ce qui a été implémenté ?

✅ **Formulaire de contact** sécurisé avec vérification par email
✅ **Magic link** pour confirmer l'adresse email
✅ **3 emails automatisés** : vérification, résumé admin, confirmation utilisateur
✅ **Web3Forms** pour l'envoi d'emails fiable
✅ **Supabase** pour le stockage des données

---

## 🚀 Démarrage rapide

### 1. Variables d'environnement (✅ Déjà configurées)

```env
# .env.local
WEB3FORMS_ACCESS_KEY=dd2f81b5-56ac-4e05-8320-ae65fddec383
NEXT_PUBLIC_BASE_URL=https://www.plistech.com
ADMIN_EMAIL=manuel.harpon@teknopy.com
```

### 2. Test local

```bash
# Installer les dépendances
pnpm install

# Lancer le serveur
pnpm dev

# Ouvrir http://localhost:3000
```

### 3. Tester le formulaire

1. Allez sur le site
2. Remplissez le formulaire de contact
3. Soumettez
4. Vérifiez votre email pour le lien de vérification
5. Cliquez sur le lien
6. Vérifiez les emails de confirmation

---

## 📁 Structure du système

```
├── app/
│   ├── api/
│   │   └── contact/
│   │       ├── route.ts          # Soumission du formulaire
│   │       └── verify/
│   │           └── route.ts      # Vérification du token
│   └── verify-email/
│       └── page.tsx              # Page de vérification
├── components/
│   └── contact-form.tsx          # Formulaire React
├── lib/
│   ├── token.ts                  # Gestion des tokens
│   ├── email-templates.ts        # Templates d'emails
│   ├── web3forms.ts              # Service Web3Forms
│   └── supabase-service.ts       # Opérations Supabase
├── scripts/
│   └── 002_add_email_verification.sql  # Migration BDD
└── .env.local                    # Variables d'environnement
```

---

## 📧 Les 3 emails envoyés

### 1️⃣ Email de vérification
- **À:** l'utilisateur
- **Quand:** immédiatement après la soumission
- **Contient:** magic link de vérification
- **Expire:** après 24h si non cliqué

### 2️⃣ Email de résumé administrateur
- **À:** manuel.harpon@teknopy.com
- **Quand:** après clic sur le magic link
- **Contient:** tous les détails de la demande

### 3️⃣ Email de confirmation utilisateur
- **À:** l'utilisateur
- **Quand:** après clic sur le magic link
- **Contient:** récapitulatif du message

---

## 🔄 Flux de travail

```
┌─────────────────────────────────────────────────────┐
│ 1. Utilisateur soumet le formulaire                │
│    → Validation des données                        │
│    → Stockage en base de données                   │
│    → Génération d'un token unique                  │
│    → Envoi email de vérification                   │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│ 2. Utilisateur reçoit email avec magic link       │
│    → Lien: https://www.plistech.com/verify-email  │
│      ?token=abc123...                              │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│ 3. Utilisateur clique sur le lien                  │
│    → Vérification du token                         │
│    → Envoi email résumé à l'admin                  │
│    → Envoi email confirmation à l'utilisateur      │
│    → Redirection à la page d'accueil               │
└─────────────────────────────────────────────────────┘
```

---

## 🔒 Sécurité

- **Tokens cryptographiques** : générés avec `crypto.randomBytes(32)`
- **Expiration des tokens** : 24 heures maximum
- **Validation des emails** : format stricte + non-éphémère
- **Stockage sécurisé** : Supabase avec chiffrement
- **Service d'email fiable** : Web3Forms 99.9% uptime

---

## 📚 Documentation complète

Pour plus de détails, consultez :

- **`SETUP_CHECKLIST.md`** - Checklist de configuration
- **`CONTACT_FORM_SETUP.md`** - Documentation technique
- **`IMPLEMENTATION.md`** - Détails de l'implémentation
- **`DEPLOYMENT_GUIDE.md`** - Guide de déploiement Vercel

---

## 🧪 Commandes utiles

```bash
# Tester le système local
pnpm dev

# Voir les logs
tail -f .next/logs/server.log

# Tester avec cURL
bash test-contact.sh http://localhost:3000

# Déployer sur Vercel
vercel --prod
```

---

## ⚙️ Configuration Supabase

### Tables créées
- `email_verifications` : stocke les tokens de vérification
- `contacts` : stocke les demandes (modifiée avec 3 colonnes)

### Exécuter la migration
```sql
-- Ouvrez Supabase Console > SQL Editor
-- Copiez le contenu de: scripts/002_add_email_verification.sql
-- Exécutez la query
```

---

## 🚀 Déploiement

### Checklist pré-déploiement
- [ ] Migration SQL exécutée dans Supabase
- [ ] Variables d'environnement dans Vercel (Settings > Environment Variables)
- [ ] Test local effectué
- [ ] Changements pushés vers GitHub

### Déployer
```bash
# Les changements sont détectés automatiquement par Vercel
git push origin main

# Ou déployer manuellement
vercel --prod
```

---

## 🆘 Dépannage rapide

### "Email non reçu"
→ Vérifiez `WEB3FORMS_ACCESS_KEY` dans `.env.local`

### "Lien ne fonctionne pas"
→ Vérifiez `NEXT_PUBLIC_BASE_URL=https://www.plistech.com`

### "Erreur base de données"
→ Exécutez la migration SQL dans Supabase console

### "Build échoue sur Vercel"
→ Vérifiez les logs Vercel pour erreurs TypeScript

---

## 📞 Support

Consultez la documentation complète ou les logs serveur pour déboguer.

---

**Système prêt ! 🎉** Testez en local puis déployez sur Vercel.
