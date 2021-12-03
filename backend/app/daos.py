from app.models import Tenant
from app.models import Room
from app import db

session = db.session


class TenantDAO:
    def __init__(self, model):
        self.model = model

    def get_all(self) -> list:
        return [
            {"id": row.id, "name": row.name, "city": row.city, "email": row.email}
            for row in session.query(self.model).all()
        ]

    def get_by_name(self, name: str):
        return session.query(self.model).filter_by(name=name).first()

    def get_by_email(self, email: str):
        return session.query(self.model).filter_by(email=email).first()

    def add_tenant(self, tenant_name: str, city: str, email: str) -> Tenant:
        new_tenant = Tenant(name=tenant_name, city=city, email=email)
        session.add(new_tenant)
        session.commit()
        return new_tenant


tenant_dao = TenantDAO(Tenant)


class RoomDAO:
    def __init__(self, model):
        self.model = model

    def get_all(self) -> list:
        return self.to_array(session.query(self.model).all())
    
    def get_one(self, id: int) -> list:
        results = session.query(self.model).filter_by(id=id).first()
        return self.to_array(results)

    def get_by_city(self, city: str):
        results = session.query(self.model).filter_by(city=city).all()
        return self.to_array(results)

    def get_by_building(self, building: str):
        results = session.query(self.model).filter_by(building=building).all()
        return self.to_array(results) 

    def add_room(self, city: str, capacity: int, equipment: str, building:str, room_number: int) -> Room:
        new_room = Room(city=city,
                        capacity=capacity,
                        equipment=equipment,
                        building=building,
                        room_number=room_number)
        session.add(new_room)
        session.commit()
        return new_room
    def delete_room(self, id: int):
        try:
            room = session.query(self.model).filter_by(id=id).first()
            session.delete(room)
            session.commit()
        except:
            return False
        return True
    
    def to_array(self, results) -> list:
        return [
            {
                "id": row.id,
                "city": row.city, 
                "building": row.building, 
                "room_number": row.room_number,
                "capacity": row.capacity, 
                "equipment": row.equipment
            } 
            for row in results 
        ]


room_dao = RoomDAO(Room)
