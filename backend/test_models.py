import urllib.request
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

try:
    url = "https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyDrFu-AUTs4PJZ2uMqeBjFSrlPxzAnJ9M0"
    with urllib.request.urlopen(url, context=ctx) as response:
        data = json.loads(response.read().decode())
        for model in data.get('models', []):
            if 'generateContent' in model.get('supportedGenerationMethods', []):
                print(model['name'])
except Exception as e:
    print(f"Error: {e}")
