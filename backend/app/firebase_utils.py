from time import sleep
from firebase_admin import auth
import firebase_admin
from firebase_admin import credentials
import firebase_admin.auth as faa
from flask import jsonify, request, render_template
import os
import json
from app.utils import gcp_print



#authenticate session
cred1 = json.loads(os.environ.get("FIREBASE_AUTH_CREDENTIALS"),strict = False)
#cred = credentials.Certificate("app/api/coworkreservation-firebase-adminsdk-8bquw-d0598edebd.json")
cred = credentials.Certificate(cred1)
firebase_admin.initialize_app(cred)





#Check if is valid user
def is_logged(id_token):  
    if not id_token: 
        return False
    try:
        auth.verify_id_token(id_token)
        return True
    except (faa.TokenSignError, faa.ExpiredIdTokenError, faa.InvalidIdTokenError, faa.RevokedIdTokenError) as err:
        gcp_print(err)
        return False
    
#Check if is valid user and return user uid
def get_logged_uid(id_token):
    try:
        decoded_token = {}
        try:
            decoded_token = auth.verify_id_token(id_token)
        except: 
            #sleep needed cause of desynchronization of time between client and server
            sleep(1)
            decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        return {"uid": uid}
    except (faa.TokenSignError, faa.ExpiredIdTokenError, faa.InvalidIdTokenError, faa.RevokedIdTokenError) as err:
        gcp_print(err)
        return None

#Check if is valid user and return user uid---NEW-VERSION
def get_logged_uid_new(id_token):
    if not id_token:
        return 0
    try:
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        return uid
    except (faa.TokenSignError, faa.ExpiredIdTokenError, faa.InvalidIdTokenError, faa.RevokedIdTokenError) as err:
        gcp_print(err)
        return 0

#Check if user have needed claims       
def have_claims(id_token, claims = "*") -> list:
    have_access = False
    values_for_return = {}
    if not id_token:
        values_for_return = {"have_access":False}
        return values_for_return  
    custom_claim = get_required_info(id_token)
    if not custom_claim:
        values_for_return = {"have_access":False}
        return values_for_return
    for claim in claims:
        if custom_claim["user_role"] == claim or claim == "*":
            have_access = True
    values_for_return = {"have_access":have_access, "tenant_id":custom_claim["tenant_id"], "user_role":custom_claim["user_role"]}
    return values_for_return 

def get_required_info(id_token) -> list:
    returned = get_logged_uid(id_token)
    if not "uid" in returned:
        return None
    user = auth.get_user(returned["uid"])
    values_for_return = {"user_role":user.custom_claims.get("role"),"tenant_id": user.custom_claims.get("tenantId")}
    return values_for_return

#Return custom claims of user
def get_custom_claims(id_token):
    user = auth.get_user(get_logged_uid(id_token))
    return user.custom_claims.get("role")

#Check for specific custom claim of user
def has_user_custom_claim(id_token, custom_claim):
    user = get_logged_uid(id_token)
    if(user.custom_claims.get("role")==custom_claim):
        return ("True")
    return ("False") 

def get_token_from_cookies(cookie):
    final = "".join(cookie)
    return final

def get_users(id_of_tenant = "*"):
    # implement filters
    list_of_users = []
    if id_of_tenant == "*":
        for user in auth.list_users().iterate_all():
            if user.custom_claims:
                list_of_users.append({"name":user.display_name, "email":user.email, "tenantId":user.custom_claims.get("tenantId")})
    else:
        for user in auth.list_users().iterate_all():
            if user.custom_claims and user.custom_claims.get("tenantId") == id_of_tenant:
                list_of_users.append({"name":user.display_name, "email":user.email, "tenantId":user.custom_claims.get("tenantId")})
    return list_of_users

def create_user(user_name: dict, user_email: dict, user_password: dict) -> bool:
    user = auth.create_user(
        email=user_email,
        password=user_password,
        display_name=user_name,
        disabled=False)
    if user.uid:
        return True
    return False
