import platform
import docker

def detect_system():
    return platform.system()

def check_for_docker():
    client = docker.from_env()
    
    try:
        client.ping()
        response = {"isDockerOn": True}
    except:
        response = {"isDockerOn": False}

    return response