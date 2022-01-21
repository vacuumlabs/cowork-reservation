import React from 'react'
import {
  ShowProps,
  Show,
  SimpleForm,
  TextField,
  ReferenceField,
} from 'react-admin'

const RoomShow: (props: ShowProps) => JSX.Element = (props) => (
  <Show {...props}>
    <SimpleForm>
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
      <TextField source="name" />
      <TextField source="floor" />
      <TextField source="capacity" />
      <TextField source="equipment" />
    </SimpleForm>
  </Show>
)

export default RoomShow
