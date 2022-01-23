import time
import uuid
import datetime
from app.daos import event_dao,room_dao,tenant_dao,calendar_dao,service_accounts_dao,building_dao
import os
from pprint import pprint
from app.api.service_account.services_for_service_account import *
import json

API_NAME='calendar'
API_VERSION = 'v3'
SCOPES = ['https://www.googleapis.com/auth/calendar','https://www.googleapis.com/auth/admin.directory.user','https://www.googleapis.com/auth/admin.directory.resource.calendar','https://www.googleapis.com/auth/admin.directory.group']
location  = os.path.dirname(os.path.abspath(__file__)) +'/zeta-store-338710-8b9920bd4b01.json'
Mask = 'serviceaccountforcalendars@zeta-store-338710.iam.gserviceaccount.com'
Mask1 = 'service@coworkreservation.me'


#object for service account with Domain Wide Delegation
service = get_service(API_NAME,API_VERSION,SCOPES,location,Mask)
# object for service account
services = get_other_service(API_NAME,API_VERSION,SCOPES,location)


def get_all_calendars_names():
    response = service.calendarList().list().execute()
    calendar_name_list = []
    for i in range(len(response)):
        calendar_name_list.append(response.get('items')[i]['summary'])
    return calendar_name_list

def get_all_calendars():
    response = service.calendarList().list().execute()
    return response

def insert_calendar(id):    #insert shared db without needed accept
    calendar_list_entry = {
        'id': id
    }

    created_calendar_list_entry = service.calendarList().insert(body=calendar_list_entry).execute()
    return created_calendar_list_entry['summary']


def get_all_events_names(calendar_id):
    list_of_events=[]
    events = service.events().list(calendarId=calendar_id).execute()
    for event in events['items']:
        if check_if_event_has_summary(event):
            list_of_events.append(event['summary'])
        else:
            list_of_events.append('None')
    return list_of_events


def get_all_events(calendar_id,mask):
    service = get_service(API_NAME, API_VERSION, SCOPES, location, mask)
    events = service.events().list(calendarId=calendar_id).execute()
    return events

def create_calendar(request_body):
     response = service.calendars().insert(body=request_body).execute()      # create new calendar
     return response



def check_if_event_has_summary(event):
    if event.get('summary') == None :
        return False
    else:
        return True

def import_event(request_body,calendarID):
    imported_event = service.events().import_(calendarId=calendarID, body=request_body).execute()
    return imported_event

def delete_event(calendar_id,id,mask):
    service = get_service(API_NAME, API_VERSION, SCOPES, location, mask)
    service.events().delete(calendarId=calendar_id, eventId=id).execute()

def create_event(summary,calendar_id,start,end,mask,locations):

    service = get_service(API_NAME, API_VERSION, SCOPES, location, mask)
    body = {
        'summary': summary,
        'description': 'A chance to hear more about Google\'s developer products.',
        'start': {
            'dateTime': change_to_web(str(start)),
            'timeZone': 'Europe/Prague',
        },
        'end': {
            'dateTime': change_to_web(str(end)),
            'timeZone': 'Europe/Prague',
        },
        'attendees': [
            {'email': locations},
        ],
        'reminders': {
            'useDefault': False,
            'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10},
            ],
        },
    }


    event = service.events().insert(calendarId=calendar_id, body=body).execute()
    return event

def create_event_test(summary,calendar_id,start,end):
    body = {
        'summary': summary,
        'description': 'A chance to hear more about Google\'s developer products.',
        'start': {
            'dateTime': change_to_web(str(start)),
            'timeZone': 'Europe/Prague',
        },
        'end': {
            'dateTime': change_to_web(str(end)),
            'timeZone': 'Europe/Prague',
        },

        'reminders': {
            'useDefault': False,
            'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10},
            ],
        },
    }


    event = service.events().insert(calendarId=calendar_id, body=body).execute()
    return event


