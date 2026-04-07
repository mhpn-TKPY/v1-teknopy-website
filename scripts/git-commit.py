import subprocess
import os

repo = '/vercel/share/v0-project'
branch = 'v0/mhpn-tkpy-dd69e83a'
msg = 'feat: add contact form email verification with magic links and Web3Forms'

os.chdir(repo)

r1 = subprocess.run(['git', 'config', 'user.email', 'v0bot@users.noreply.github.com'], capture_output=True, text=True)
r2 = subprocess.run(['git', 'config', 'user.name', 'v0bot'], capture_output=True, text=True)
r3 = subprocess.run(['git', 'add', '-A'], capture_output=True, text=True)
r4 = subprocess.run(['git', 'commit', '-m', msg], capture_output=True, text=True)
r5 = subprocess.run(['git', 'push', 'origin', branch], capture_output=True, text=True)

print('config email:', r1.returncode)
print('config name:', r2.returncode)
print('git add:', r3.stdout, r3.stderr)
print('git commit:', r4.stdout, r4.stderr)
print('git push:', r5.stdout, r5.stderr)
