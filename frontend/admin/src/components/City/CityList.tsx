import React from 'react'
import { Datagrid, EditButton, List, ListProps, TextField } from 'react-admin'

const CityList: (props: ListProps) => JSX.Element = (props) => (
  <List {...props}>
    <Datagrid rowClick="show">
      <TextField source="name" />
      <EditButton />
    </Datagrid>
  </List>
)

export default CityList