def insert_role_on_calendar(calendarID,user,email):
    request_body = {
        'scope': {
            'type': user,
            'value': email,
        },
        'role': 'writer'
    }
    created_rule = service.acl().insert(calendarId=calendarID, body=request_body).execute()


def add_events_to_db(id):
    #pouzi to iste ako si to robil na webhooku teda dataweb a len funkciu na pridanie do db
    print('list')


def change_to_db(data):
    substring = "+"
    if substring in data:
        data = data.split("+")
        return data[0]
    else:
        datas = data.split('T')
        data = datas[0]+'T'+(datas[1].split('-')[0])
        return data

def change_to_web(data):
    data = data.split(" ")
    data = data[0]+'T'+data[1]
    return data


def createhook(calendar_id):
    try:
        time_to_unix =  str((time.time() * 1000)+10)
    except:
        time_to_unix = str(0)
        pprint('Error on unix time')

    body= {
        "id": str(uuid.uuid4()),
        "type": "web_hook",
        "address": "https://coworkapp.me/tests",
    }
    return  service.events().watch(calendarId= calendar_id, body = body).execute()


def closehook(id,resourceid):
    body = {
        'id': id,
        'resourceId': resourceid,
    }
    print(service.channels().stop(body=body).execute())


def print_notification(entry):
    print(json.dumps(entry))
    import sys
    sys.stdout.flush()

def change_to_dict_web(dataweb,name):
    webdict = []
    for i in range(len(dataweb['items'])):
        x = {}
        x['id'] = dataweb['items'][i]['id']
        try:
            x['name'] = dataweb['items'][i]['summary']
        except:
            x['name'] = 'None'
        x['end'] = datetime.datetime.strptime(change_to_db(dataweb['items'][i]['end']['dateTime']), '%Y-%m-%dT%H:%M:%S')
        x['start'] = datetime.datetime.strptime(change_to_db(dataweb['items'][i]['start']['dateTime']),
                                                   '%Y-%m-%dT%H:%M:%S')
        x['location'] = name
        webdict.append(x)
    return webdict


def change_to_dict_db(datadatabaza,name):
    if len(datadatabaza) == 0:
        return [{}]
    datadict = []
    for i in range(len(datadatabaza)):
        y = {}
        y['id'] = datadatabaza[i]['google_id']
        y['name'] = datadatabaza[i]['name']
        y['end'] = datadatabaza[i]['end']
        y['start'] = datadatabaza[i]['start']
        y['location'] = name
        datadict.append(y)
    return  datadict

def add_differnet_events_to_db(data,holder):
    calendar_id = holder['id']
    try:
        room_id = room_dao.get_all_id_by_name(data['location'])[0]['id']
    except:
        print('ERROR IN ROOM ID DONT EXIST')
        return
    name =  data['name']
    start = data['start']
    end = data['end']
    google_id = data['id']
    tenant_id = holder['tenant_id']
    event_dao.add(calendar_id, room_id, name, start, end, google_id, tenant_id)

def add_differnet_events_to_web(data,holder,calendars):

    for i in range(len(calendars)):
        calendar_id_id = holder[i]['id']
        location = holder[i]['google_id']
        calendar_id = calendars[0][i]['google_id']
        room_id = room_dao.get_all_id_by_name(data['location'])[0]['id']
        name =  data['name']
        start = data['start']
        end = data['end']
        tenant_id = holder[i]['tenant_id']
        try:
            if calendar_id == "2livateegthoron91afp2tg054@group.calendar.google.com":
                data_from_created = create_event_test(name,calendar_id,start,end)
            else:
             data_from_created = create_event(name,calendar_id,start,end,calendar_id,location)
        except:
            print('error in calendar_id inserting into other calendars')
            continue
        try:
            event_dao.add(calendar_id_id, room_id, name, start, end,data_from_created['id'], tenant_id)
        except:
            print('Error in adding into db in add sync')
            continue

