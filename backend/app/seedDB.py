from app.models import Building, City, Event, Calendar, Tenant, Room, ServiceAccounts
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
        db.session.commit()

def buildingSeed():
    if Building.query.count() == 0:
        db.session.add(Building(name="Aupark", city_id=2, address="Einsteinova 3541"))
        db.session.add(Building(name="Polus", city_id=2, address="Vajnorská 10645"))
        db.session.add(Building(name="Skypark", city_id=2, address="Bottova 2622/2"))
        db.session.commit()

def roomSeed():
    if Room.query.count() == 0:
        db.session.add(Room(city_id=2, building_id=1, name="AgRoom", floor=4, capacity=30, equipment="[whiteboard, projector]"))
        db.session.add(Room(city_id=2, building_id=1, name="AuRoom", floor=1, capacity=30, equipment="[whiteboard]"))
        db.session.add(Room(city_id=2, building_id=1, name="AuRora", floor=2, capacity=30, equipment="[whiteboard]"))
        db.session.add(Room(city_id=2, building_id=2, name="Remus", floor=1, capacity=20, equipment="[whiteboard, projector]"))
        db.session.add(Room(city_id=2, building_id=2, name="Plus", floor=1, capacity=20, equipment="[whiteboard, projector, computers]"))
        db.session.add(Room(city_id=2, building_id=2, name="Romulus", floor=1, capacity=30, equipment="[whiteboard, projector, wands]"))
        db.session.add(Room(city_id=2, building_id=3, name="Dalek", floor=1, capacity=15, equipment="[whiteboard, projector]"))
        db.session.add(Room(city_id=2, building_id=3, name="Paradox", floor=4, capacity=20, equipment="[whiteboard, projector]"))
        db.session.add(Room(city_id=2, building_id=3, name="Tardis", floor=1, capacity=30, equipment="[whiteboard, projector]"))

        db.session.commit()


def tenantSeed():
    if Tenant.query.count() == 0:
        db.session.add(Tenant(name="Vacuumlabs"))
        db.session.add(Tenant(name="Siemens"))
        db.session.add(Tenant(name="TUKE"))
        db.session.add(Tenant(name="IBM"))
        db.session.add(Tenant(name="Wirecard"))
        db.session.add(Tenant(name="FPT"))
        db.session.add(Tenant(name="Ness"))
        db.session.add(Tenant(name="AT&T"))
        db.session.add(Tenant(name="Telekom"))
        db.session.add(Tenant(name="O2"))
        db.session.add(Tenant(name="Google"))
        db.session.add(Tenant(name="Microsoft"))
        db.session.commit()


