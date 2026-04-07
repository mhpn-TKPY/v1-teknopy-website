#!/usr/bin/env python3
import subprocess
import os
import sys

os.chdir('/vercel/share/v0-project')

try:
    print("[v0] Configuration Git...")
    subprocess.run(['git', 'config', 'user.email', 'v0[bot]@users.noreply.github.com'], check=True)
    subprocess.run(['git', 'config', 'user.name', 'v0[bot]'], check=True)
    
    print("[v0] Vérification du statut Git...")
    status = subprocess.run(['git', 'status', '--porcelain'], capture_output=True, text=True)
    print("[v0] Fichiers modifiés:")
    print(status.stdout)
    
    print("[v0] Ajout de tous les fichiers...")
    subprocess.run(['git', 'add', '-A'], check=True)
    
    print("[v0] Création du commit...")
    commit_message = """feat: Add email verification system with magic links

Implemented complete contact form workflow with email verification:
- Magic link verification system with 24-hour token expiration
- Two-stage email process (verification + summary)
- Web3Forms integration for email delivery
- Admin summary email to manuel.harpon@teknopy.com
- User confirmation email with message recap
- Supabase database integration for verification tracking
- Secure token generation and validation
- Production-ready error handling and logging

Files added:
- API routes: /api/contact and /api/contact/verify
- Verification page: /verify-email
- Services: token, email-templates, web3forms, supabase-service
- Database migration: email_verifications table
- Documentation: Setup guide, deployment guide, checklist
- Configuration: Environment variables (.env.local)

Co-authored-by: v0[bot] <v0[bot]@users.noreply.github.com>"""
    
    subprocess.run(['git', 'commit', '-m', commit_message], check=True)
    
    print("[v0] Push vers la branche...")
    subprocess.run(['git', 'push', 'origin', 'v0/mhpn-tkpy-dd69e83a'], check=True)
    
    print("[v0] ✅ Commit et push terminés avec succès!")
    
except subprocess.CalledProcessError as e:
    print(f"[v0] ❌ Erreur Git: {e}")
    sys.exit(1)
except Exception as e:
    print(f"[v0] ❌ Erreur: {e}")
    sys.exit(1)
