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
    label="Add Tenant Admin"
    to={'../../users/create'}
  />
)

const AddUserButton = (): JSX.Element => (
  <Button
    startIcon={<AddIcon />}
    component={Link}
    label="Add user via e-mail"
    to={'../../users/create'}
  />
)

const AddDomainButton = (): JSX.Element => (
  <Button
    startIcon={<AddIcon />}
    component={Link}
    label="Add domain"
    to={'../../users/create'}
  />
)

const TenantShow: (props: ShowProps) => JSX.Element = (props) => {
  const { permissions } = usePermissions()
  return (
    <Show title={<TenantTitle />} {...props}>
      <SimpleShowLayout>
        <TextField source="name" label="" />
        <TextField source="email" label="Email" />
        {permissions === UserRole.SUPER_ADMIN
          ? [<AddAdminButton key="adminButton" />]
          : [
              <AddUserButton key="userButton" />,
              <AddDomainButton key="domainButton" />,
            ]}
        <ReferenceManyField
          fullWidth
          label="Admins"
          reference="users"
          target="tenantId"
          sort={{ field: 'id', order: 'ASC' }}
          filter={{ type: 'email' }}
        >
          <Datagrid>
            <TextField source="name" />
            <TextField source="email" />
            <EditButton />
          </Datagrid>
        </ReferenceManyField>
        <ReferenceManyField
          fullWidth
          label="Domains"
          reference="users"
          target="tenantId"
          sort={{ field: 'id', order: 'ASC' }}
          filter={{ type: 'domain' }}
        >
          <Datagrid>
            <TextField source="name" />
            <EditButton />
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  )
}

export default TenantShow
