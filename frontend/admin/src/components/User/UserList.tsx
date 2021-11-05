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
      <Datagrid>
        <TextField source="name" />
        <EmailField source="email" />
        <ReferenceField
          source="companyId"
          reference="companies"
          link={false}
          label="Organisation"
        >
          <TextField source="name" />
        </ReferenceField>
      </Datagrid>
    </List>
  )
}

export default UserList
