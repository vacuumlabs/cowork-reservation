from flask import jsonify, request, render_template
from flask.blueprints import Blueprint
from app.daos import room_dao

room_bp = Blueprint("room_bp", __name__)


@room_bp.route("/room/", methods=["GET"])
def get_room():
    #TODO: check if tenant has permissions to view all rooms
    return jsonify(room_dao.get_all())

@room_bp.route("/room/<city>/", methods=["GET"])
def get_room_by_city(city):
    #TODO: check if tenant has permissions to view all rooms
    return jsonify(room_dao.get_by_city(city))

@room_bp.route("/room/<id>/", methods=["DELETE"])
def del_room(id):
    room_dao.delete_room(id)
    return jsonify(room_dao.get_all())

@room_bp.route("/room/", methods=["POST"])
def insert_room():
    try:
        data = request.json
        room_dao.add_room(
            data["city"],
            int(data["capacity"]),
            data["equipment"],
            data["building"],
            int(data["room_number"])
        )
        return get_room()
    except Exception as err:
        return str(err)