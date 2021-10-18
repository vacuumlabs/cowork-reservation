from datetime import datetime
import json
from flask import Flask, request, render_template
from db.access_database import AccessDataBase


def init_app(app: Flask):
    @app.route("/getMsgs", methods=["GET"])
    def get_messages():
        dbobj = AccessDataBase()
        messages = dbobj.get_messages()
        print(messages)
        return json.dumps(messages)

    @app.route("/", methods=["GET"])
    def get_webPage():
        return render_template("base.html")

    @app.route("/", methods=["POST"])
    def insert_message():
        try:
            dbobj = AccessDataBase()
            if request.method == "POST":
                print(request)
                message_json = {}
                message_json["text"] = request.form.get("textOfMessage")
                dbobj.insert_message(message_json)
                return render_template("base.html")
        except Exception as err:
            return str(err)
