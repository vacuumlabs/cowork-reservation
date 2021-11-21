import configparser
import logging
import logging.config

from flask import Flask

from flask_sqlalchemy import SQLAlchemy


def config_logging():
    logging.config.fileConfig(
        "config/logging.conf",
    )
    logger = logging.getLogger("root")
    logger.debug("logging.conf got")


def migrate_database(app: Flask):
    with app.app_context():
        from contextlib import redirect_stdout
        from datetime import datetime
        import flask_migrate
        import io

        flask_migrate.upgrade()
        migrate_message = "Migration created at "
        migrate_message += str(datetime.now())
        f = io.StringIO()
        with redirect_stdout(f):
            flask_migrate.migrate(message=migrate_message)
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
