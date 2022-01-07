from flask_sqlalchemy.model import DefaultMeta
from app import db

BaseModel: DefaultMeta = db.Model


class Calendar(BaseModel):
    id = db.Column(db.Integer, primary_key=True)
    tenant_id = db.Column(
        db.Integer, db.ForeignKey("tenant.id", ondelete="CASCADE"), nullable=False
    )
    name = db.Column(db.String(255), nullable=False)
    google_id = db.Column(db.String(255), nullable=False)

    events = db.relationship("Event", backref="calendar", passive_deletes=True)


class Tenant(BaseModel):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)

    calendars = db.relationship("Calendar", backref="tenant", passive_deletes=True)
    events = db.relationship("Event", backref="tenant", passive_deletes=True)


class Event(BaseModel):
    id = db.Column(db.Integer, primary_key=True)
    calendar_id = db.Column(db.Integer, db.ForeignKey("calendar.id", ondelete="CASCADE"))
    room_id = db.Column(
        db.Integer, db.ForeignKey("room.id", ondelete="CASCADE"), nullable=False
    )
    name = db.Column(db.String(255), nullable=False)
    start = db.Column(db.DateTime, nullable=False)
    end = db.Column(db.DateTime, nullable=False)
    google_id = db.Column(db.String(255), nullable=False)
    tenant_id = db.Column(db.Integer, db.ForeignKey("tenant.id", ondelete="CASCADE"))
    status = db.Column(db.Boolean)


class Room(BaseModel):
    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(255), nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    equipment = db.Column(db.String(255))
    building = db.Column(db.String(255), nullable=False)
    room_number = db.Column(db.Integer, nullable=False)

    events = db.relationship("Event", backref="room", passive_deletes=True)
