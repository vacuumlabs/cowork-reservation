import json
from flask import jsonify, request, make_response, render_template
from flask.blueprints import Blueprint
from app.daos import building_dao,service_accounts_dao
from app.firebase_utils import have_claims
from app.services import building_service

from app.api.service_account import service_account

building_bp = Blueprint("building_bp", __name__)

@building_bp.route("/buildings", methods=["GET"])
def get_building_list():
    # TODO: check if tenant has permissions to view all buildings
    params = building_service.url_args_to_query_params_dict(request.args)
    results = building_dao.get_all(params['filters'], params['sort'], params['range'])
    return building_service.response(results['data'],results['count'])

@building_bp.route("/buildings/<id>", methods=["GET"])
def get_building_one(id):
    #TODO: check if tenant has permissions to view desired building
    return building_service.response(building_dao.get_one(id))

@building_bp.route("/buildings/<id>", methods=["PUT"])
def update_building(id):
    accessible_roles = ["SUPER_ADMIN"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if not returned_value["have_access"]:
        return building_service.response(status_code=403)
        
    data = request.json
    return building_service.response(building_dao.update(id, data))

@building_bp.route("/buildings/<id>", methods=["DELETE"])
def delete_building(id):
    accessible_roles = ["SUPER_ADMIN"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if not returned_value["have_access"]:
        return building_service.response(status_code=403)

    holder = building_dao.get_one(id)
    tenant_service = service_accounts_dao.get_by_tennant_id(returned_value['tenant_id'])
    delete_Building(tenant_service['google_id'],holder['name'])
    building_dao.delete(id)
    return building_service.response()


@building_bp.route("/buildings", methods=["POST"])
def create_building():
    accessible_roles = ["SUPER_ADMIN"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if not returned_value["have_access"]:
        return building_service.response(status_code=403)

    data = request.json
    tenant_service = service_accounts_dao.get_by_tennant_id(returned_value['tenant_id'])
    create_buildings(tenant_service['google_id'], data['name'], data['floors'])
    new_building = building_dao.add(data)
    return building_service.response(new_building)

    