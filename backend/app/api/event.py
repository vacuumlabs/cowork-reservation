import datetime
import json
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
    if returned_value[0]:
        url_args = request.args
        params = event_service.url_args_to_query_params_dict(url_args)
        results = event_dao.get_all(
            params['filters'],
            params['sort'], 
            params['range']
            )
        resp = make_response(jsonify(results['data']), 200)
        resp.headers['Access-Control-Expose-Headers'] = 'X-Total-Count'
        resp.headers['X-Total-Count'] = results['count']
        return resp
    return make_response(jsonify({}), 403)

@event_bp.route("/events/<id>", methods=["GET"])
def get_one(id):
    accessible_roles = ["*"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if returned_value[0]:
        return jsonify(event_dao.get_one(id))
    return make_response(jsonify({}), 403)

@event_bp.route("/events/<id>", methods=["PUT"])
def update(id):
    accessible_roles = ["*"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if returned_value[0]:
        data = request.json
        if "minutes" in data:
            event_dao.update(id, data)
            return jsonify(event_dao.change_duration(id, data["minutes"]))
        else:    
            return jsonify(event_dao.update(id, data))
    return make_response(jsonify({}), 403)

@event_bp.route("/events/<id>", methods=["DELETE"])
def delete(id):
    accessible_roles = ["SUPER_ADMIN","TENANT_ADMIN"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if returned_value[0]:
        event_dao.delete(id)
        return jsonify({})
    return make_response(jsonify({}), 403)

@event_bp.route("/events/<id>/cancel", methods=["GET"])
def end_event(id):
    accessible_roles = ["*"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if returned_value[0]:
        return jsonify(event_dao.cancel_event(id))
    return make_response(jsonify({}), 403)

@event_bp.route("/events", methods=["POST"])
def create():
    accessible_roles = ["SUPER_ADMIN","TENANT_ADMIN"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if returned_value[0]:
        data = request.json
        new_event = event_dao.add(
            int(data["calendar_id"]),
            int(data["room_id"]),
            str(data["name"]),
            datetime.datetime.strptime(data["start"], '%Y-%m-%dT%H:%M:%S'),
            datetime.datetime.strptime(data["end"], '%Y-%m-%dT%H:%M:%S'),
            str(data["google_id"]),
            int(data["tenant_id"]),
            bool(data["status"])
        )
        return jsonify(new_event)
    return make_response(jsonify({}), 403)