import json
from flask import jsonify, request, make_response, render_template
from flask.blueprints import Blueprint
from app.daos import tenant_dao
from app.firebase_utils import have_claims, get_users
from app.services import tenant_service

tenant_bp = Blueprint("tenant_bp", __name__)


@tenant_bp.route("/tenants/<id>", methods=["GET"])
def get_one_tenant(id):
    accessible_roles = ["SUPER_ADMIN","TENANT_ADMIN"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if returned_value["have_access"]:
            return jsonify(tenant_dao.get_one(id))
    else:
        return make_response(jsonify({}),403)

@tenant_bp.route("/tenants/<id>", methods=["PUT"])
def update_tenant(id):
    accessible_roles = ["SUPER_ADMIN"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if returned_value["have_access"]:
        data = request.json
        return jsonify(tenant_dao.update(id, data))
    else:
        return make_response(jsonify({}),403)

@tenant_bp.route("/tenants/<id>", methods=["DELETE"])
def del_tenant(id):
    accessible_roles = ["SUPER_ADMIN"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if returned_value["have_access"]:
        tenant_dao.delete(id)
        return jsonify({})
    else:
        return make_response(jsonify({}),403)

@tenant_bp.route("/tenants", methods=["POST"])
def insert_tenant():
    accessible_roles = ["SUPER_ADMIN"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if returned_value["have_access"]:
        try:
            if request.method == "POST":
                new_tenant = tenant_dao.add(
                    request.form.get("name"),
                    request.form.get("city"),
                    request.form.get("email")
                )
                return jsonify(new_tenant)
        except Exception as err:
            return str(err)
    else:
        return make_response(jsonify({}),403)

@tenant_bp.route("/tenants", methods=["GET"])
def get_multiple():
    accessible_roles = ["SUPER_ADMIN","TENANT_ADMIN"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if returned_value["have_access"]:
        if returned_value["user_role"] == accessible_roles[0]:
            values_for_return = get_users()
        else:
            values_for_return = get_users(returned_value[1])
        return make_response(jsonify(values_for_return),200)
    else:
        return make_response(jsonify({}),403)