import datetime
from typing import Iterable
from app.models import Building, City, Invitation, Tenant
from app.models import Calendar
from app.models import Room
from app.models import Event
from app.models import ServiceAccounts
from app import db
from app.user_dao import user_dao

session = db.session


class SharedDaoMethods:
    def __init__(self, model):
        self.model = model

    def add(self, data: dict) -> dict:
        new_record = self.model(**data)
        session.add(new_record)
        session.commit()
        return self.to_dict(new_record)

    def get_all(self, filters: dict, sort: list, results_range: list) -> dict:
        results = session.query(self.model)
        x_total_count = 0
        
        if filters:
            results = self.apply_filters(filters, results)
            x_total_count = results.count()

        if sort:
            if x_total_count == 0:
                x_total_count = results.count()
            results = self.apply_sort(sort, results)

        if results_range:
            if x_total_count == 0:
                x_total_count = results.count()
            results = self.apply_range(results_range, results)

        return {"data": self.to_array(results.all()), "count": x_total_count}

    def apply_range(self, results_range:list, results=None):
        if not results:
            results = session.query(self.model)
        """if pagination is needed this is the way
            page = results_range[0]
            page_size = results_range[1]
            offset = (page - 1)
            if offset < 0: offset = 0
            offset*= page_size
            results = results.limit(page_size).offset(offset)
            """
        start = results_range[0]
        count = results_range[1] - start
        if count < 0:
            count = 0
        results = results.limit(count + 1).offset(start)
        return results

    def apply_sort(self, sort: list, results=None):
        if not results:
            results = session.query(self.model)
        order = sort[1]
        col = getattr(self.model, sort[0])
        if order.lower() == "asc":
            col_sorted = col.asc()
        else:
            col_sorted = col.desc()
        results = results.order_by(col_sorted)
        return results

    def apply_filters(self, filters:dict, results=None):
        if not results:
            results = session.query(self.model)
        ap_filters = []
        for key, value in filters.items():
            try:
                column = getattr(self.model, key)
                if type(value) == str or not isinstance(value, Iterable):
                    value = [value]
                ap_filters.append(column.in_(value))
            except:
                pass
        results = results.filter(*ap_filters)
        return results
    
    def get_one(self, id: int) -> list:
        results = session.query(self.model).filter_by(id=id).first()
        return self.to_array(results)[0] if results else {}

    def update(self, id: int, update: dict) -> list:
        results = session.query(self.model).filter_by(id=id).first()
        for key, value in update.items():
            try:
                setattr(results, key, value)
                session.commit()
            except:
                pass
        return self.to_array(results)[0] if results else {}

    def delete(self, id: int):
        try:
            calendar = session.query(self.model).filter_by(id=id).first()
            session.delete(calendar)
            session.commit()
        except:
            return False
        return True

    def to_array(self, results) -> list:
        converted = []
        try:
            for row in results:
                entry = self.to_dict(row)
                converted.append(entry)
        except:
            converted.append(self.to_dict(results))
        return converted

    def to_dict(self, row) -> dict:
        entry = {}
        for column in row.__table__.columns:
            entry[column.name] = getattr(row, column.name)
        return entry

    def to_array_tables(self, results) -> list:

        converted = []

        try:
            for i in range(len(results)):
                for row in results[i]:
                    entry = self.to_dict(row)
                    if 'resource_id' in entry:
                        converted[-1]['joined'] = entry
                    else:
                        converted.append(entry)

        except:
            converted.append(self.to_dict(results))
        return converted



class CalendarDAO(SharedDaoMethods):
    def add(self, tenant_id: int, name: str, google_id: str, resource_id=None, webhook_id=None, expiration=None) -> Calendar:
        new_calendar = Calendar(tenant_id=tenant_id, name=name, google_id=google_id, resource_id = resource_id,webhook_id= webhook_id, expiration = expiration )
        session.add(new_calendar)
        session.commit()
        return self.to_array(new_calendar)[0]

    def check_if_exist(self, resource_id: str, webhook_id: str):
        data = session.query(self.model)
        data = data.filter((Calendar.resource_id == resource_id) & (Calendar.webhook_id == webhook_id))
        if data.count() == 0:
            return False
        else:
            return  True


    def get_all_id_by_name_exept_id(self, name: str, id: str):
        data = session.query(self.model)
        data = data.filter(Calendar.name == name, Calendar.id != id)

        return self.to_array(data.all())

    def get_all_calendar_by_resource_and_webhook_id(self, resource_id: str, webhook_id: str):
        data = session.query(self.model)
        data = data.filter((Calendar.resource_id == resource_id) & (Calendar.webhook_id == webhook_id))
        return data.first().id,data.first().name,data.first().google_id, data.first().tenant_id

