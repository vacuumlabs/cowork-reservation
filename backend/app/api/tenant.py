import json
from flask import jsonify, request, make_response, render_template
from flask.blueprints import Blueprint
from app.daos import tenant_dao
from app.firebase_utils import have_claims

tenant_bp = Blueprint("tenant_bp", __name__)


@tenant_bp.route("/tenants/<id>", methods=["GET"])
def get_one_tenant(id):
    if have_claims(request.headers.get("Authorization")):
        if have_claims(request.headers.get("Authorization"),"SUPER_ADMIN"):
            return jsonify(tenant_dao.get_one(id))
        else:
            #premenna = tenant_dao.get_one(id)

            return jsonify(tenant_dao.get_one(id))
    else:
        return make_response(jsonify({}),403)

@tenant_bp.route("/tenants/<id>", methods=["PUT"])
def update_tenant(id):
    if have_claims(request.headers.get("Authorization")):
        data = request.json
        return jsonify(tenant_dao.update(id, data))
    else:
        return make_response(jsonify({}),403)

@tenant_bp.route("/tenants/<id>", methods=["DELETE"])
def del_tenant(id):
    if have_claims(request.headers.get("Authorization")):
        tenant_dao.delete(id)
        return jsonify({})
    else:
        return make_response(jsonify({}),403)

@tenant_bp.route("/tenants", methods=["GET"])
def get_tenant_list():
    if have_claims(request.headers.get("Authorization")):
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
        results = tenant_dao.get_all(filters, sort, results_range)
        resp = make_response(jsonify(results['data']), 200)
        resp.headers['Access-Control-Expose-Headers'] = 'X-Total-Count'
        resp.headers['X-Total-Count'] = results['count']
        return resp
    else:
        return make_response(jsonify({}),403)

@tenant_bp.route("/tenants", methods=["POST"])
def insert_tenant():
    if have_claims(request.headers.get("Authorization")):
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
        return make_response(jsonify({}),403)

