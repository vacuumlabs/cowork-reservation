export type Tenant = {
  id: string
  name: string
}

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  TENANT_ADMIN = 'TENANT_ADMIN',
  USER = 'USER',
}

export type User = {
  id: string
  name: string
  email: string
  tenantId: string
  role: UserRole
}

export type Room = {
  id: string
  roomNumber: string
  city: string
  building: string
  floor: string
  capacity: string
  equipment: string
}
