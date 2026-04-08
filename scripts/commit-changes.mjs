import { execSync } from 'child_process';
import path from 'path';

console.log('[v0] Script de commit - Email verification system');

const projectDir = '/vercel/share/v0-project';

try {
  // Change to project directory
  process.chdir(projectDir);
  
  console.log('[v0] Configuration Git...');
  execSync('git config user.email "v0[bot]@users.noreply.github.com"', { stdio: 'inherit' });
  execSync('git config user.name "v0[bot]"', { stdio: 'inherit' });
  
  console.log('[v0] Vérification du statut Git...');
  execSync('git status', { stdio: 'inherit' });
  
  console.log('[v0] Ajout de tous les fichiers...');
  execSync('git add -A', { stdio: 'inherit' });
  
  console.log('[v0] Création du commit...');
  const commitMessage = `feat: Add email verification system with magic links

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

Co-authored-by: v0[bot] <v0[bot]@users.noreply.github.com>`;

  execSync(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`, { stdio: 'inherit' });
  
  console.log('[v0] Push des changements...');
  execSync('git push origin v0/mhpn-tkpy-dd69e83a', { stdio: 'inherit' });
  
  console.log('[v0] ✅ Commit et push complétés avec succès!');
} catch (error) {
  console.error('[v0] ❌ Erreur:', error.message);
  process.exit(1);
}
