import json
from flask import jsonify, request, make_response, render_template
from flask.blueprints import Blueprint
from app.daos import room_dao
from app.firebase_utils import have_claims
from app.services import room_service

room_bp = Blueprint("room_bp", __name__)

@room_bp.route("/rooms", methods=["GET"])
def get_room_list():
    accessible_roles = ["*"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if returned_value[0]:
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
    return make_response(jsonify({}), 403)

@room_bp.route("/rooms/<id>", methods=["GET"])
def get_room_one(id):
    accessible_roles = ["*"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if returned_value[0]:   
        return jsonify(room_dao.get_one(id))
    return make_response(jsonify({}), 403)

@room_bp.route("/rooms/<id>", methods=["PUT"])
def update_room(id):
    accessible_roles = ["SUPER_ADMIN"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if not returned_value[0]:
        return make_response(jsonify({}), 403)
    data = request.json
    return jsonify(room_dao.update(id, data))

@room_bp.route("/rooms/<id>", methods=["DELETE"])
def delete_room(id):
    accessible_roles = ["SUPER_ADMIN"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if not returned_value[0]:
        return make_response(jsonify({}), 403)
    room_dao.delete(id)
    return jsonify({})


@room_bp.route("/rooms", methods=["POST"])
def create_room():
    accessible_roles = ["SUPER_ADMIN"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if not returned_value[0]:
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

    