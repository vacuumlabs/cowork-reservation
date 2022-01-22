import json
from flask import jsonify, request, make_response, render_template
from flask.blueprints import Blueprint
from app.daos import room_dao,service_accounts_dao
from app.firebase_utils import have_claims
from app.services import room_service
from app.api.service_account import service_account

room_bp = Blueprint("room_bp", __name__)

@room_bp.route("/rooms", methods=["GET"])
def get_room_list():
    accessible_roles = ["*"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if returned_value["have_access"]:
        url_args = request.args
        params = room_service.url_args_to_query_params_dict(url_args)
        results = room_dao.get_all(
            params['filters'],
            params['sort'], 
            params['range'],
            True if "with-events" in request.args else False,
            True if "with-next-events" in request.args else False
            )
        return room_service.response(results['data'],results['count'])
    return room_service.response(status_code=403)

@room_bp.route("/rooms/<id>", methods=["GET"])
def get_room_one(id):
    accessible_roles = ["*"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if returned_value["have_access"]:
        return room_service.response(room_dao.get_one(id))
    return room_service.response(status_code=403)

@room_bp.route("/rooms/<id>", methods=["PUT"])
def update_room(id):
    accessible_roles = ["SUPER_ADMIN"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if not returned_value["have_access"]:
        return room_service.response(status_code=403)
    data = request.json
    return room_service.response(room_dao.update(id, data))

@room_bp.route("/rooms/<id>", methods=["DELETE"])
def delete_room(id):
    accessible_roles = ["SUPER_ADMIN"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if not returned_value["have_access"]:
        return room_service.response(status_code=403)
    holder = room_dao.get_one(id)
    tenant_service = service_accounts_dao.get_by_tennant_id(returned_value['tenant_id'])
    delete_Room(tenant_service['google_id'],holder['name'])
    room_dao.delete(id)
    return room_service.response()


@room_bp.route("/rooms", methods=["POST"])
def create_room():
    accessible_roles = ["SUPER_ADMIN"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if not returned_value["have_access"]:
        return room_service.response(status_code=403)
    data = request.json
    tenant_service = service_accounts_dao.get_by_tennant_id(returned_value['tenant_id'])
    create_Room(tenant_service['google_id'], data['name'], data["capacity"],  data["floor"],  data["building"])
    new_room = room_dao.add(
        data["city"],
        int(data["capacity"]),
        data["equipment"],
        data["building"],
        int(data["room_number"] if "room_number" in data else data["roomNumber"])
    )
    return room_service.response(new_room)

    