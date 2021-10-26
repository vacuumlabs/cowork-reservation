import React from 'react'
import {
  Datagrid,
  Edit,
  EmailField,
  List,
  ListProps,
  ReferenceField,
  Show,
  ShowProps,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
} from 'react-admin'

import { User } from '../models'

export const UserList: (props: ListProps) => JSX.Element = (props) => {
  return (
    <List {...props}>
      <Datagrid rowClick="show">
        <TextField source="name" />
        <EmailField source="email" />
        <ReferenceField source="companyId" reference="companies" link={false}>
          <TextField source="name" />
        </ReferenceField>
      </Datagrid>
    </List>
  )
}

const UserTitle = ({ record }: { record?: User }) => (
  <span>{record ? record.name : 'Company'}</span>
)

export const UserShow: (props: ShowProps) => JSX.Element = (props) => {
  return (
    <Show title={<UserTitle />} hasEdit {...props}>
      <SimpleShowLayout>
        <TextField source="name" label="Name" />
        <EmailField source="email" label="Email" />
      </SimpleShowLayout>
    </Show>
  )
}

export const UserEdit: (props: ShowProps) => JSX.Element = (props) => {
  return (
    <Edit title={<UserTitle />} {...props}>
      <SimpleForm>
        <TextInput source="name" label="Name" />
        <TextInput source="email" label="Email" type="email" />
      </SimpleForm>
    </Edit>
  )
}
