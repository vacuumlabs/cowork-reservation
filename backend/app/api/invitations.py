from flask import request
from flask.blueprints import Blueprint
from app.daos import invites_dao
from app.services import invites_service
from app.firebase_utils import have_claims
from app.utils import camel_to_snake_dict

invites_bp = Blueprint("invites_bp", __name__)

@invites_bp.route("/invites", methods=["GET"])
def get_invite_list():
    accessible_roles = ["SUPER_ADMIN","TENANT_ADMIN"]
    access_rights = have_claims(request.headers.get("Authorization"),accessible_roles)
    if not access_rights["have_access"]:
        return invites_service.response(status_code=403)
    url_args = request.args
    params = invites_service.url_args_to_query_params_dict(url_args)
    if access_rights["user_role"] == "TENANT_ADMIN":
        params["filters"]["id"] = access_rights["tenant_id"]
    results = invites_dao.get_all( params['filters'], params['sort'], params['range'])
    return invites_service.response(results['data'],results['count'])

@invites_bp.route("/invites/<id>", methods=["GET"])
def get_invite_one(id):
    accessible_roles = ["SUPER_ADMIN","TENANT_ADMIN"]
    access_rights = have_claims(request.headers.get("Authorization"),accessible_roles)
    if access_rights["have_access"]:
        requested_invite = invites_dao.get_one(id)
        if access_rights["user_role"] == "TENANT_ADMIN" and requested_invite:
            if requested_invite["tenant_id"] != access_rights["tenant_id"]:
                return invites_service.response()
        return invites_service.response(requested_invite)
    return invites_service.response(status_code=403)

@invites_bp.route("/invites/<id>", methods=["PUT"])
def update_invite(id):
    accessible_roles = ["SUPER_ADMIN","TENANT_ADMIN"]
    access_rights = have_claims(request.headers.get("Authorization"),accessible_roles)
    if not access_rights["have_access"]:
        return invites_service.response(status_code=403)
    data = request.json
    return invites_service.response(invites_dao.update(id, data))

@invites_bp.route("/invites/<id>", methods=["DELETE"])
def delete_invite(id):
    accessible_roles = ["SUPER_ADMIN","TENANT_ADMIN"]
    access_rights = have_claims(request.headers.get("Authorization"),accessible_roles)
    if not access_rights["have_access"]:
        return invites_service.response(status_code=403)
    invites_dao.delete(id)
    #invites_dao.update(id, {"status": "Not active"})
    return invites_service.response()


@invites_bp.route("/invites", methods=["POST"])
def create_invite():
    accessible_roles = ["SUPER_ADMIN","TENANT_ADMIN"]
    access_rights = have_claims(request.headers.get("Authorization"), accessible_roles)
    if not access_rights["have_access"]:
        return invites_service.response(status_code=403)
    data = request.json
    data = camel_to_snake_dict(data)
    if access_rights["user_role"] != "SUPER_ADMIN":
        data["tenant_id"] = access_rights["tenant_id"]
    new_invite = invites_dao.add(data)
    return invites_service.response(new_invite)