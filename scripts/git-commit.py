#!/usr/bin/env python3
import subprocess
import os

os.chdir('/vercel/share/v0-project')

subprocess.run(['git', 'config', 'user.email', 'v0[bot]@users.noreply.github.com'])
subprocess.run(['git', 'config', 'user.name', 'v0[bot]'])
subprocess.run(['git', 'add', '-A'])
subprocess.run(['git', 'commit', '-F', 'COMMIT_MESSAGE.txt'])
subprocess.run(['git', 'push', 'origin', 'v0/mhpn-tkpy-dd69e83a'])

print("Done")
