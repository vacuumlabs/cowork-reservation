from db.models import Company
from db.models import db
from flask_sqlalchemy import SQLAlchemy


def getCompanies() -> list:
    companies = Company.query.all()
    return [
        {"id": row.id, "name": row.name, "location": row.location, "email": row.email}
        for row in companies
    ]


def addCompany(company_name: str, location: str, email: str) -> Company:
    add_company = Company(name=company_name, location=location, email=email)
    db.session.add(add_company)
    db.session.commit()
    return add_company
