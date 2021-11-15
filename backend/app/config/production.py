ENV = "production"
DEBUG = False
SQLALCHEMY_ECHO = False
# postgresql://coworkdbadmin:password123@localhost:5432/cowork
# In production URI should be overridden by env variable
SQLALCHEMY_DATABASE_URI = (
    "postgresql://coworkdbadmin:password123@34.118.9.194:5432/cowork_GCP"
)
SQLALCHEMY_TRACK_MODIFICATIONS = False