def delete_different_events_from_db(data):
    holder = event_dao.get_all_events_by_name_and_google_id(data['id'],data['name'])
    for i in range(len(holder)):
        try:
            event_dao.delete(holder[i]['id'])
        except:
            print('ERROR in delete from db')

def delete_different_events_from_web(data,id):
    holder = calendar_dao.get_all_id_by_name_exept_id(data['location'],id)
    event_data = event_dao.get_all_events_by_name_and_date_are_not_google_id(data['start'], data['end'], data['name'], data['id'])
    get_data_for_web = []

    for i in range(len(holder)):
        try:
            event_dao.delete(event_data[i]['id'])
        except:
                print("ERROR in DELETE from db")
        try:
            tenant_data = service_accounts_dao.get_by_tennant_id(str(event_data[i]['tenant_id']))
            delete_event(tenant_data[0]['google_id'],event_data[i]['google_id'],tenant_data[0]['google_id'])
        except:
            print("ERROR In DELET FROM WEB")


def create_building(mask,Name,floors):
    service_for_b = get_service_for_directory(SCOPES,location,mask)
    body = {
              "buildingId": str(Name),
              "buildingName": str(Name),
              "coordinates": {
                    "latitude": '48.6690',
                    "longitude": '19.6990'
                },
              "etags": str(Name)+'Etags',
              "floorNames": [
                floors
              ],

            }


    try:
        return service_for_b.resources().buildings ().insert(body = body,customer = 'my_customer').execute()
    except:
        print('ERROR IN CREATING BUILDING')

        return  None


def create_Room(mask,Name,capacity,floor,building):
    service_for_b = get_service_for_directory(SCOPES,location,mask)
    body = {
              "etags": str(Name),
              "resourceName": str(Name),
              "resourceCategory": 'CONFERENCE_ROOM',
              "generatedResourceName": str(Name),
              "resourceId": str(Name),
              "capacity": str(capacity),
              "floorName": str(floor),
              "buildingId": str(building),
              "floorSection": str(floor)
            }


    try:
        return service_for_b.resources().calendars().insert(body=body, customer='my_customer').execute()
    except:
        print('ERROR IN CREATING Room')
    return

def delete_Room(mask,Name):
    service_for_b = get_service_for_directory(SCOPES,location,mask)


    try:
        return  service_for_b.resources().calendars().delete(calendarResourceId=Name, customer='my_customer').execute()
    except:
        print('ERROR IN Deleting Room')
    return


def delete_Buildings(mask,Name):
    service_for_b = get_service_for_directory(SCOPES,location,mask)

    try:
        return  service_for_b.resources().buildings().delete(buildingId=Name, customer='my_customer').execute()
    except:
        print('ERROR IN Deleting Room')
    return

def update_Room(mask,Name,capacity,floor,building,oldname): #todo fix this no resource google cant find this resource

    service_for_b = get_service_for_directory(SCOPES,location,mask)
    body = {
              "resourceName": str(Name),
              "resourceCategory": 'CONFERENCE_ROOM',
              "generatedResourceName": str(Name),
              "resourceId": str(Name),
              "capacity": str(capacity),
              "floorName": str(floor),
              "buildingId": str(building),
              "floorSection": str(floor)
            }


    try:
        return service_for_b.resources().calendars().update(calendarResourceId = oldname,body=body, customer='my_customer').execute()
    except:
        print('ERROR IN Updating Room')
    return




def update_Building(mask,Name,floors,oldname):   #todo fix this no resource google cant find this resource
    service_for_b = get_service_for_directory(SCOPES, location, mask)
    body = {
        "buildingId": str(Name),
        "buildingName": str(Name),
        "coordinates": {
            "latitude": '48.6690',
            "longitude": '19.6990'
        },
        "floorNames": [
            floors
        ],

    }


    try:
        return service_for_b.resources().buildings().update(buildingId=oldname,body = body,customer = 'my_customer').execute()
    except:
        print('ERROR IN Updating Building')
    return