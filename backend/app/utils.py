import configparser
import logging
import logging.config
import google.cloud.logging
import json

from flask import Flask

from flask_sqlalchemy import SQLAlchemy

import re  
  
def to_snake(word):  
  return re.sub('([A-Z]\w+$)', '_\\1', word).lower()  
  
def to_camel(word):  
    components = word.split('_')  
    return components[0] + ''.join(x.title() for x in components[1:])  
  
def camel_to_snake_dict(d: dict) -> dict:  
   if isinstance(d, list):  
      return [camel_to_snake_dict(i) if isinstance(i, (dict, list)) else i for i in d]  
   return {to_snake(a):camel_to_snake_dict(b) if isinstance(b, (dict, list)) else b for a, b in d.items()}  
  
def snake_to_camel_dict(d: dict) -> dict:
    if isinstance(d, int):
        return str(d)
    if isinstance(d, list):  
        return [snake_to_camel_dict(i) if isinstance(i, (dict, list)) else i for i in d]  
    return {to_camel(a):snake_to_camel_dict(b) if isinstance(b, (dict, list, int)) else b for a, b in d.items()}  

def config_logging():
    client = google.cloud.logging.Client()
    client.setup_logging()
    logging.config.fileConfig(
        "config/logging.conf",
    )
    logger = logging.getLogger("root")
    logger.debug("logging.conf got")

def gcp_print(message: str):
    print(json.dumps(str(message)))
    import sys

    sys.stdout.flush()


def migrate_database(app: Flask):
    with app.app_context():
        from contextlib import redirect_stdout
        from datetime import datetime
        import flask_migrate
        import io

        flask_migrate.upgrade()
        f = io.StringIO()
        with redirect_stdout(f):
            flask_migrate.migrate()
        out = f.getvalue()
        if " ...  done" in out:
            filename = out
            filename = filename[
                filename.find("migrations\\versions\\") : filename.find(".py") + 4
            ]
            migration_file = open(filename, "r+")
            lines = migration_file.readlines()
            moved_lines = []
            for idx, line in enumerate(lines):
                if "op.drop_table" in line:
                    moved_lines.append(line)
                    lines[idx] = ""
                elif "# ### end Alembic commands ###" in line:
                    for i, drops in enumerate(moved_lines):
                        lines.insert(idx, moved_lines[i])
                    moved_lines.clear()
                pass
            migration_file.seek(0)
            migration_file.truncate()
            migration_file.write("".join(lines))
            migration_file.close()
            print(filename)
            flask_migrate.upgrade()
