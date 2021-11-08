from db.models import Organization
from db.models import db
from flask_sqlalchemy import SQLAlchemy


def getOrganizations() -> list:
    organizations = Organization.query.all()
    return [
        {"id": row.id, "name": row.name, "location": row.location, "email": row.email}
        for row in organizations
    ]


def addOrganization(organization_name: str, location: str, email: str) -> Organization:
    add_organization = Organization(
        name=organization_name, location=location, email=email
    )
    db.session.add(add_organization)
    db.session.commit()
    return add_organization
