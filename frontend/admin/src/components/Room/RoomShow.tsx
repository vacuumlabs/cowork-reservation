import React from 'react'
import { ShowProps, Show, SimpleForm, TextField } from 'react-admin'

const RoomShow: (props: ShowProps) => JSX.Element = (props) => (
  <Show {...props}>
    <SimpleForm>
      <TextField source="city" />
      <TextField source="building" />
      <TextField source="name" />
      <TextField source="floor" />
      <TextField source="capacity" />
      <TextField source="equipment" />
    </SimpleForm>
  </Show>
)

export default RoomShow
