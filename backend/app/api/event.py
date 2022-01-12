import datetime
import json
from flask import jsonify, request, make_response, render_template
from flask.blueprints import Blueprint
from app.daos import event_dao

event_bp = Blueprint("event_bp", __name__)

@event_bp.route("/events", methods=["GET"])
def get_multiple():
    # TODO: check if tenant has permissions to view all events
    url_args = request.args
    filters = {}
    sort = []
    results_range = []
    for key, value in url_args.items(multi=True):
        if key == "id":
            if "id" in filters:
                filters['id'].append(int(value))
            else:
                filters['id'] = [int(value)]
        elif key == "_sort":
            sort.insert(0,str(value))
        elif key == "_order":
            sort.insert(1,str(value))
        elif key == "_start":
            results_range.insert(0,int(value))
        elif key == "_end":
            results_range.insert(1,int(value))
        else:
            if key in filters:
                filters[key].append(value)
            else:
                filters[key] = [value]
    results = event_dao.get_all(filters, sort, results_range)
    resp = make_response(jsonify(results['data']), 200)
    resp.headers['Access-Control-Expose-Headers'] = 'X-Total-Count'
    resp.headers['X-Total-Count'] = results['count']
    return resp
