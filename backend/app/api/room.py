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
    resp = make_response(jsonify(results['data']), 200)
    resp.headers['Access-Control-Expose-Headers'] = 'X-Total-Count'
    resp.headers['X-Total-Count'] = results['count']
    return resp

@room_bp.route("/rooms/<id>", methods=["GET"])
def get_room_one(id):
    #TODO: check if tenant has permissions to view desired room
    return jsonify(room_dao.get_one(id))

@room_bp.route("/rooms/<id>", methods=["PUT"])
def update_room(id):
    if not have_claims(request.cookies.get("login_token"),"SUPER_ADMIN"):
        return make_response(jsonify({}), 403)
    data = request.json
    return jsonify(room_dao.update(id, data))

@room_bp.route("/rooms/<id>", methods=["DELETE"])
def delete_room(id):
    if not have_claims(request.cookies.get("login_token"),"SUPER_ADMIN"):
        return make_response(jsonify({}), 403)
    room_dao.delete(id)
    return jsonify({})


@room_bp.route("/rooms", methods=["POST"])
def create_room():
    if not have_claims(request.cookies.get("login_token"),"SUPER_ADMIN"):
        return make_response(jsonify({}), 403)
    data = request.json
    new_room = room_dao.add(
        data["city"],
        int(data["capacity"]),
        data["equipment"],
        data["building"],
        int(data["room_number"] if "room_number" in data else data["roomNumber"])
    )
    return jsonify(new_room)

    