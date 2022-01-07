import React from 'react'
import {
  AutocompleteInput,
  Datagrid,
  List,
  ListProps,
  ReferenceInput,
  TextField,
} from 'react-admin'

const RoomFilters = [
  <ReferenceInput
    key="city"
    label="City"
    source="cityId"
    reference="cities"
    alwaysOn
  >
    <AutocompleteInput />
  </ReferenceInput>,
]

const RoomList: (props: ListProps) => JSX.Element = (props) => (
  <List {...props} filters={RoomFilters}>
    <Datagrid rowClick="show">
      <TextField source="name" />
      <TextField source="city" />
      <TextField source="building" />
      <TextField source="floor" />
      <TextField source="capacity" />
    </Datagrid>
  </List>
)

export default RoomList
