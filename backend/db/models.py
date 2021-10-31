from flask_sqlalchemy import SQLAlchemy
from flask_sqlalchemy.model import DefaultMeta


db = SQLAlchemy()

BaseModel: DefaultMeta = db.Model
# This is table for MANY to MANY relationShip for event and attendee
event_attendee = db.Table(
    "event_attendee",
    db.Column("event_id", db.Integer, db.ForeignKey("event.id"), primary_key=True),
    db.Column("attendee_id", db.Integer, db.ForeignKey("attendee.id"), primary_key=True),
)


class Attendee(BaseModel):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)

    event_id = db.relationship("Event", secondary=event_attendee)


class Calendar(BaseModel):
    id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey("company.id"), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    google_id = db.Column(db.String(255), nullable=False)

    events = db.relationship("Event", backref="calendar")


class Company(BaseModel):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)

    calendars = db.relationship("Calendar", backref="company")
    events = db.relationship("Event", backref="company")


class Event(BaseModel):
    id = db.Column(db.Integer, primary_key=True)
    calendar_id = db.Column(db.Integer, db.ForeignKey("calendar.id"))
    room_id = db.Column(db.Integer, db.ForeignKey("room.id"), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    start = db.Column(db.DateTime, nullable=False)
    end = db.Column(db.DateTime, nullable=False)
    google_id = db.Column(db.String(255), nullable=False)
    company_id = db.Column(db.Integer, db.ForeignKey("company.id"))
    status = db.Column(db.Boolean)

    attendees = db.relationship("Attendee", secondary=event_attendee)


class Room(BaseModel):
    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(255), nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    equipment = db.Column(db.String(255))

    events = db.relationship("Event", backref="room")
