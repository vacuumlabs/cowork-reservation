import React from 'react'
import {
  AutocompleteInput,
  Datagrid,
  EditButton,
  List,
  ListProps,
  ReferenceInput,
  TextField,
} from 'react-admin'

const BuildingFilters = [
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

const BuildingList: (props: ListProps) => JSX.Element = (props) => (
  <List {...props} filters={BuildingFilters}>
    <Datagrid rowClick="show">
      <TextField source="name" />
      <TextField source="city" />
      <TextField source="address" />
      <EditButton />
    </Datagrid>
  </List>
)

export default BuildingList
