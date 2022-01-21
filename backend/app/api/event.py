import datetime
from flask import jsonify, request, make_response, render_template
from flask.blueprints import Blueprint
from app.daos import event_dao
from app.services import event_service
from app.firebase_utils import have_claims

event_bp = Blueprint("event_bp", __name__)


@event_bp.route("/events", methods=["GET"])
def get_multiple():
    accessible_roles = ["*"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if returned_value["have_access"]:
        url_args = request.args
        params = event_service.url_args_to_query_params_dict(url_args)
        results = event_dao.get_all(
            params['filters'],
            params['sort'], 
            params['range']
            )
        return event_service.response(results['data'],results['count'])
    return event_service.response(status_code=403)


@event_bp.route("/events/<id>", methods=["GET"])
def get_one(id):
    accessible_roles = ["*"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if returned_value["have_access"]:
        return event_service.response(event_dao.get_one(id))
    return event_service.response(status_code=403)


@event_bp.route("/events/<id>", methods=["PUT"])
def update(id):
    accessible_roles = ["*"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if returned_value["have_access"]:
        data = request.json
        if "minutes" in data:
            event_dao.update(id, data)
            return event_service.response(event_dao.change_duration(id, data["minutes"]))
        else:
            return event_service.response(event_dao.update(id, data))
    return event_service.response(status_code=403)


@event_bp.route("/events/<id>", methods=["DELETE"])
def delete(id):
    accessible_roles = ["SUPER_ADMIN","TENANT_ADMIN"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if returned_value["have_access"]:
        event_dao.delete(id)
        return event_service.response()
    return event_service.response(status_code=403)


@event_bp.route("/events/<id>/cancel", methods=["GET"])
def end_event(id):
    accessible_roles = ["*"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if returned_value["have_access"]:
        return event_service.response(event_dao.cancel_event(id))
    return event_service.response(status_code=403)


@event_bp.route("/events", methods=["POST"])
def create():
    accessible_roles = ["SUPER_ADMIN","TENANT_ADMIN"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if returned_value["have_access"]:
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
    return event_service.response(status_code=403)