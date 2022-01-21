from flask import jsonify, request, make_response, render_template
from flask.blueprints import Blueprint
from app.daos import calendar_dao
from app.firebase_utils import have_claims
from app.services import calendar_service

calendar_bp = Blueprint("calendar_bp", __name__)


@calendar_bp.route("/calendars/", methods=["GET"])
def get_calendar_list():
    accessible_roles = ["*"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if returned_value["have_access"]:
        url_args = request.args
        params = calendar_service.url_args_to_query_params_dict(url_args)
        results = calendar_dao.get_all(params["filters"], params["sort"], params["range"])
        return calendar_service.response(results['data'],results['count'])
    return calendar_service.response(status_code=403)

@calendar_bp.route("/calendars/<id>", methods=["GET"])
def get_calendar(id):
    accessible_roles = ["*"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if returned_value["have_access"]:
        return calendar_service.response(calendar_dao.get_one(id))
    return calendar_service.response(status_code=403)

@calendar_bp.route("/calendars/<id>", methods=["PUT"])
def update_calendar(id):
    accessible_roles = ["SUPER_ADMIN","TENANT_ADMIN"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if not returned_value["have_access"]:
        return calendar_service.response(status_code=403)
    data = request.json
    return calendar_service.response(calendar_dao.update(id, data))


@calendar_bp.route("/calendars/<id>", methods=["DELETE"])
def delete_calendar(id):
    accessible_roles = ["SUPER_ADMIN","TENANT_ADMIN"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if not returned_value["have_access"]:
        return calendar_service.response(status_code=403)
    calendar_dao.delete(id)
    return calendar_service.response()


@calendar_bp.route("/calendars/", methods=["POST"])
def create_calendar():
    accessible_roles = ["SUPER_ADMIN","TENANT_ADMIN"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if returned_value["have_access"]:
        data = request.json
        new_calendar = calendar_dao.add(
            int(data["tenant_id"]),
            data["name"],
            data["google_id"],
            data["resource_id"],
            data["webhook_id"],
        )
        return calendar_service.response(new_calendar)
    return calendar_service.response(status_code=403)
    
