import sys
from sqlalchemy.engine.url import URL

sys.path.append("./")
from flask import Flask
from db.models import db
from db.config_database import ConfigDatabase
from flask_migrate import Migrate


def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = URL(
        "postgresql", **ConfigDatabase.postgres_access
    )
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(app)
    migrate = Migrate()
    migrate.init_app(app, db)
    from api import api

    api.init_app(app)
    return app
