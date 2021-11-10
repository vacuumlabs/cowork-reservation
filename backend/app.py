import sys

from sqlalchemy.engine.url import URL

sys.path.append("./")

from flask import Flask
from api import api
from db.models import db
from db.config_database import ConfigDatabase


def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = URL(
        "postgresql", **ConfigDatabase.postgres_access
    )
    print(app.config["SQLALCHEMY_DATABASE_URI"])
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    try:
        db.init_app(app)
        db.create_all(app=app)
    except:
        print("--------------------!!!Database is not running!!!")
    api.init_app(app)
    return app
