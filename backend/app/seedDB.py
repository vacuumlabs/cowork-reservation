from app.models import Event, Calendar, Tenant, Room
from datetime import datetime
from random import randrange
from flask import Flask
from math import floor
from app import db

num_of_entries = 25


def roomSeed(num: int):
    Tenant.query.all()
    if Room.query.count() == 0:
        building = "Test_building_"
        cities = ["Bratislava", "Kosice", "Presov"]
        equipment = ["Projector", "Computers", "Laptops", "Board"]
        min_cap = 5  # capacity min
        max_cap = 99  # capacity max
        for idx in range(num):
            room = Room()
            room.city = cities[randrange(len(cities))]
            room.capacity = randrange(min_cap, max_cap + 1)
            room.equipment = equipment[0 : clamp(0, idx, len(equipment))]
            room.building = building + str(idx)
            room.room_number = randrange(1000)
            db.session.add(room)
        db.session.commit()


def tenantSeed(num: int, allow_same_names: bool = False):
    if Tenant.query.count() == 0:
        names = ["Andrej Testovač", "Tom Test", "Juraj Mrkva Jahoda", "Peter Hruška"]
        cities = ["Bratislava", "Kosice", "Presov"]
        for idx in range(num):
            tenant = Tenant()
            tenant.city = cities[randrange(len(cities))]
            if allow_same_names:
                tenant.name = names[idx % len(names)]
            else:
                tenant.name = names[idx % len(names)] + str(int(floor(idx / len(names))))
            tenant.email = tenant.name.lower()
            tenant.email = tenant.email.replace(" ", ".")
            tenant.email += "@gmail.com"
            db.session.add(tenant)
        db.session.commit()


def calendarSeed(num: int):
    if Calendar.query.count() == 0:
        google_id = ["a1b2c3d4e5f6g7"]
        name = "Calendar_number_"
        tenantSeed(num)
        tenants = Tenant.query.all()
        for idx in range(num):
            calendar = Calendar()
            calendar.tenant_id = tenants[idx % len(tenants)].id
            calendar.name = name + str(idx)
            calendar.google_id = google_id[idx % len(google_id)]
            db.session.add(calendar)
        db.session.commit()


def eventSeed(num: int, from_now: bool = True, from_date_time: datetime = datetime.now()):
    if Event.query.count() == 0:
        name = "Event_number_"
        time_periods = [10, 15, 20, 25, 30]  # in minutes
        spaces_between = 5  # in minutes
        tenantSeed(num)
        calendarSeed(num)
        roomSeed(num)
        tenants = Tenant.query.limit(1).all()
        calendars = Calendar.query.limit(1).filter_by(tenants[0])
        for idx in range(num):
            event = Event()


def clamp(minimum, x, maximum):
    return max(minimum, min(x, maximum))


def seed_database(app: Flask):
    with app.app_context():
        roomSeed(num_of_entries)
        tenantSeed(num_of_entries)
        calendarSeed(num_of_entries)
