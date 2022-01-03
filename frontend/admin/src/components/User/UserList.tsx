import React from 'react'
import {
  ListProps,
  List,
  Datagrid,
  TextField,
  EmailField,
  ReferenceField,
} from 'react-admin'

const UserList: (props: ListProps) => JSX.Element = (props) => {
  return (
    <List {...props}>
      <Datagrid rowClick="show">
        <TextField source="name" />
        <EmailField source="email" />
        <ReferenceField
          source="tenantId"
          reference="tenants"
          link={false}
          label="Tenant"
        >
          <TextField source="name" />
        </ReferenceField>
      </Datagrid>
    </List>
  )
}

export default UserList
