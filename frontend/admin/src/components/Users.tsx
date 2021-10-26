import React from 'react'
import {
  Datagrid,
  EmailField,
  List,
  ListProps,
  ReferenceField,
  TextField,
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
