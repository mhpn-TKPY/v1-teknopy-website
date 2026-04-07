#!/bin/bash

# Script pour committer les changements du système de formulaire de contact

cd /vercel/share/v0-project

echo "[v0] Configuration Git..."
git config user.email "v0[bot]@users.noreply.github.com"
git config user.name "v0[bot]"

echo "[v0] Vérification du statut..."
git status

echo "[v0] Ajout de tous les fichiers..."
git add -A

echo "[v0] Création du commit..."
git commit -m "feat: Add email verification system with magic links

- Implement two-step verification process for contact form
- Store email verifications in Supabase with 24h expiration
- Send verification email with magic link via Web3Forms
- Send final summary emails to admin and user after verification
- Add verification page at /verify-email with token handling
- Create reusable services for tokens, emails, and Web3Forms integration
- Add comprehensive documentation and deployment guides
- Update contact form UI with verification workflow messages

Features:
- Cryptographic token generation using crypto.randomBytes
- Email validation and anti-robot protection
- Secure storage of verification data in Supabase
- Three types of emails: verification, admin summary, user confirmation
- Automatic token expiration after 24 hours
- Detailed logging with [v0] prefix for debugging

Co-authored-by: v0[bot] <v0[bot]@users.noreply.github.com>"

echo "[v0] Push des changements..."
git push origin v0/mhpn-tkpy-dd69e83a

echo "[v0] ✅ Commit et push complétés avec succès!"
