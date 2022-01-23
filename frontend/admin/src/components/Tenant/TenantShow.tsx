import React from 'react'
import {
  ShowProps,
  Show,
  SimpleShowLayout,
  TextField,
  ReferenceManyField,
  Datagrid,
  EditButton,
  Button,
  usePermissions,
} from 'react-admin'
import { Link } from 'react-router-dom'
import { Add as AddIcon } from '@material-ui/icons'

import { Tenant, UserRole } from '../../models'

const TenantTitle = ({ record }: { record?: Tenant }) => (
  <span>{record ? record.name : 'Tenant'}</span>
)

const AddAdminButton = (): JSX.Element => (
  <Button
    startIcon={<AddIcon />}
    component={Link}
    label="Invite Tenant Admin"
    to={'../../invites/create'}
  />
)

const AddUserButton = (): JSX.Element => (
  <Button
    startIcon={<AddIcon />}
    component={Link}
    label="Invite user or domain"
    to={'../../invites/create'}
  />
)

const TenantShow: (props: ShowProps) => JSX.Element = (props) => {
  const { permissions } = usePermissions()
  return (
    <Show title={<TenantTitle />} {...props}>
      <SimpleShowLayout>
        <TextField source="name" label="" />
        {permissions === UserRole.SUPER_ADMIN
          ? [<AddAdminButton key="adminButton" />]
          : [<AddUserButton key="userButton" />]}
        <ReferenceManyField
          fullWidth
          label="Admins"
          reference="users"
          target="tenantId"
          sort={{ field: 'id', order: 'ASC' }}
        >
          <Datagrid rowClick="show">
            <TextField source="name" />
            <TextField source="id" />
            {permissions === UserRole.SUPER_ADMIN && <EditButton />}
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  )
}

export default TenantShow
