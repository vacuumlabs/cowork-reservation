from app import create_app
from pathlib import Path

config = Path("config/production.py")
application = create_app(config)  # call from wsgi server

if __name__ == "__main__":
    application.run()
