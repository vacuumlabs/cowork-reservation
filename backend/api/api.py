from datetime import datetime
import json

from flask import Flask, request

from db.access_database import AccessDataBase


def init_app(app: Flask):
    @app.route("/", methods=["GET"])
    def get_messages():
        dbobj = AccessDataBase()
        messages = dbobj.get_messages()

        print(messages)

        return "OK"

    @app.route("/", methods=["POST"])
    def insert_message():
        try:
            dbobj = AccessDataBase()
            if request.method == "POST":
                print(request)
                message_json = {}
                message_json["text"] = request.json["text"]
                message_json["created_at"] = str(datetime.now().date())

                dbobj.insert_message(message_json)
                return json.dumps(message_json)
        except Exception as err:
            return str(err)
