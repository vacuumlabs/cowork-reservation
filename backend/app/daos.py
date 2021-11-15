from app.models import Tenant
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
