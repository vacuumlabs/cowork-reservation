import React from 'react'
import {
  Menu,
  MenuItemLink,
  MenuProps,
  useGetIdentity,
  usePermissions,
} from 'react-admin'
import {
  Business as TenantIcon,
  SupervisorAccount as UserIcon,
  Person as ProfileIcon,
  MeetingRoom as RoomIcon,
  HomeWork as BuildingIcon,
  LocationCity as CityIcon,
} from '@material-ui/icons'

import { User, UserRole } from '../models'

const useMenuItems = (user: User) => ({
  [UserRole.SUPER_ADMIN]: [
    <MenuItemLink
      key="tenants"
      to="/tenants"
      primaryText="Tenants"
      leftIcon={<TenantIcon />}
    />,
    <MenuItemLink
      key="users"
      to="/users"
      primaryText="Tenant Admins"
      leftIcon={<UserIcon />}
    />,
    <MenuItemLink
      key="rooms"
      to="/rooms"
      primaryText="Rooms"
      leftIcon={<RoomIcon />}
    />,
    <MenuItemLink
      key="buildings"
      to="/buildings"
      primaryText="Buildings"
      leftIcon={<BuildingIcon />}
    />,
    <MenuItemLink
      key="city"
      to="/cities"
      primaryText="Cities"
      leftIcon={<CityIcon />}
    />,
  ],
  [UserRole.TENANT_ADMIN]: [
    <MenuItemLink
      key="tenants"
      to={user ? `/tenants/${(user as User).tenantId}/show` : ''}
      primaryText="My Profile"
      leftIcon={<ProfileIcon />}
    />,
    <MenuItemLink
      key="users"
      to="/users"
      primaryText="My Admins"
      leftIcon={<UserIcon />}
    />,
  ],
  [UserRole.USER]: [
    <MenuItemLink
      key="users"
      to={
        user?.tenantId
          ? `/users/${(user as User).tenantId}/show`
          : `/users/1/show`
      }
      primaryText="My Profile"
      leftIcon={<ProfileIcon />}
    />,
  ],
})

const _Menu: (props: MenuProps) => JSX.Element = (props) => {
  const { permissions } = usePermissions()
  const { identity } = useGetIdentity()
  const menuItems = useMenuItems(identity as User)

  return (
    <Menu {...props}>
      {permissions in UserRole
        ? menuItems[permissions as UserRole]
        : menuItems[UserRole.USER]}
    </Menu>
  )
}

export default _Menu
