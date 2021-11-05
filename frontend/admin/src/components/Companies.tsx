import React from 'react'
import {
  TextField,
  EmailField,
  List,
  Datagrid,
  Show,
  ListProps,
  ShowProps,
  ReferenceManyField,
  EditButton,
  SimpleShowLayout,
  CreateProps,
  Create,
  TextInput,
  SimpleForm,
} from 'react-admin'
import { Button } from 'react-admin'
import { Link } from 'react-router-dom'
import { Add as AddIcon } from '@material-ui/icons'

import { Company } from '../models'

export const CompanyList: (props: ListProps) => JSX.Element = (props) => (
  <List {...props}>
    <Datagrid rowClick="show">
      <TextField source="name" />
      <TextField source="phone" />
      <EmailField source="email" />
    </Datagrid>
  </List>
)

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

export const CompanyShow: (props: ShowProps) => JSX.Element = (props) => {
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

export const CompanyCreate: (props: CreateProps) => JSX.Element = (props) => (
  <Create title="Add Company" {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" />
      <TextInput source="phone" />
    </SimpleForm>
  </Create>
)
