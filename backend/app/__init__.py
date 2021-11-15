from flask_sqlalchemy import SQLAlchemy
from flask import Flask

# --Blueprints Imports--#
from api.default import default_bp, swagger_bp, swagger_url
from api.tenant import tenant_bp

db = SQLAlchemy()


def create_app(config_filename):
    app = Flask(__name__)
    app.config.from_pyfile(config_filename)
    db.init_app(app)

    # Blueprints registrations
    app.register_blueprint(default_bp)
    app.register_blueprint(swagger_bp, url_prefix=swagger_url)
    app.register_blueprint(tenant_bp)
    return app
