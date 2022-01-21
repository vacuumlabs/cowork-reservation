import json
from flask import jsonify, request, make_response, render_template
from flask.blueprints import Blueprint
from app.daos import city_dao
from app.firebase_utils import have_claims
from app.services import city_service

city_bp = Blueprint("city_bp", __name__)

@city_bp.route("/cities", methods=["GET"])
def get_city_list():
    # TODO: check if tenant has permissions to view all cities
    params = city_service.url_args_to_query_params_dict(request.args)
    results = city_dao.get_all(params['filters'], params['sort'], params['range'])
    resp = make_response(jsonify(results['data']), 200)
    resp.headers['Access-Control-Expose-Headers'] = 'Content-Range'
    resp.headers['Content-Range'] = results['count']
    return resp

@city_bp.route("/cities/<id>", methods=["GET"])
def get_city_one(id):
    #TODO: check if tenant has permissions to view desired city
    return jsonify(city_dao.get_one(id))

@city_bp.route("/cities/<id>", methods=["PUT"])
def update_city(id):
    if not have_claims(request.headers.get("Authorization"),"SUPER_ADMIN"):
        return make_response(jsonify({}), 403)
    data = request.json
    return jsonify(city_dao.update(id, data))

@city_bp.route("/cities/<id>", methods=["DELETE"])
def delete_city(id):
    if not have_claims(request.headers.get("Authorization"),"SUPER_ADMIN"):
        return make_response(jsonify({}), 403)
    city_dao.delete(id)
    return jsonify({})


@city_bp.route("/cities", methods=["POST"])
def create_city():
    if not have_claims(request.headers.get("Authorization"),"SUPER_ADMIN"):
        return make_response(jsonify({}), 403)
    data = request.json
    new_city = city_dao.add(data)
    return jsonify(new_city)

    