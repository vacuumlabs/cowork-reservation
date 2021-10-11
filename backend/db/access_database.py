from typing import Dict, List, Union

import psycopg2

from db.config_database import ConfigDatabase


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

    def insert_message(self, message_rows: Dict[int, str]):
        self.logger.debug(f"INSERT INTO {self.table_name} VALUES({message_rows}) ")
        conn = psycopg2.connect(**self.postgres_access)
        cursor = conn.cursor()
        insert_query = (
            f"INSERT INTO {self.table_name} (text, created_at) VALUES(%s, %s);"
        )
        insert_tuple = (message_rows["text"], message_rows["created_at"])
        cursor.execute(insert_query, insert_tuple)
        cursor.close()
        conn.commit()
        self.logger.debug("INSERT SUCCESS")
