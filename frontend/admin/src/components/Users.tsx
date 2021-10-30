import React from 'react'
import {
  Create,
  CreateProps,
  Datagrid,
  EmailField,
  List,
  ListProps,
  ReferenceField,
  ReferenceInput,
  SimpleForm,
  TextField,
  TextInput,
} from 'react-admin'

export const UserList: (props: ListProps) => JSX.Element = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="name" />
        <EmailField source="email" />
        <ReferenceField source="companyId" reference="companies" link={false}>
          <TextField source="name" />
        </ReferenceField>
      </Datagrid>
    </List>
  )
}

export const UserCreate: (props: CreateProps) => JSX.Element = (props) => {
  return (
    <Create title="Add Admin" {...props}>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="email" />
        <ReferenceInput source="companyId" reference="companies" link={false}>
          <TextInput source="name" />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  )
}
