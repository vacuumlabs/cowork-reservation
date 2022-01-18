import json
from flask import jsonify, request, make_response, render_template
from flask.blueprints import Blueprint
from app.daos import tenant_dao
from app.firebase_utils import have_claims
from app.services import tenant_service

tenant_bp = Blueprint("tenant_bp", __name__)


@tenant_bp.route("/tenants/<id>", methods=["GET"])
def get_one_tenant(id):
    if have_claims(request.cookies.get("login_token")):
        if have_claims(request.cookies.get("login_token"),"SUPER_ADMIN"):
            return jsonify(tenant_dao.get_one(id))
        else:
            #premenna = tenant_dao.get_one(id)

            return jsonify(tenant_dao.get_one(id))
    else:
        return render_template("error.html"), 403

@tenant_bp.route("/tenants/<id>", methods=["PUT"])
def update_tenant(id):
    if have_claims(request.cookies.get("login_token")):
        data = request.json
        return jsonify(tenant_dao.update(id, data))
    else:
        return render_template("error.html"), 403

@tenant_bp.route("/tenants/<id>", methods=["DELETE"])
def del_tenant(id):
    if have_claims(request.cookies.get("login_token")):
        tenant_dao.delete(id)
        return jsonify({})
    else:
        return render_template("error.html"), 403

@tenant_bp.route("/tenants", methods=["GET"])
def get_tenant_list():
    if have_claims(request.cookies.get("login_token")):
        url_args = request.args
        params = tenant_service.url_args_to_query_params_dict(url_args)
        results = tenant_dao.get_all(
            params['filters'],
            params['sort'], 
            params['range']
            )
        resp = make_response(jsonify(results['data']), 200)
        resp.headers['Access-Control-Expose-Headers'] = 'X-Total-Count'
        resp.headers['X-Total-Count'] = results['count']
        return resp
    else:
        return render_template("error.html"), 403

@tenant_bp.route("/tenants", methods=["POST"])
def insert_tenant():
    if have_claims(request.cookies.get("login_token")):
        try:
            if request.method == "POST":
                new_tenant = tenant_dao.add(
                    request.form.get("name"),
                    request.form.get("city"),
                    request.form.get("email")
                )
                return jsonify(new_tenant)
        except Exception as err:
            return str(err)
    else:
        return render_template("error.html"), 403

