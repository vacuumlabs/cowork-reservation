import os
import logging
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, render_template
from flask_migrate import Migrate
from flask_cors import CORS
from app.utils import config_logging

db = SQLAlchemy()
migrate = Migrate()


def create_app(config_filename):
    app = Flask(__name__)
    try:
        config_logging
        CORS(app)
        app.config.from_pyfile(config_filename)
        if new_value := os.environ.get("SQLALCHEMY_DATABASE_URI"):
            app.config["SQLALCHEMY_DATABASE_URI"] = new_value
        db.init_app(app)
        migrate.init_app(app, db)
        register_blueprints(app)
        register_error_handlers(app)
    except Exception as error:
        logging.exception(error)
    return app


def register_blueprints(app: Flask):
    # --Blueprints Imports--#
    from .api.default import default_bp, swagger_bp, swagger_url
    from .api.tenant import tenant_bp
    from .api.calendar import calendar_bp
    from .api.room import room_bp
    from .api.event import event_bp

    # Blueprints registrations
    app.register_blueprint(default_bp)
    app.register_blueprint(swagger_bp, url_prefix=swagger_url)
    app.register_blueprint(tenant_bp)
    app.register_blueprint(calendar_bp)
    app.register_blueprint(room_bp)
    app.register_blueprint(event_bp)


def register_error_handlers(app: Flask):
    # 400 - Bad Request
    @app.errorhandler(400)
    def bad_request(e):
        return render_template("error.html"), 400

    # 403 - Forbidden
    @app.errorhandler(403)
    def forbidden(e):
        return render_template("error.html"), 403

    # 404 - Page Not Found
    @app.errorhandler(404)
    def page_not_found(e):
        return render_template("error.html"), 404

    # 405 - Method Not Allowed
    @app.errorhandler(405)
    def method_not_allowed(e):
        return render_template("error.html"), 405

    # 500 - Internal Server Error
    @app.errorhandler(500)
    def server_error(e):
        return render_template("error.html"), 500
