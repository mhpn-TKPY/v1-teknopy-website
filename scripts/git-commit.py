import subprocess
import os
os.chdir("/vercel/share/v0-project")
result = subprocess.run(["git", "status"], capture_output=True, text=True)
print(result.stdout)
print(result.stderr)
result2 = subprocess.run(["git", "log", "--oneline", "-3"], capture_output=True, text=True)
print(result2.stdout)
