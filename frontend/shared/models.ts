export type Tenant = {
  id: string
  name: string
}

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  TENANT_ADMIN = 'TENANT_ADMIN',
  USER = 'USER',
}

export type CustomUserClaims = {
  tenantId: string
  role: UserRole
}

export type User = {
  id: string
  name: string
  email: string
} & CustomUserClaims

export type Room = {
  id: string
  name: string
  cityId: string
  city: string
  buildingId: string
  building: Building
  floor: string
  capacity: string
  equipment: string
}

export type Building = {
  id: string
  name: string
  cityId: string
  city: City
  address: string
}

export type City = {
  id: string
  name: string
}