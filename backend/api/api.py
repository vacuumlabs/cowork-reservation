from datetime import datetime
import json
from flask import Flask, request, render_template
from db.access_database import AccessDataBase
import db.queries as db


def init_app(app: Flask):

    """--- GET methods ---"""

    @app.route("/getCmpns", methods=["GET"])
    def get_companies():
        companies = db.getCompanies()
        print(companies)
        return json.dumps(companies)

    @app.route("/", methods=["GET"])
    def get_webPage():
        # TODO: Replace with correct html file
        return render_template("base.html")

    @app.route("/admin", methods=["GET"])
    def get_adminPage():
        # TODO: Replace with correct html file
        return render_template("base.html")

    """ --- POST methods --- """

    @app.route("/", methods=["POST"])
    def insert_company():
        try:
            if request.method == "POST":
                print(request)
                message_json = {}
                message_json["name"] = request.form.get("name")
                message_json["location"] = request.form.get("location")
                message_json["email"] = request.form.get("email")
                print(
                    db.addCompany(
                        message_json["name"],
                        message_json["location"],
                        message_json["email"],
                    )
                )
                return render_template("base.html")
        except Exception as err:
            return str(err)
