import React from 'react'
import {
  CreateProps,
  Create,
  SimpleForm,
  TextInput,
  required,
} from 'react-admin'

const RoomCreate: (props: CreateProps) => JSX.Element = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="city" validate={required()} />
      <TextInput source="building" validate={required()} />
      <TextInput source="roomNumber" validate={required()} />
      <TextInput source="floor" validate={required()} />
      <TextInput source="capacity" validate={required()} />
      <TextInput source="equipment" validate={required()} />
    </SimpleForm>
  </Create>
)

export default RoomCreate
