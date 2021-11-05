import React from 'react'
import {
  AutocompleteInput,
  Create,
  CreateProps,
  Datagrid,
  EmailField,
  List,
  ListProps,
  ReferenceField,
  ReferenceInput,
  required,
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
        <TextInput source="name" validate={required()} />
        <TextInput source="email" validate={required()} />
        <ReferenceInput
          source="companyId"
          reference="companies"
          link={false}
          validate={required()}
        >
          <AutocompleteInput />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  )
}
