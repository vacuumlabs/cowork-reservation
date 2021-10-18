from flask import Flask
import sys

# both local and docker approach had issues with finding modules in working directory so this line was added to append cwd
sys.path.append("./")
from api import api


def create_app():
    app = Flask(__name__)
    api.init_app(app)
    return app
