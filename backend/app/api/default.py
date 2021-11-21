from flask.blueprints import Blueprint
from flask import render_template
from flask_swagger_ui import get_swaggerui_blueprint
from flask.helpers import send_from_directory

### swagger specific ###
swagger_url = "/swagger"
api_url = "/static/swagger.json"
swagger_bp = get_swaggerui_blueprint(
    swagger_url, api_url, config={"app_name": "Cowork-Reservation"}
)

default_bp = Blueprint("default_bp", __name__)


@default_bp.route("/", methods=["GET"])
def get_site():
    # TODO: Replace with correct html file
    return render_template("base.html")


@default_bp.route("/admin", methods=["GET"])
def get_admin_site():
    # TODO: Replace with correct html file
    return render_template("base.html")


@default_bp.route("/static/<path:path>")
def send_static(path):
    return send_from_directory("static", path)
