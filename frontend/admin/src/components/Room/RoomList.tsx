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
      <ReferenceField
        source="cityId"
        reference="cities"
        link={false}
        label="City"
      >
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField
        source="buildingId"
        reference="buildings"
        link={false}
        label="Building"
      >
        <TextField source="name" />
      </ReferenceField>
      <TextField source="floor" />
      <TextField source="capacity" />
      <EditButton />
    </Datagrid>
  </List>
)

export default RoomList
