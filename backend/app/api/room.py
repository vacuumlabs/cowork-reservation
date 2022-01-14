import json
from flask import jsonify, request, make_response, render_template
from flask.blueprints import Blueprint
from app.daos import room_dao
from app.firebase_utils import have_claims

room_bp = Blueprint("room_bp", __name__)

@room_bp.route("/rooms", methods=["GET"])
def get_room_list():
    # TODO: check if tenant has permissions to view all rooms
    url_args = request.args
    filters = {}
    sort = []
    results_range = []
    for key, value in url_args.items(multi=True):
        if key == "id":
            if "id" in filters:
                filters['id'].append(int(value))
            else:
                filters['id'] = [int(value)]
        elif key == "_sort":
            sort.insert(0,str(value))
        elif key == "_order":
            sort.insert(1,str(value))
        elif key == "_start":
            results_range.insert(0,int(value))
        elif key == "_end":
            results_range.insert(1,int(value))
        else:
            if key in filters:
                filters[key].append(value)
            else:
                filters[key] = [value]
    results = room_dao.get_all(filters, sort, results_range)
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
    