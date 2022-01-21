import React from 'react'
import {
  AutocompleteInput,
  Datagrid,
  EditButton,
  List,
  ListProps,
  ReferenceField,
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
      <ReferenceField
        source="cityId"
        reference="cities"
        link={false}
        label="City"
      >
        <TextField source="name" />
      </ReferenceField>
      <TextField source="address" />
      <EditButton />
    </Datagrid>
  </List>
)

export default BuildingList
