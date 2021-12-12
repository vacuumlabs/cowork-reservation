import json
from flask import jsonify, request, render_template
from flask.blueprints import Blueprint
from app.daos import room_dao

room_bp = Blueprint("room_bp", __name__)

@room_bp.route("/rooms", methods=["GET"])
def get_room_list():
    # TODO: check if tenant has permissions to view all rooms
    url_args = request.args.to_dict()
    filters = {}
    sort = []
    results_range = []
    if "filter" in url_args:
        filters = json.loads(url_args["filter"])
    if "sort" in url_args:
        sort = json.loads(url_args["sort"])
    if "range" in url_args:
        results_range = json.loads(url_args["range"])
    return jsonify(room_dao.get_all(filters, sort, results_range))

@room_bp.route("/rooms/<id>", methods=["GET"])
def get_room_one(id):
    #TODO: check if tenant has permissions to view desired room
    return jsonify(room_dao.get_one(id))

@room_bp.route("/rooms/<id>", methods=["PUT"])
def update_room(id):
    # TODO: check if tenant has permissions to update desired room
    data = request.json
    return jsonify(room_dao.update_room(id, data))

@room_bp.route("/rooms/<id>", methods=["DELETE"])
def delete_room(id):
    room_dao.delete_room(id)
    return jsonify(room_dao.get_all())

@room_bp.route("/rooms", methods=["POST"])
def create_room():
    try:
        data = request.json
        room_dao.add_room(
            data["city"],
            int(data["capacity"]),
            data["equipment"],
            data["building"],
            int(data["room_number"])
        )
        return get_room_list()
    except Exception as err:
        return str(err)