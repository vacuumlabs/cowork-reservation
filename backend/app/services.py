from app.daos import tenant_dao


class TenantService:
    def add_tenant(self, data: dict):
        # TODO: format user data
        # example: lowercase all emails
        return data


tenant_service = TenantService()
