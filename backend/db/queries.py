from db.models import Tenant
from db.models import db
from flask_sqlalchemy import SQLAlchemy


def getTenant() -> list:
    tenant = Tenant.query.all()
    return [
        {"id": row.id, "name": row.name, "city": row.city, "email": row.email}
        for row in tenant
    ]


def addTenant(tenant_name: str, city: str, email: str) -> Tenant:
    add_tenant = Tenant(name=tenant_name, city=city, email=email)
    db.session.add(add_tenant)
    db.session.commit()
    return add_tenant
