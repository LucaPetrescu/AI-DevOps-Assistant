import os
from flask import Flask, json
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

if __name__ == '__main__':
    
    app.run(debug=True, port=5000)