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
  SupervisorAccount as UsersIcon,
  Person as ProfileIcon,
  MeetingRoom as RoomIcon,
  HomeWork as BuildingIcon,
  LocationCity as CityIcon,
  PersonAdd as InvitationIcon,
} from '@material-ui/icons'

import { User, UserRole } from '../models'

const useMenuItems = (user?: User) => {
  const ProfileMenuItemLink = () => (
    <MenuItemLink
      to={user ? `/user/${user.id}/show` : ''}
      primaryText="My Profile"
      leftIcon={<ProfileIcon />}
    />
  )
  const TenantAdminsMenuItemLink = ({ title }: { title: string }) => (
    <MenuItemLink to="/users" primaryText={title} leftIcon={<UsersIcon />} />
  )
  return {
    [UserRole.SUPER_ADMIN]: [
      <ProfileMenuItemLink key="profile" />,
      <MenuItemLink
        key="tenants"
        to="/tenants"
        primaryText="Tenants"
        leftIcon={<TenantIcon />}
      />,
      <TenantAdminsMenuItemLink key="users" title="Tenant Admins" />,
      <MenuItemLink
        key="invites"
        to="/invites"
        primaryText="Invitations"
        leftIcon={<InvitationIcon />}
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
      <ProfileMenuItemLink key="profile" />,
      <MenuItemLink
        key="tenant-profile"
        to={user ? `/tenants/${(user as User).tenantId}/show` : ''}
        primaryText="Tenant Profile"
        leftIcon={<TenantIcon />}
      />,
      <MenuItemLink
        key="users"
        to="/users"
        primaryText="My People"
        leftIcon={<UsersIcon />}
      />,
      <MenuItemLink
        key="invites"
        to="/invites"
        primaryText="Invitations"
        leftIcon={<InvitationIcon />}
      />,
    ],
    [UserRole.USER]: [<ProfileMenuItemLink key="profile" />],
  }
}

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
