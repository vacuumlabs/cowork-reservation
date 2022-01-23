import json 
from flask import jsonify, request, make_response, render_template 
from flask.blueprints import Blueprint 
from app.daos import tenant_dao 
from app.firebase_utils import * 
from app.services import user_service 
from app.user_dao import user_dao 
 
users_bp = Blueprint("users_bp", __name__) 
 
@users_bp.route("/users", methods=["GET"]) 
def get_multiple(): 
    accessible_roles = ["SUPER_ADMIN","TENANT_ADMIN"] 
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles) 
    if returned_value["have_access"]: 
        params = user_service.url_args_to_query_params_dict(request.args, False) 
        values_for_return = user_dao.get_users( 
            returned_value,  
            params['filters'], 
            params['sort'],  
            params['range'] 
            ) 
        return user_service.response(values_for_return['data'],values_for_return['count'], 200) 
    else: 
        return user_service.response(status_code=403) 
 
@users_bp.route("/users", methods=["POST"]) 
def create_tenant_admin(): 
    accessible_roles = ["SUPER_ADMIN","TENANT_ADMIN"] 
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles) 
    if returned_value["have_access"]: 
        data = request.json 
        success = user_dao.create_user(**data) 
        if success: 
            return user_service.response(success,status_code=200) 
        else: 
            return user_service.response(status_code=500) 
    else: 
        return user_service.response(status_code=403) 
 
@users_bp.route("/users/<id>", methods=["DELETE"]) 
def del_tenant(id): 
    accessible_roles = ["SUPER_ADMIN","TENANT_ADMIN"] 
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles) 
    if returned_value["have_access"]: 
        '''success = user_dao.delete_user(id)
        if success: 
            return user_service.response() '''
        return  user_service.response(user_dao.update_user(have_claims, id, {"role":"", "tenantId": ""}))
    return user_service.response(status_code=403) 
 
@users_bp.route("/users/<id>", methods=["PUT"]) 
def update_tenant_admin(id): 
    accessible_roles = ["SUPER_ADMIN", "TENANT_ADMIN", "USER"] 
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles) 
    if returned_value["have_access"]: 
        data = request.json 
        success = user_dao.update_user(returned_value, id, data) 
        if success: 
            return user_service.response(success,status_code=200) 
        else: 
            return user_service.response(status_code=500) 
    return user_service.response(status_code=403)

@users_bp.route("/users/<id>", methods=["GET"])
def get_one_user(id):
    accessible_roles = ["SUPER_ADMIN","TENANT_ADMIN", "USER"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if returned_value["have_access"]:
        return user_service.response(user_dao.get_one(returned_value, id))
    else:
        return user_service.response(status_code=403)