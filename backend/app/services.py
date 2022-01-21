from app.daos import tenant_dao
import json


class SharedServices:
    def url_args_to_query_params_dict_json(self, url_args):
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
        return {"filters": filters, "sort": sort, "range": results_range}
    
    def url_args_to_query_params_dict(self, url_args):
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

        return {"filters": filters, "sort": sort, "range": results_range}

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



event_service = EventService()
tenant_service = TenantService()
room_service = RoomService()
calendar_service = CalendarService()
tenant_service = TenantService()
user_service = SharedServices()
