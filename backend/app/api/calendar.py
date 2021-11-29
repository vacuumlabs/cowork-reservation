from flask import jsonify, request, render_template
from flask.blueprints import Blueprint
from app.daos import calendar_dao

calendar_bp = Blueprint("calendar_bp", __name__)

@calendar_bp.route("/calendar/", methods=["GET"])
def get_calendar():
    #TODO: check if tenant has permissions to view all calendars
    urlArgs = request.args.to_dict()
    queryArgs = {}
    if "id" in urlArgs: queryArgs['id'] = urlArgs['id']
    if "tenant_id" in urlArgs: queryArgs['tenant_id'] = urlArgs['tenant_id']
    if "name" in urlArgs: queryArgs['name'] = urlArgs['name']
    if queryArgs:
        return jsonify(calendar_dao.get(queryArgs))
    else:
        return jsonify(calendar_dao.get_all())

@calendar_bp.route("/calendar/<id>/", methods=["DELETE"])
def del_calendar(id):
    #TODO: check if tenant has permissions to delete calendars
    calendar_dao.delete_calendar(id)
    return get_calendar()

@calendar_bp.route("/calendar/", methods=["POST"])
def insert_calendar():
     #TODO: check if tenant has permissions to add calendars
    try:
        data = request.json
        calendar_dao.add_calendar(
            int(data["tenant_id"]),
            data["name"],
            data["google_id"]
        )
        return get_calendar()
    except Exception as err:
        return str(err)
