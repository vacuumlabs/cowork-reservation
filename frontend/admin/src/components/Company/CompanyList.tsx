import React from 'react'
import { ListProps, List, Datagrid, TextField, EmailField } from 'react-admin'

const CompanyList: (props: ListProps) => JSX.Element = (props) => (
  <List {...props}>
    <Datagrid rowClick="show">
      <TextField source="name" />
      <TextField source="phone" />
      <EmailField source="email" />
    </Datagrid>
  </List>
)
export default CompanyList
