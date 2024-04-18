import os
import subprocess
from flask import Flask, json, request
from flask_cors import CORS
from utils import OS_utils

app = Flask(__name__)
CORS(app)

@app.route('/')
def say_hello():
    return "Hello, World!"

@app.route('/getRootDir', )
def get_root_dir():
    ROOT_DIR = os.path.abspath(os.path.sep)
    system = OS_utils.detect_system()
    data = {
        "rootDir": ROOT_DIR,
        "system": system
    }
    return json.dumps(data)

@app.route('/executeCommand', methods=['POST'])
def run_command():
    system = OS_utils.detect_system()
    if system == 'Windows':
        process = subprocess.run('docker "" "info"', shell=True, capture_output=True, text=True)
    
    print("aici", request.json)
    return "Hello"

if __name__ == '__main__':
    
    app.run(debug=True, port=5000)