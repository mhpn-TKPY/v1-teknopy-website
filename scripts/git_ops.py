import subprocess
import os

os.chdir("/vercel/share/v0-project")
r = subprocess.run(["git", "status"], capture_output=True, text=True)
print(r.stdout)
print(r.stderr)
