import datetime
from flask import jsonify, request, make_response, render_template
from flask.blueprints import Blueprint
from app.daos import event_dao
from app.services import event_service

event_bp = Blueprint("event_bp", __name__)


@event_bp.route("/events", methods=["GET"])
def get_multiple():
    # TODO: check if tenant has permissions to view all events
    url_args = request.args
    params = event_service.url_args_to_query_params_dict(url_args)
    results = event_dao.get_all(
        params['filters'],
        params['sort'], 
        params['range']
        )
    return event_service.response(results['data'],results['count'])


@event_bp.route("/events/<id>", methods=["GET"])
def get_one(id):
    # TODO: check if tenant has permissions to view desired event
    return event_service.response(event_dao.get_one(id))


@event_bp.route("/events/<id>", methods=["PUT"])
def update(id):
    # TODO: check if tenant has permissions to update desired event
    data = request.json
    if "minutes" in data:
        event_dao.update(id, data)
        return event_service.response(event_dao.change_duration(id, data["minutes"]))
    else:
        return event_service.response(event_dao.update(id, data))


@event_bp.route("/events/<id>", methods=["DELETE"])
def delete(id):
    event_dao.delete(id)
    return event_service.response()


@event_bp.route("/events/<id>/cancel", methods=["GET"])
def end_event(id):
    return event_service.response(event_dao.cancel_event(id))


@event_bp.route("/events", methods=["POST"])
def create():
    data = request.json
    new_event = event_dao.add(
        int(data["calendar_id"]),
        int(data["room_id"]),
        str(data["name"]),
        datetime.datetime.strptime(data["start"], "%Y-%m-%dT%H:%M:%S"),
        datetime.datetime.strptime(data["end"], "%Y-%m-%dT%H:%M:%S"),
        str(data["google_id"]),
        int(data["tenant_id"]),
    )
    return event_service.response(new_event)
