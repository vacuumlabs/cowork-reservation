from app.models import Tenant
from app import db

session = db.session


class TenantDAO:
    def __init__(self, model):
        self.model = model

    def get_all(self):
        return session.query(self.model).all()

    def get_by_username(self, name: str):
        return session.query(self.model).filter_by(name=name).first()

    def get_by_email(self, email: str):
        return session.query(self.model).filter_by(email=email).first()

    def getTenant(self) -> list:
        tenant = Tenant.query.all()
        return [
            {"id": row.id, "name": row.name, "city": row.city, "email": row.email}
            for row in tenant
        ]

    def addTenant(self, tenant_name: str, city: str, email: str) -> Tenant:
        add_tenant = Tenant(name=tenant_name, city=city, email=email)
        session.add(add_tenant)
        session.commit()
        return add_tenant


tenant_dao = TenantDAO(Tenant)
