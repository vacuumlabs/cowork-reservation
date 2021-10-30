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
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(app)
    db.create_all(app=app)
    api.init_app(app)
    return app
