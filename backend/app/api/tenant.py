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
            return tenant_service.response(tenant_dao.get_one(id))
    else:
        return tenant_service.response(status_code=403)

@tenant_bp.route("/tenants", methods=["GET"])
def get_tenant_list():
    accessible_roles = {"SUPER_ADMIN","TENANT_ADMIN"}
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if returned_value["have_access"]:
        url_args = request.args
        params = tenant_service.url_args_to_query_params_dict(url_args)
        results = tenant_dao.get_all(
            params['filters'],
            params['sort'], 
            params['range']
            )
        return tenant_service.response(results['data'],results['count'], 200)
    else:
        return tenant_service.response(status_code=403)

@tenant_bp.route("/tenants/<id>", methods=["PUT"])
def update_tenant(id):
    accessible_roles = ["SUPER_ADMIN"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if returned_value["have_access"]:
        data = request.json
        return tenant_service.response(tenant_dao.update(id, data))
    else:
        return tenant_service.response(status_code=403)

@tenant_bp.route("/tenants/<id>", methods=["DELETE"])
def del_tenant(id):
    accessible_roles = ["SUPER_ADMIN"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if returned_value["have_access"]:
        tenant_dao.delete(id)
        return tenant_service.response()
    else:
        return tenant_service.response(status_code=403)

@tenant_bp.route("/tenants", methods=["POST"])
def insert_tenant():
    accessible_roles = ["SUPER_ADMIN"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if returned_value["have_access"]:
        data = request.json
        new_tenant = tenant_dao.add(data)
        return tenant_service.response(new_tenant)
    else:
        return tenant_service.response(status_code=403)
        