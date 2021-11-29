from app.models import Tenant
from app.models import Calendar
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

    def get_by_username(self, name: str):
        return session.query(self.model).filter_by(name=name).first()

    def get_by_email(self, email: str):
        return session.query(self.model).filter_by(email=email).first()

    def add_tenant(self, tenant_name: str, city: str, email: str) -> Tenant:
        new_tenant = Tenant(name=tenant_name, city=city, email=email)
        session.add(new_tenant)
        session.commit()
        return new_tenant


tenant_dao = TenantDAO(Tenant)

class CalendarDAO:
    def __init__(self, model):
        self.model = model

    def get_all(self) -> list:
        return self.to_array(session.query(self.model).all())

    def get(self, kargs: dict):
        results = session.query(self.model).filter_by(**kargs).all()
        return self.to_array(results) 

    def add_calendar(self, tenant_id: int, name: str, google_id: str) -> Calendar:
        new_calendar = Calendar(tenant_id=tenant_id, name=name, google_id=google_id)
        session.add(new_calendar)
        session.commit()
        return new_calendar

    def delete_calendar(self, id: int):
        try:
            calendar = session.query(self.model).filter_by(id=id).first()
            session.delete(calendar)
            session.commit()
        except:
            return False
        return True

    def to_array(self, results) -> list:
        return [
            {
                "id": row.id,
                "tenant_id": row.tenant_id, 
                "name": row.name, 
                "google_id": row.google_id
            } 
            for row in results 
        ]


calendar_dao = CalendarDAO(Calendar)
