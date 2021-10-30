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

import { Company, User } from '../models'
import AddUserButton from './addUserButton'

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

export const CompanyShow: (props: ShowProps) => JSX.Element = (props) => {
  return (
    <Show title={<CompanyTitle />} {...props}>
      <SimpleShowLayout>
        <TextField source="name" label="" />
        {/* <TextField source="email" label="Email" /> */}
        <AddUserButton />
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
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" />
      <TextInput source="phone" />
    </SimpleForm>
  </Create>
)
