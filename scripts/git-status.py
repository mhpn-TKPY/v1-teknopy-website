import subprocess
import os

os.chdir('/vercel/share/v0-project')
result = subprocess.run(['git', 'status', '--porcelain'], capture_output=True, text=True)
print(result.stdout)
print(result.stderr)
