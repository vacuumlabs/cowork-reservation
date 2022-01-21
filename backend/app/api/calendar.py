from flask import jsonify, request, make_response, render_template
from flask.blueprints import Blueprint
from app.daos import calendar_dao
from app.firebase_utils import have_claims
from app.services import calendar_service

calendar_bp = Blueprint("calendar_bp", __name__)


@calendar_bp.route("/calendars/", methods=["GET"])
def get_calendar_list():
    # TODO: check if tenant has permissions to view all calendars
    url_args = request.args
    params = calendar_service.url_args_to_query_params_dict(url_args)
    results = calendar_dao.get_all(params["filters"], params["sort"], params["range"])
    return calendar_service.response(results['data'],results['count'])


@calendar_bp.route("/calendars/<id>", methods=["GET"])
def get_calendar(id):
    # TODO: check if tenant has permissions to view desired calendar
    return calendar_service.response(calendar_dao.get_one(id))


@calendar_bp.route("/calendars/<id>", methods=["PUT"])
def update_calendar(id):
    if not have_claims(request.headers.get("Authorization")):
        return calendar_service.response(status_code=403)
    data = request.json
    return calendar_service.response(calendar_dao.update(id, data))


@calendar_bp.route("/calendars/<id>", methods=["DELETE"])
def delete_calendar(id):
    if not have_claims(request.headers.get("Authorization")):
        return calendar_service.response(status_code=403)
    calendar_dao.delete(id)
    return calendar_service.response()


@calendar_bp.route("/calendars/", methods=["POST"])
def create_calendar():
    if not have_claims(request.headers.get("Authorization")):
        return calendar_service.response(status_code=403)
    data = request.json
    new_calendar = calendar_dao.add(
        int(data["tenant_id"]),
        data["name"],
        data["google_id"],
        data["resource_id"],
        data["webhook_id"],
    )
    return calendar_service.response(new_calendar)
