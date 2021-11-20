from flask import jsonify, request, render_template
from flask.blueprints import Blueprint
from app.daos import tenant_dao

tenant_bp = Blueprint("tenant_bp", __name__)


@tenant_bp.route("/tenant", methods=["GET"])
def get_tenants():
    return jsonify(tenant_dao.get_all())


@tenant_bp.route("/tenant", methods=["POST"])
def insert_tenant():
    try:
        if request.method == "POST":
            print(request)
            message_json = {}
            message_json["name"] = request.form.get("name")
            message_json["city"] = request.form.get("city")
            message_json["email"] = request.form.get("email")
            print(
                tenant_dao.add_tenant(
                    message_json["name"],
                    message_json["city"],
                    message_json["email"],
                )
            )
            return render_template("base.html")
    except Exception as err:
        return str(err)
