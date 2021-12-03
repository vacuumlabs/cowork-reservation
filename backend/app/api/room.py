from flask import jsonify, request, render_template
from flask.blueprints import Blueprint
from app.daos import room_dao

room_bp = Blueprint("room_bp", __name__)


@room_bp.route("/room/", methods=["GET"])
def get_room_list():
    #TODO: check if tenant has permissions to view all rooms
    return jsonify(room_dao.get_all())

@room_bp.route("/room/<id>/", methods=["DELETE"])
def delete_room(id):
    room_dao.delete_room(id)
    return jsonify(room_dao.get_all())

@room_bp.route("/room/", methods=["POST"])
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