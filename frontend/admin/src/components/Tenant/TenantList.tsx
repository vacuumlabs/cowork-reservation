import React from 'react'
import { ListProps, List, Datagrid, TextField, EditButton } from 'react-admin'

const TenantList: (props: ListProps) => JSX.Element = (props) => (
  <List {...props}>
    <Datagrid rowClick="show">
      <TextField source="name" />
      <EditButton />
    </Datagrid>
  </List>
)
export default TenantList
