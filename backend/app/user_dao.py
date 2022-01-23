from firebase_admin import auth 
from typing import Iterable 
import operator 
 
class UserDAO: 
     
    def get_users(self, client_data: dict ,filters: dict = None, sort: list = None, results_range: list = None) -> dict: 
        # implement filters 
        list_of_users = [] 
        users_count = 0
        if not filters:
            filters = {}

        if client_data["user_role"] != "SUPER_ADMIN":
            filters["tenantId"] = client_data["tenant_id"] 
         
        if filters: 
            list_of_users = self.apply_filters(filters, list_of_users) 
            users_count = len(list_of_users)
        else:
            list_of_users = self.get_user_list_from_firebase()
            users_count = len(list_of_users)
        
        if results_range: 
            if users_count == 0: 
                users_count = len(list_of_users)
            list_of_users = self.apply_range(results_range, list_of_users) 
         
        if sort: 
            if users_count == 0: 
                users_count = len(list_of_users) 
            list_of_users = self.apply_sort(sort, list_of_users) 
         
        return {"data": list_of_users, "count": users_count} 
 
    def apply_range(self, results_range:list, data: list = None) -> list:  
        sliced_data = [] 
        if not data: 
            return sliced_data 
        start = results_range[0] 
        end = results_range[1] 
        if end < 0: 
            end = 0 
        sliced_data = data[start:end+1] 
        return sliced_data 
 
    def apply_filters(self, filters:dict, data: list = None) -> list:  
        filtered_data = [] 
        if data == None: 
            return filtered_data 
 
        #making sure filters are standardizend  
        ap_filters = {} 
        for key, value in filters.items(): 
            if type(value) == str or not isinstance(value, Iterable): 
                ap_filters[key] = [value] 
            else: 
                ap_filters[key] = value 
            if "Id" in key or "id" in key:
                ap_filters[key] = [str(item) for item in ap_filters[key]]
        for user in auth.list_users().iterate_all(): 
            if not user.custom_claims: 
                continue 
            entry = self.user_record_to_dict(user) 
            valid_in_all_filters = True 
            for key, value in ap_filters.items(): 
                under_this_filter = False 
                if key in entry: 
                    for item in value: 
                        if entry[key] == item: 
                            under_this_filter = True 
                            break 
                    valid_in_all_filters &= under_this_filter 
                if not valid_in_all_filters: 
                    break     
 
            if valid_in_all_filters:           
                filtered_data.append(entry) 
        return filtered_data 
 
    def apply_sort(self, sort:list, data: list = None) -> list:  
        sorted_data = [] 
        if not data: 
            return sorted_data 
        if sort[0] in data[0]: 
            desc_order = False if sort[1].lower() == "asc" else True 
            sorted_data = sorted(data, key=operator.itemgetter(str(sort[0])), reverse=desc_order) 
            return sorted_data 
        else:  
            return data    
     
    def create_user(self, name: str, email: str, password: str) -> dict: 
        user = auth.create_user( 
            email=email, 
            password=password, 
            display_name=name, 
            disabled=False) 
        if user.uid: 
            return self.user_record_to_dict(user) 
        return None 
 
    def delete_user(self, id: str) -> bool: 
        user = auth.get_user(id)
        if user.uid: 
            auth.delete_user(user.uid) 
            return True 
        return False 
 
    def update_user(self, client_data:dict, uid: str, data: dict) -> dict: 
        updated_data = {} 
        updated_data["custom_claims"] = {}
        person = auth.get_user(uid)
        if not client_data["user_role"] == "SUPER_ADMIN" and person.custom_claims["tenantId"] != client_data["tenant_id"]:
           return {}
        for key, value in data.items():
            if key in ["name", "email"]:
                if key == "name":
                    updated_data["display_name"] = value
                else:
                    updated_data[key] = value
            if key in ["role","tenantId"]:
                updated_data["custom_claims"][key] = value 
        user = auth.update_user(person.uid, **updated_data) 
        return self.user_record_to_dict(user) 
 
    def get_one(self, client_data: dict, uid: str) -> dict:
        desired_user = auth.get_user(uid)
        desired_user = self.user_record_to_dict(desired_user)
        if client_data["user_role"] == "SUPER_ADMIN":
            return desired_user
        else:
            return desired_user if desired_user["tenantId"] == client_data["tenant_id"] else {}
                
    def user_record_to_dict(self, user) -> dict: 
        user_dict = {} 
        user_dict = {"id": user.uid, "name":user.display_name, "email":user.email} 
        custom_claims = user.custom_claims if user.custom_claims else {"role":"", "tenantId":""}
        user_dict = {**user_dict, **custom_claims} 
        return user_dict

    def get_user_list_from_firebase(self) -> list:
        u_list = []
        for user in auth.list_users().iterate_all():  
            u_list.append(self.user_record_to_dict(user))
        return u_list
         
 
user_dao = UserDAO()