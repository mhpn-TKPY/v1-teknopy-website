#!/usr/bin/env python3
import subprocess
import os
import sys

os.chdir('/vercel/share/v0-project')

try:
    print("Git Configuration...")
    subprocess.run(['git', 'config', 'user.email', 'v0bot@users.noreply.github.com'], check=True)
    subprocess.run(['git', 'config', 'user.name', 'v0bot'], check=True)
    
    print("Git Status...")
    status = subprocess.run(['git', 'status', '--porcelain'], capture_output=True, text=True)
    print("Modified files:")
    print(status.stdout)
    
    print("Adding all files...")
    subprocess.run(['git', 'add', '-A'], check=True)
    
    print("Creating commit...")
    subprocess.run(['git', 'commit', '-F', 'COMMIT_MESSAGE.txt'], check=True)
    
    print("Pushing to branch...")
    subprocess.run(['git', 'push', 'origin', 'v0/mhpn-tkpy-dd69e83a'], check=True)
    
    print("SUCCESS: Commit and push completed!")
    
except subprocess.CalledProcessError as e:
    print("ERROR Git:", str(e))
    sys.exit(1)
except Exception as e:
    print("ERROR:", str(e))
    sys.exit(1)
