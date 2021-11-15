import os
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, render_template
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()


def create_app(config_filename):
    app = Flask(__name__)
    app.config.from_pyfile(config_filename)
    if new_value := os.environ.get("SQLALCHEMY_DATABASE_URI"):
        app.config["SQLALCHEMY_DATABASE_URI"] = new_value
    db.init_app(app)
    migrate.init_app(app, db)
    register_blueprints(app)
    register_error_handlers(app)
    return app


def register_blueprints(app: Flask):
    # --Blueprints Imports--#
    from .api.default import default_bp, swagger_bp, swagger_url
    from .api.tenant import tenant_bp

    # Blueprints registrations
    app.register_blueprint(default_bp)
    app.register_blueprint(swagger_bp, url_prefix=swagger_url)
    app.register_blueprint(tenant_bp)


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
