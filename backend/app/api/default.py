from flask.blueprints import Blueprint
from flask import jsonify, request, make_response, render_template
from flask_swagger_ui import get_swaggerui_blueprint
from flask.helpers import send_from_directory
from app.api.service_account.service_account import *
from app.daos import event_dao, calendar_dao, service_accounts_dao
from app.firebase_utils import have_claims
from app.services import serviceaccount_service


### swagger specific ###
swagger_url = "/swagger"
api_url = "/static/swagger.json"
swagger_bp = get_swaggerui_blueprint(
    swagger_url, api_url, config={"app_name": "Cowork-Reservation"}
)

default_bp = Blueprint("default_bp", __name__)


@default_bp.route("/", methods=["GET"])
def get_site():
    # TODO: Replace with correct html file
    return render_template("base.html")





@default_bp.route("/admin", methods=["GET"])
def get_admin_site():
    # TODO: Replace with correct html file
    return render_template("base.html")


@default_bp.route("/static/<path:path>")
def send_static(path):
    return send_from_directory("static", path)




@default_bp.route("/serviceaccount/<id>", methods=["GET"])
def get_serviceaccount(id):
    # TODO: check if tenant has permissions to view all cities
    return serviceaccount_service.response(building_dao.get_one(id))


@default_bp.route("/serviceaccount", methods=["POST"])
def create_serviceaccount():
    if not have_claims(request.headers.get("Authorization"),"SUPER_ADMIN"):
        return serviceaccount_service.response(status_code=403)
    returned_value = have_claims(request.headers.get("Authorization"),"SUPER_ADMIN")

    if returned_value["have_access"]:
        data = request.json
        holder = data.split('@')
        new_servacc = service_accounts_dao.add(
            data,
            holder[0],
            int(returned_value['tenant_id']),
        )
        return serviceaccount_service.response(new_servacc)

    return serviceaccount_service.response(status_code=403)


@default_bp.route("/serviceaccount/<id>", methods=["DELETE"])
def delete_serviceaccount(id):
    if not have_claims(request.headers.get("Authorization"),"SUPER_ADMIN"):
        return serviceaccount_service.response(status_code=403)

    service_accounts_dao.delete(id)
    return serviceaccount_service.response()


@default_bp.route("/notification", methods=["POST", "GET"])
def get_notifications():
    notifications = request.headers['X-Goog-Resource-ID']
    id_webhook = request.headers['X-Goog-Channel-ID']
    resourceid = request.headers['X-Goog-Resource-ID']

    check = calendar_dao.check_if_exist(resourceid, id_webhook)
    if check == False:
        print("NO SUCH VALUES IN DB FIRST TRIGGER ")
        print_notification(notifications)
        return

    all_events = event_dao.get_all_events_from_calendar_resource_id(resourceid, id_webhook)
    calendar_id_in_db, name, google_id, tennat_id = calendar_dao.get_all_calendar_by_resource_and_webhook_id(resourceid,
                                                                                                             id_webhook)
    try:
        get_delgated_google_id = service_accounts_dao.get_by_tennant_id(tennat_id)
        data = get_all_events(google_id, get_delgated_google_id[0]['google_id'])
    except:
        print("ERROR in Getting data from Resource Calendar")
        return

    web_data = change_to_dict_web(data, name)
    db_data = change_to_dict_db(all_events, name)

    get_all_events_that_are_not_in_db = [i for i in web_data if i not in db_data]  # pomocou tohto viem najst nove

    if len(get_all_events_that_are_not_in_db) != 0:
        get_data_for_db = calendar_dao.get_one(calendar_id_in_db)
        get_data_for_web_calendar = calendar_dao.get_all_id_by_name_exept_id(
            get_all_events_that_are_not_in_db[0]['location'],
            calendar_id_in_db)

        get_data_for_web = []
        for i in range(len(get_data_for_web_calendar)):
            holder = get_data_for_web_calendar[i]['tenant_id']
            get_data_for_web.append(service_accounts_dao.get_by_tennant_id(str(holder)))

    else:
        get_data_for_web_calendar = None
        get_data_for_db = None
        get_data_for_web = None

    #if there is error on same event switch position of this fors
    for i in range(len(get_all_events_that_are_not_in_db)):
        # INSER INTO DB AND WEB
        add_differnet_events_to_db(get_all_events_that_are_not_in_db[i], get_data_for_db)
        add_differnet_events_to_web(get_all_events_that_are_not_in_db[i], get_data_for_web_calendar, get_data_for_web)

    get_all_events_that_are_not_in_web = [i for i in db_data if i not in web_data]


    if get_all_events_that_are_not_in_web == [{}]:
        return

    for i in range(len(get_all_events_that_are_not_in_web)):
        #DELETE DB AND WEB
        delete_different_events_from_db(get_all_events_that_are_not_in_web[i])
        delete_different_events_from_web(get_all_events_that_are_not_in_web[i], calendar_id_in_db)


    print_notification(notifications)