def calendarSeed():
    if Calendar.query.count() == 0:
        db.session.add(Calendar(tenant_id = 1,name="AgRoom",google_id ='c_1889o2gvf7l5ajnbio3dkca5ta95u@resource.calendar.google.com', resource_id ='eTxaDH3T5xchXUAkFTNHuHKdES8',webhook_id='6ad51f13-c5a6-403b-a955-a4ae5f3fc605'))
        db.session.add(Calendar(tenant_id = 1,name="AuRoom",google_id ='c_18862dhu3o7l2hd7k684l832mk8lo@resource.calendar.google.com', resource_id ='ucZHNjspkvsYwxMJ-2zCIVCzimw',webhook_id='ef3041e1-347f-4f19-aa5e-8121db9bfa30'))
        db.session.add(Calendar(tenant_id = 1,name="AuRora",google_id ='c_1880laqcpcn4ci7bihnl8ms3q1tqs@resource.calendar.google.com', resource_id ='0qTAOBdDekyTNRFoYxg2bwIu6QQ',webhook_id='c299b585-9559-44a9-b9e5-60cdcc818fb9'))

        db.session.add(Calendar(tenant_id = 1,name="Dalek",google_id ='c_188bqs8ef664kidcnaamm8h2mss9e@resource.calendar.google.com', resource_id ='UfjavDYChzbx48ym6TSOV0owkLU',webhook_id='f16f0ab0-bd6b-4457-b0aa-618aac781aed'))
        db.session.add(Calendar(tenant_id = 1,name="Paradox",google_id ='c_18837vdmue9qihpmk7ijak2icvb0c@resource.calendar.google.com', resource_id ='IxJ8UHlZ91VXriAZVD0IdKHDLYE',webhook_id='bdbcc146-b5cf-4250-84ad-98feee84530c'))
        db.session.add(Calendar(tenant_id = 1,name="Tardis",google_id ='c_188b3t8vau9ruhsdjstsj372h33j0@resource.calendar.google.com', resource_id ='Bbpb81rAxv6k40fM29g7ASdjE30',webhook_id='efcbf775-11ad-43f9-9625-445a9859ca4c'))

        db.session.add(Calendar(tenant_id = 1,name="Plus",google_id ='c_1882juesp3rf0j2gj1fohtdep8hhk@resource.calendar.google.com', resource_id ='gFI-AIlg6Yzv0DWgHoeu1uYaG2I',webhook_id='bb4ffa2d-2c92-4368-ba43-59bac10884b0'))
        db.session.add(Calendar(tenant_id = 1,name="Remus",google_id ='c_18819ee72ulpcg27ip15fkqkdkeic@resource.calendar.google.com', resource_id ='a3y4W9qULHYqJwZSuSIKuhFRI-E',webhook_id='edc49ddd-9d0c-4a87-b2b0-8895b2d590d3'))
        db.session.add(Calendar(tenant_id = 1,name="Romulus",google_id ='c_188bf9qje9r7kii6n084n5ba13v0i@resource.calendar.google.com', resource_id ='2yJ2OviTIetxHHD6pLFhHAAfgUU',webhook_id='cacd79ab-93d0-466f-adb6-8b9320f060dd'))
        ## 2
        db.session.add(Calendar(tenant_id = 2,name="AgRoom",google_id ='c_18832o1hla4b6h2mlicpbc4trdph2@resource.calendar.google.com', resource_id ='10eySH8CqDB0TfVNr8Af0NSNAvE',webhook_id='3ed880e7-d016-44f1-ab19-c89cf1f78e98'))
        db.session.add(Calendar(tenant_id = 2,name="AuRoom",google_id ='c_1885lme8l48e6ibki88vvhpq67umu@resource.calendar.google.com', resource_id ='hbWAPNiTWIHPosiXuRBVAM0yAts',webhook_id='22bf4b6b-71d2-4843-954f-00031ecdcff3'))
        db.session.add(Calendar(tenant_id = 2,name="AuRora",google_id ='c_1887atsvllk1mgcnnv13h78gep58c@resource.calendar.google.com', resource_id ='QcU6uK4eH1JM1MBuZsY58i9lOuY',webhook_id='9bbdd2ff-002d-43eb-809a-0acb60b768df'))

        db.session.add(Calendar(tenant_id = 2,name="Dalek",google_id ='c_18887hhag5pjui2fgbvmlio2pvqjq@resource.calendar.google.com', resource_id ='MHZKChg5NOylwsqNRXEyzk_dMNQ',webhook_id='60ffe819-a9af-44b6-bc0d-812e8da42e44'))
        db.session.add(Calendar(tenant_id = 2,name="Paradox",google_id ='c_188f60r0tcq96he4gvqfe9jntpqpa@resource.calendar.google.com', resource_id ='XE5Q9pNqq-n6xMDgxzCObvvJgsQ',webhook_id='10bcf1ec-f4fa-4f9a-b15e-9b29df9575fc'))
        db.session.add(Calendar(tenant_id =2,name="Tardis",google_id ='c_18880i89lru50gu7j58g1g31uvt16@resource.calendar.google.com', resource_id ='Wv2bxej40mOX6Yhd2i2eNOrP_ag',webhook_id='0738b638-050e-4661-8325-9942ba62c885'))

        db.session.add(Calendar(tenant_id = 2,name="Plus",google_id ='c_18831uoh8g3tmgg9gdade5atlealk@resource.calendar.google.com', resource_id ='we6YSwSuSVfGpgbcgVBe7FApVA0',webhook_id='4806032f-6e43-4d19-bd79-b9dd17aa210b'))
        db.session.add(Calendar(tenant_id = 2,name="Remus",google_id ='c_1880fe8oqesfiibij4aefnav7k5cc@resource.calendar.google.com', resource_id ='OSVkvEfi7UTYGLs77405DtL8ydQ',webhook_id='6ec50afa-d1b1-4677-9511-b68a45319394'))
        db.session.add(Calendar(tenant_id = 2,name="Romulus",google_id ='c_1885gqqifk3t8ivcn61rtp5vv1pfk@resource.calendar.google.com', resource_id ='EbhSl19t6JpoxygA116HzV0KKEU',webhook_id='d22dd2a9-1b19-4d67-89f4-d263012b95bf'))


        db.session.commit()




def ServiceAccountsSeeds():
    if ServiceAccounts.query.count() == 0:
        db.session.add(ServiceAccounts(tenant_id = 1,name="service",google_id ='service@coworkreservation.me'))
        db.session.add(ServiceAccounts(tenant_id = 2,name="serviceaccount",google_id ='serviceaccount@coworkapp.space'))

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
        tenantSeed()
        citySeed()
        buildingSeed()
        roomSeed()
        calendarSeed()
        eventSeed()
        ServiceAccountsSeeds()