class RoomDAO(SharedDaoMethods):
    def add(
        self, city: str, capacity: int, equipment: str, building: str, room_number: int
    ) -> Room:
        new_room = Room(
            city=city,
            capacity=capacity,
            equipment=equipment,
            building=building,
            room_number=room_number,
        )
        session.add(new_room)
        session.commit()
        return self.to_array(new_room)[0]

    def get_all(self, filters: dict = None, sort: list = None, results_range: list = None, with_events: bool = False, with_next_events: bool = False) -> dict:
        results = session.query(self.model)
        x_total_count = 0
        if filters:
            results = self.apply_filters(filters, results)
            x_total_count = results.count()

        if sort:
            if x_total_count == 0:
                x_total_count = results.count()
            results = self.apply_sort(sort, results)

        if results_range:
            if x_total_count == 0:
                x_total_count = results.count()
            results = self.apply_range(results_range, results)
        
        results = self.to_array(results.all())
        if with_events or with_next_events:
            for room in results:
                room_events_filters = {"room_id": room["id"]}
                if with_next_events:
                    room_events_filters["_after"] = datetime.datetime.now()
                room_events = event_dao.get_all(filters=room_events_filters)
                if room_events: room_events = room_events["data"]
                room["room_events"] = room_events
        return {"data": results, "count": x_total_count}


    def get_all_id_by_name(self, name: str):
        data = session.query(self.model)
        data = data.filter(Room.building == name)
        return self.to_array(data.first())

class EventDAO(SharedDaoMethods):
    def add(
            self, 
            calendar_id: int, 
            room_id: int, 
            name: str, 
            start: datetime, 
            end: datetime,
            google_id: str,
            tenant_id: int

        ) -> Event:
            new_event = Event(
                calendar_id=calendar_id, 
                room_id=room_id, 
                name=name, 
                start=start, 
                end=end,
                google_id=google_id,
                tenant_id=tenant_id
            )
            session.add(new_event)
            session.commit()
            return self.to_array(new_event)[0]
            
    def get_all(self, filters: dict = None, sort: list = None, results_range: list = None) -> dict:
        results = session.query(self.model)
        x_total_count = 0
        if filters:
            results = self.apply_filters(filters, results)
            if "_before" in filters:
                if type(filters["_before"]) is str:
                    before = datetime.datetime.strptime(filters["_before"], '%Y-%m-%dT%H:%M:%S')
                else: before = filters["_before"]
                results = results.filter(Event.start < before)
            if "_after" in filters:
                if type(filters["_after"]) is str:
                    after = datetime.datetime.strptime(filters["_after"], '%Y-%m-%dT%H:%M:%S')
                else: after = filters["_after"]
                results = results.filter(Event.end > after)
            x_total_count = results.count()

        if sort:
            if x_total_count == 0:
                x_total_count = results.count()
            results = self.apply_sort(sort, results)

        if results_range:
            if x_total_count == 0:
                x_total_count = results.count()
            results = self.apply_range(results_range, results)

        return {"data": self.to_array(results.all()), "count": x_total_count}

    def change_duration(self, event_id:int, minutes: int):
        event = self.get_one(event_id)
        if minutes > 0:
            conflict = session.query(self.model)
            conflict = conflict.filter(
                (Event.room_id == event["room_id"]) & (Event.id != event_id))
            new_end = event["end"] + datetime.timedelta(minutes=abs(minutes))
            conflict = conflict.filter(
                (Event.start <= new_end) | (Event.end <= new_end))
            conflict = conflict.filter(Event.end > event["start"])
            conflict = self.to_array(conflict.all())
            if conflict: 
                return {"error": "bad request", 
                "details":"changing duration would result in conflict"}
            return self.update(event_id, {"end": new_end}) 
        else:
            minutes_diff = (event["end"] - event["start"]).total_seconds() / 60.0
            if (minutes_diff + minutes) <= 0: return {"error": "bad request"}
            new_end = event["end"] - datetime.timedelta(minutes=abs(minutes))
            return self.update(event_id, {"end": new_end}) 
    
    def cancel_event(self, event_id:int):
        event_to_cancel = event_dao.get_one(event_id)
        if not event_to_cancel:
            return {"error": "bad request"}
        time = datetime.datetime.now()
        if event_to_cancel["start"] > time:
            return self.delete(event_id)
        if event_to_cancel["end"] < time:
            return event_to_cancel
        return event_dao.update(event_id, {
            "end": time
        })

    def get_all_events_from_calendar_id(self, google_id: str):
        data = Event.query.join(Calendar)
        data = data.filter(Calendar.google_id==google_id)
        return self.to_array(data.all())

    def get_all_events_from_calendar_resource_id(self, resource_id: str, webhook_id: str):
        data = session.query(Event,Calendar).join(Calendar,Event.calendar_id == Calendar.id)
        data = data.filter((Calendar.resource_id == resource_id) & (Calendar.webhook_id == webhook_id) )
        if data.first() == None:
            return {}
        return self.to_array_tables(data.all())

    def get_all_events_by_name_and_google_id(self,google_id:str, name:str):
        data = session.query(self.model)
        data = data.filter((Event.google_id == google_id) & (Event.name == name) )
        return self.to_array(data.first())

    def get_count_events_from_calendar_id(self, google_id: str):
        data = Event.query.join(Calendar)
        data = data.filter(Calendar.google_id == google_id)
        return data.count()

    def get_all_events_by_name_and_date_are_not_google_id(self, start: str,  end: str ,name: str ,id :str):
        data = session.query(self.model)
        data = data.filter((Event.google_id != id) & (Event.name == name)& (Event.start == start) & (Event.end == end))
        return self.to_array(data.all())
        

