from typing import Dict, List, Union
from datetime import datetime
import psycopg2
from sqlalchemy.sql.expression import true

from db.config_database import ConfigDatabase
from sqlalchemy import create_engine, engine
from sqlalchemy.engine.url import URL
from sqlalchemy import text

# TODO: THIS file is slowly being deleted, its only purpose now is to not break somethine, next commit should remove it
# Database communication is done by file db/queries.py and api/api.py
class AccessDataBase(ConfigDatabase):
    def __init__(self) -> None:
        self.engine = create_engine(
            URL("postgresql", **self.postgres_access), future=True
        )
        with self.engine.connect() as conn:
            conn.execute(
                text(
                    f"""CREATE TABLE IF NOT EXISTS {self.table_name}(
                    id SERIAL PRIMARY KEY,
                    text varchar(500) NOT NULL,
                    created_at date NOT NULL)"""
                )
            )
            conn.commit()

    def get_messages(self, indice: int = 0):
        with self.engine.connect() as conn:
            result = conn.execute(text("select text from messages"))
            list_of_dicts = [dict(result) for result in result.all()]
        return list_of_dicts

    def insert_message(self, message_rows: Dict[str, str]):
        with self.engine.connect() as conn:
            conn.execute(
                text(
                    "INSERT INTO messages (text, created_at) VALUES (:text, :created_at)"
                ),
                [
                    {
                        "text": message_rows["text"],
                        "created_at": str(datetime.now().date()),
                    }
                ],
            )
            conn.commit()


'''
class AccessDataBase(ConfigDatabase):
    def __init__(self) -> None:
        self.logger.debug("Init Class AccessDataBase")
        conn = psycopg2.connect(**self.postgres_access)
        cursor = conn.cursor()
        query = f"""CREATE TABLE IF NOT EXISTS {self.table_name}(
                    id SERIAL PRIMARY KEY NOT NULL,
                    text varchar(200) NOT NULL,
                    created_at date NOT NULL)"""
        cursor.execute(query)
        cursor.close()
        conn.commit()
        self.logger.debug("CLASS AccessDataBase INIT SUCCESS")

    def get_messages(self, indice: int = 0):
        self.logger.debug("GETTING DATA")
        conn = psycopg2.connect(**self.postgres_access)
        self.logger.debug("DB CONNECTED")
        cursor = conn.cursor()
        select_query = f"SELECT * FROM {self.table_name} ORDER BY created_at DESC;"
        cursor.execute(select_query)
        self.logger.debug("QUERY EXECUTED")
        data = cursor.fetchall()
        cursor.close()
        conn.commit()
        self.logger.debug("RETURNING DATA")
        return data

    def insert_message(self, message_rows: Dict[str, str]):
        self.logger.debug(f"INSERT INTO {self.table_name} VALUES({message_rows}) ")
        conn = psycopg2.connect(**self.postgres_access)
        cursor = conn.cursor()
        insert_query = f"INSERT INTO {self.table_name} (text, created_at) VALUES(%s, %s);"
        insert_tuple = (message_rows["text"], message_rows["created_at"])
        cursor.execute(insert_query, insert_tuple)
        cursor.close()
        conn.commit()
        self.logger.debug("INSERT SUCCESS")
'''
