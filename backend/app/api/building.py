import json
from flask import jsonify, request, make_response, render_template
from flask.blueprints import Blueprint
from app.daos import building_dao
from app.firebase_utils import have_claims
from app.services import building_service

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
    if not have_claims(request.headers.get("Authorization"),"SUPER_ADMIN"):
        return building_service.response(status_code=403)
    data = request.json
    return building_service.response(building_dao.update(id, data))

@building_bp.route("/buildings/<id>", methods=["DELETE"])
def delete_building(id):
    if not have_claims(request.headers.get("Authorization"),"SUPER_ADMIN"):
        return building_service.response(status_code=403)
    building_dao.delete(id)
    return building_service.response()


@building_bp.route("/buildings", methods=["POST"])
def create_building():
    if not have_claims(request.headers.get("Authorization"),"SUPER_ADMIN"):
        return building_service.response(status_code=403)
    data = request.json
    new_building = building_dao.add(data)
    return building_service.response(new_building)

    