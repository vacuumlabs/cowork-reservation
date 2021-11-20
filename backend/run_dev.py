from app import create_app
from pathlib import Path
from app.seedDB import seed_database
from app.utils import migrate_database


config = Path("config/development.py")
application = create_app(config)  # call from wsgi server
migrate_database(application)
seed_database(application)


if __name__ == "__main__":
    application.run()
