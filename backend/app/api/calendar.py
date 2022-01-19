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
    if returned_value[0]:
        url_args = request.args
        params = calendar_service.url_args_to_query_params_dict(url_args)
        results = calendar_dao.get_all(
            params['filters'],
            params['sort'], 
            params['range']
            )
        resp = make_response(jsonify(results["data"]), 200)
        resp.headers["Access-Control-Expose-Headers"] = "X-Total-Count"
        resp.headers["X-Total-Count"] = results["count"]
        return resp
    return make_response(jsonify({}), 403)

@calendar_bp.route("/calendars/<id>", methods=["GET"])
def get_calendar(id):
    accessible_roles = ["*"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if returned_value[0]:
        return jsonify(calendar_dao.get_one(id))
    return make_response(jsonify({}), 403)


@calendar_bp.route("/calendars/<id>", methods=["PUT"])
def update_calendar(id):
    accessible_roles = ["SUPER_ADMIN","TENANT_ADMIN"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if returned_value[0]:
        data = request.json
        return jsonify(calendar_dao.update(id, data))
    return make_response(jsonify({}), 403)


@calendar_bp.route("/calendars/<id>", methods=["DELETE"])
def delete_calendar(id):
    accessible_roles = ["SUPER_ADMIN","TENANT_ADMIN"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if returned_value[0]:
        calendar_dao.delete(id)
        return jsonify({})
    return make_response(jsonify({}), 403)


@calendar_bp.route("/calendars/", methods=["POST"])
def create_calendar():
    accessible_roles = ["SUPER_ADMIN","TENANT_ADMIN"]
    returned_value = have_claims(request.headers.get("Authorization"),accessible_roles)
    if returned_value[0]:
        data = request.json
        new_calendar = calendar_dao.add(
            int(data["tenant_id"]), data["name"], int(data["google_id"])
        )
        return jsonify(new_calendar)
    return make_response(jsonify({}), 403)
    