class TenantDAO(SharedDaoMethods):
    def add(self, data: dict) -> dict:
        new_tenant = Tenant(**data)
        session.add(new_tenant)
        session.commit()
        return self.to_dict(new_tenant)


class ServiceAccountsDao(SharedDaoMethods):
    def add(self,calendar_id: int,name: str,tenant_id: int) -> ServiceAccounts:
            new_serviceaccount = ServiceAccounts(calendar_id=calendar_id,name=name ,tenant_id=tenant_id)
            session.add(new_serviceaccount)
            session.commit()
            return self.to_array(new_serviceaccount)[0]

    def get_by_tennant_id(self,tennant_id:str):
        data = session.query(self.model)
        data = data.filter(ServiceAccounts.tenant_id == tennant_id)
        if data.first() == None:
            return None
        return self.to_array(data.first())
    
class InvitationDAO(SharedDaoMethods):
    def add(self, data: dict) -> dict:
        data["status"] = "Active"
        new_record = self.model(**data)
        session.add(new_record)
        session.commit()
        new_record = self.to_dict(new_record)
        for user in user_dao.get_users({"user_role":"SUPER_ADMIN"})["data"]:
            if new_record["domain"] and new_record["value"] in user["email"]:
                user_dao.update_user({"user_role":"SUPER_ADMIN"}, user["id"], {"role": new_record["role"], "tenantId": new_record["tenant_id"]})
            elif user["email"] == new_record["value"]:
                user_dao.update_user({"user_role":"SUPER_ADMIN"}, user["id"], {"role": new_record["role"], "tenantId": new_record["tenant_id"]})
                self.update(new_record["id"], {"status":"Used"})
                break
        #pprint(user_dao.get_users({"user_role":"SUPER_ADMIN"})["data"])
        return new_record
    
    def update(self, id: int, update: dict) -> list:
        results = session.query(self.model).filter_by(id=id).first()
        for key, value in update.items():
            try:
                setattr(results, key, value)
                session.commit()
            except:
                pass
        results = self.to_array(results)[0] if results else {}
        if results and results["status"] == "Active":
            for user in user_dao.get_users({"user_role":"SUPER_ADMIN"})["data"]:
                if results["domain"] and results["value"] in user["email"]:
                    user_dao.update_user({"user_role":"SUPER_ADMIN"}, user["id"], {"role": results["role"], "tenantId": results["tenant_id"]})
                elif user["email"] == results["value"]:
                    user_dao.update_user({"user_role":"SUPER_ADMIN"}, user["id"], {"role": results["role"], "tenantId": results["tenant_id"]})
                    self.update(results["id"], {"status":"Used"})
                    break
        #pprint(user_dao.get_users({"user_role":"SUPER_ADMIN"})["data"])
        return results

room_dao = RoomDAO(Room)
calendar_dao = CalendarDAO(Calendar)
event_dao = EventDAO(Event)
tenant_dao = TenantDAO(Tenant)            
service_accounts_dao = ServiceAccountsDao(ServiceAccounts)
building_dao = SharedDaoMethods(Building)            
city_dao = SharedDaoMethods(City)
invites_dao = InvitationDAO(Invitation)            
