from typing import Iterable
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

    def get_all(self, filters: dict, sort: list, results_range: list) -> list:
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
        if filters:
            results = results.filter(*ap_filters)
        if sort:
            order = sort[1]
            col = getattr(self.model, sort[0])
            if order.lower() == "asc":
                col_sorted = col.asc()
            else:
                col_sorted = col.desc()
            results = results.order_by(col_sorted)
        if results_range:
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
            results = results.limit(count).offset(start)
        return self.to_array(results.all())

    def get_one(self, id: int) -> list:
        results = session.query(self.model).filter_by(id=id).first()
        return self.to_array(results)

    def add_room(
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
        return new_room

    def update_room(self, id: int, update: dict) -> list:
        results = session.query(self.model).filter_by(id=id).first()
        for key, value in update.items():
            try:
                setattr(results, key, value)
                session.commit()
            except:
                pass
        return self.to_array(results)

    def delete_room(self, id: int):
        try:
            room = session.query(self.model).filter_by(id=id).first()
            session.delete(room)
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


room_dao = RoomDAO(Room)
