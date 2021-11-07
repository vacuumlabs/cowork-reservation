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
} from 'react-admin'
import { Link } from 'react-router-dom'
import { Add as AddIcon } from '@material-ui/icons'

import { Tenant } from '../../models'

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

const TenantShow: (props: ShowProps) => JSX.Element = (props) => {
  return (
    <Show title={<TenantTitle />} {...props}>
      <SimpleShowLayout>
        <TextField source="name" label="" />
        <TextField source="email" label="Email" />
        <AddAdminButton />
        <ReferenceManyField
          fullWidth
          label="Admins"
          reference="users"
          target="tenantId"
        >
          <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="email" />
            <EditButton />
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  )
}

export default TenantShow
