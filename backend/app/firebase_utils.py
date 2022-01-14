from firebase_admin import auth
import firebase_admin
from firebase_admin import credentials
import firebase_admin.auth as faa
from flask import jsonify, request, render_template
import os
import json



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
    except (faa.TokenSignError, faa.ExpiredIdTokenError, faa.InvalidIdTokenError, faa.RevokedIdTokenError):
        return False
    
#Check if is valid user and return user uid
def get_logged_uid(id_token):
    if not id_token:
        return render_template("error.html"), 403
    try:
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        return uid
    except (faa.TokenSignError, faa.ExpiredIdTokenError, faa.InvalidIdTokenError, faa.RevokedIdTokenError):
        return render_template("error.html"), 403

#Check if is valid user and return user uid---NEW-VERSION
def get_logged_uid_new(id_token):
    if not id_token:
        return 0
    try:
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        return uid
    except (faa.TokenSignError, faa.ExpiredIdTokenError, faa.InvalidIdTokenError, faa.RevokedIdTokenError):
        return 0

#Check if it is tenant or superuser       
def have_claims(id_token, claims = "*") -> bool:
    
    if not id_token:
        return False    
    jano = get_token_from_cookies(id_token)
    custom_claim = get_custom_claims(jano)
    if claims == "*" and (custom_claim == 'TENANT_ADMIN' or custom_claim == 'SUPER_ADMIN'):
        return True
    elif custom_claim == claims:
        return True
    return False        

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