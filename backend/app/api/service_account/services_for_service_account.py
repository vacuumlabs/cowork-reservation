
from googleapiclient.discovery import build
from oauth2client.service_account import ServiceAccountCredentials
from google.oauth2 import service_account


def get_other_service(api_name, api_version, scopes, key_file_location):

    credentials = ServiceAccountCredentials.from_json_keyfile_name(
            key_file_location, scopes=scopes)

    # Build the service object.
    service = build(api_name, api_version, credentials=credentials)

    return service

#hento ide cez domain delegation
def  get_service (api_name, api_version, scopes, key_file_location, mask):

    credentials = service_account.Credentials.from_service_account_file(key_file_location, scopes=scopes)

    delegated_credentials = credentials.with_subject(mask)

    service = build(api_name, api_version, credentials=delegated_credentials)
    return service



def  get_service_for_directory (scopes, key_file_location, mask):

    credentials = service_account.Credentials.from_service_account_file(key_file_location, scopes=scopes)

    delegated_credentials = credentials.with_subject(mask)

    service = build('admin', 'directory_v1', credentials=delegated_credentials)

    return service


