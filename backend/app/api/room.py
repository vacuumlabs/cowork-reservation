import json
from flask import jsonify, request, make_response, render_template
from flask.blueprints import Blueprint
from app.daos import room_dao
from app.firebase_utils import have_claims
from app.services import room_service

room_bp = Blueprint("room_bp", __name__)

@room_bp.route("/rooms", methods=["GET"])
def get_room_list():
    # TODO: check if tenant has permissions to view all rooms
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

@room_bp.route("/rooms/<id>", methods=["GET"])
def get_room_one(id):
    #TODO: check if tenant has permissions to view desired room
    return room_service.response(room_dao.get_one(id))

@room_bp.route("/rooms/<id>", methods=["PUT"])
def update_room(id):
    if not have_claims(request.headers.get("Authorization"),"SUPER_ADMIN"):
        return room_service.response(status_code=403)
    data = request.json
    return room_service.response(room_dao.update(id, data))

@room_bp.route("/rooms/<id>", methods=["DELETE"])
def delete_room(id):
    if not have_claims(request.headers.get("Authorization"),"SUPER_ADMIN"):
        return room_service.response(status_code=403)
    room_dao.delete(id)
    return room_service.response()


@room_bp.route("/rooms", methods=["POST"])
def create_room():
    if not have_claims(request.headers.get("Authorization"),"SUPER_ADMIN"):
        return room_service.response(status_code=403)
    data = request.json
    new_room = room_dao.add(
        data["city"],
        int(data["capacity"]),
        data["equipment"],
        data["building"],
        int(data["room_number"] if "room_number" in data else data["roomNumber"])
    )
    return room_service.response(new_room)

    