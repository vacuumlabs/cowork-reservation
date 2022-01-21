from array import array
from app.daos import tenant_dao
import json
from app.utils import camel_to_snake_dict, snake_to_camel_dict 
from flask import make_response, jsonify


class SharedServices:
    def url_args_to_query_params_dict_json(self, url_args, to_snake_case: bool = True): 
        #For JSON data provider approach
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
        parameters = {"filters": filters, "sort": sort, "range": results_range}
        return camel_to_snake_dict(parameters) if to_snake_case else parameters
    
    def url_args_to_query_params_dict(self, url_args, to_snake_case: bool = True):
        #For REST data provider approach
        filters = {}
        sort = []
        results_range = []

        if "filter" in url_args:
            filters = json.loads(url_args["filter"])

        if "sort" in url_args:
            sort = json.loads(url_args["sort"])

        if "range" in url_args:
            results_range = json.loads(url_args["range"])    

        parameters = {"filters": filters, "sort": sort, "range": results_range}
        return camel_to_snake_dict(parameters) if to_snake_case else parameters 

    def response(self, data: any = {}, content_range: int = 0, status_code: int = 200, to_camelCase: bool = True):
        if to_camelCase:
            if type(data) is list or type(data) is array:
                for idx in range(len(data)):
                    if type(data[idx]) is dict:
                        data[idx] = snake_to_camel_dict(data[idx])
            if type(data) is dict:
                data_ready_to_send = jsonify(snake_to_camel_dict(data))
            else:
                data_ready_to_send = jsonify(data)
        else:
            data_ready_to_send = jsonify(data)
        resp = make_response(data_ready_to_send, status_code)
        resp.headers['Access-Control-Expose-Headers'] = 'Content-Range'
        resp.headers['Content-Range'] = content_range
        return resp

class TenantService(SharedServices):
    def to_lower_case_tenant(self, data: dict):
        # TODO: format user data
        # example: lowercase all emails
        return data

class EventService(SharedServices):
    pass

class RoomService(SharedServices):
    pass

class CalendarService(SharedServices):
    pass

city_service = SharedServices()
building_service = SharedServices()
event_service = EventService()
tenant_service = TenantService()
room_service = RoomService()
calendar_service = CalendarService()
tenant_service = TenantService()
user_service = SharedServices()
