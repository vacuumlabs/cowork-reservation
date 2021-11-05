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

import { Company } from '../../models'

const CompanyTitle = ({ record }: { record?: Company }) => (
  <span>{record ? record.name : 'Company'}</span>
)

const AddAdminButton = (): JSX.Element => (
  <Button
    startIcon={<AddIcon />}
    component={Link}
    label="Add org admin"
    to={'../../users/create'}
  />
)

const CompanyShow: (props: ShowProps) => JSX.Element = (props) => {
  return (
    <Show title={<CompanyTitle />} {...props}>
      <SimpleShowLayout>
        <TextField source="name" label="" />
        <TextField source="email" label="Email" />
        <AddAdminButton />
        <ReferenceManyField
          fullWidth
          label="Admins"
          reference="users"
          target="companyId"
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

export default CompanyShow
