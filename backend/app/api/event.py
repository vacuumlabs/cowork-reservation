import datetime
from flask import jsonify, request, make_response, render_template
from flask.blueprints import Blueprint
from app.daos import event_dao,service_accounts_dao,calendar_dao,room_dao
from app.services import event_service
from app.firebase_utils import have_claims

event_bp = Blueprint("event_bp", __name__)
from app.api.service_account import service_account


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
            updateted_event = event_dao.change_duration(id, data["minutes"])
            event_dao.delete(id)
            holder = service_accounts_dao.get_by_tennant_id(updateted_event['tenant_id'])
            cretated_event = create_event(updateted_event['name'], holder['google_id'], updateted_event["start"], updateted_event["end"], holder['google_id'],
                         holder['google_id'])

            return event_service.response(updateted_event)
        else:

            updateted_event = event_dao.update(id, data)
            event_dao.delete(id)
            holder = service_accounts_dao.get_by_tennant_id(updateted_event['tenant_id'])
            cretated_event = create_event(updateted_event['name'], holder['google_id'], updateted_event["start"],
                                          updateted_event["end"], holder['google_id'],
                                          holder['google_id'])
            return event_service.response(updateted_event)
    return event_service.response(status_code=403)


@event_bp.route("/events/<id>", methods=["DELETE"])
def delete(id):
    accessible_roles = ["SUPER_ADMIN","TENANT_ADMIN"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if returned_value["have_access"]:
        event_data = event_dao.get_one(int(id))
        name = room_dao.get_one(int(event_data['room_id']))
        calendar_data_to_update = calendar_dao.get_all_calendars_by_name(name['name'])
        if len(calendar_data_to_update) != 0:
            holder = service_accounts_dao.get_by_tennant_id(calendar_data_to_update[0]['tenant_id'])
            delted_event = delete_event(holder['google_id'], event_data['google_id'])
            return delted_event
        else:
            event_dao.delete(id)

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
def create(roomId):
    accessible_roles = ["SUPER_ADMIN","TENANT_ADMIN"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if returned_value["have_access"]:
        data = request.json

        name = room_dao.get_one(int(roomId))
        calendar_data_to_update = calendar_dao.get_all_calendars_by_name(name['name'])
        if len(calendar_data_to_update) != 0 :
            holder = service_accounts_dao.get_by_tennant_id(calendar_data_to_update[0]['tenant_id'])
            new_event = create_event(data['name'], holder['google_id'], data["start"], data["end"], holder['google_id'], holder['google_id'])
            return new_event
        else:
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