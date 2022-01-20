from app.models import Building, City, Event, Calendar, Tenant, Room
import datetime
from random import randrange
from flask import Flask
from math import floor
from app import db
import string, secrets

num_of_entries = 25


def citySeed():
    if City.query.count() == 0:
        db.session.add(City(name="Košice"))  
        db.session.add(City(name="Bratislava"))  
        db.session.add(City(name="Prešov"))  
        db.session.add(City(name="Mexico City"))  
        db.session.commit()

def buildingSeed():
    if Building.query.count() == 0:
        db.session.add(Building(name="Business Centre 1", city_id=1, address="Štúrová 27.5"))  
        db.session.add(Building(name="Business Centre 2", city_id=1, address="Werferova 9"))  
        db.session.add(Building(name="Business Centrum", city_id=2, address="Zochova 580, 811 03"))    
        db.session.add(Building(name="Business Park", city_id=3, address="Volgogradská 721, 080 03"))    
        db.session.add(Building(name="Torre Reforma", city_id=4, address="Cuauhtémoc  401"))    
        db.session.commit()

def roomSeed():
    if Room.query.count() == 0:
        db.session.add(Room(city_id=1, building_id=1, name="Mordor 1", floor=1, capacity=20, equipment="[whiteboard, projector]"))  
        db.session.add(Room(city_id=1, building_id=1, name="Mordor 2", floor=1, capacity=4, equipment="[whiteboard]"))  
        db.session.add(Room(city_id=1, building_id=2, name="Tardis", floor=2, capacity=3, equipment="[whiteboard]"))  
        db.session.add(Room(city_id=2, building_id=3, name="Blavdor", floor=1, capacity=5, equipment="[whiteboard, projector]"))  
        db.session.add(Room(city_id=2, building_id=3, name="Arteos", floor=2, capacity=20, equipment="[whiteboard, projector, computers]"))  
        db.session.add(Room(city_id=3, building_id=4, name="Harry Potter", floor=1, capacity=40, equipment="[whiteboard, projector, wands]"))  
        db.session.add(Room(city_id=4, building_id=5, name="El Room", floor=5, capacity=100, equipment="[whiteboard, projector]"))  
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


def eventSeed():
    if Event.query.count() != 0:
        db.session.query(Event).delete()
    if Event.query.count() == 0:
        # Room 1 schedule
        db.session.add(
            Event(
                calendar_id=1,
                room_id=1,
                name="Daily meeting (show and tell)",
                start=datetime.datetime.now() - datetime.timedelta(minutes=115),
                end=datetime.datetime.now() - datetime.timedelta(minutes=100),
                google_id="".join(
                    secrets.choice(string.ascii_letters + string.digits)
                    for i in range(16)
                ),
                tenant_id=1,
            )
        )

        db.session.add(
            Event(
                calendar_id=1,
                room_id=1,
                name="Team Meeting VC",
                start=datetime.datetime.now() + datetime.timedelta(minutes=15),
                end=datetime.datetime.now() + datetime.timedelta(minutes=30),
                google_id="".join(
                    secrets.choice(string.ascii_letters + string.digits)
                    for i in range(16)
                ),
                tenant_id=1,
            )
        )

        db.session.add(
            Event(
                calendar_id=1,
                room_id=1,
                name="Customer presentation",
                start=datetime.datetime.now() + datetime.timedelta(minutes=36),
                end=datetime.datetime.now() + datetime.timedelta(minutes=66),
                google_id="".join(
                    secrets.choice(string.ascii_letters + string.digits)
                    for i in range(16)
                ),
                tenant_id=1,
            )
        )

        db.session.add(
            Event(
                calendar_id=1,
                room_id=1,
                name="Investor meeting",
                start=datetime.datetime.now() + datetime.timedelta(hours=2),
                end=datetime.datetime.now() + datetime.timedelta(hours=3),
                google_id="".join(
                    secrets.choice(string.ascii_letters + string.digits)
                    for i in range(16)
                ),
                tenant_id=1,
            )
        )

        # Room 2 event schedule

        db.session.add(
            Event(
                calendar_id=1,
                room_id=2,
                name="Idea presentation",
                start=datetime.datetime.now() - datetime.timedelta(minutes=115),
                end=datetime.datetime.now() - datetime.timedelta(minutes=100),
                google_id="".join(
                    secrets.choice(string.ascii_letters + string.digits)
                    for i in range(16)
                ),
                tenant_id=1,
            )
        )

        db.session.add(
            Event(
                calendar_id=1,
                room_id=2,
                name="Employee interview",
                start=datetime.datetime.now() - datetime.timedelta(minutes=25),
                end=datetime.datetime.now() + datetime.timedelta(minutes=5),
                google_id="".join(
                    secrets.choice(string.ascii_letters + string.digits)
                    for i in range(16)
                ),
                tenant_id=1,
            )
        )

        db.session.add(
            Event(
                calendar_id=1,
                room_id=2,
                name="Team building exercise",
                start=datetime.datetime.now() + datetime.timedelta(minutes=6),
                end=datetime.datetime.now() + datetime.timedelta(minutes=66),
                google_id="".join(
                    secrets.choice(string.ascii_letters + string.digits)
                    for i in range(16)
                ),
                tenant_id=1,
            )
        )

        db.session.add(
            Event(
                calendar_id=1,
                room_id=2,
                name="Watch party",
                start=datetime.datetime.now() + datetime.timedelta(hours=2),
                end=datetime.datetime.now() + datetime.timedelta(hours=3),
                google_id="".join(
                    secrets.choice(string.ascii_letters + string.digits)
                    for i in range(16)
                ),
                tenant_id=1,
            )
        )

        db.session.commit()


def clamp(minimum, x, maximum):
    return max(minimum, min(x, maximum))


def seed_database(app: Flask):
    with app.app_context():
        citySeed()
        buildingSeed()
        roomSeed()
        tenantSeed(num_of_entries)
        calendarSeed(num_of_entries)
        eventSeed()
