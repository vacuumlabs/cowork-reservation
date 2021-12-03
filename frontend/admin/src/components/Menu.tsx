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
} from '@material-ui/icons'
import { User, UserRole } from 'cowork_models/models'

const _Menu: (props: MenuProps) => JSX.Element = (props) => {
  const { permissions } = usePermissions()
  const { identity } = useGetIdentity()

  return (
    <Menu {...props}>
      {permissions === UserRole.SUPER_ADMIN
        ? [
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
          ]
        : [
            <MenuItemLink
              key="tenants"
              to={
                identity ? `/tenants/${(identity as User).tenantId}/show` : ''
              }
              primaryText="My Profile"
              leftIcon={<ProfileIcon />}
            />,
            <MenuItemLink
              key="users"
              to="/users"
              primaryText="My Admins"
              leftIcon={<UserIcon />}
            />,
          ]}
    </Menu>
  )
}

export default _Menu
