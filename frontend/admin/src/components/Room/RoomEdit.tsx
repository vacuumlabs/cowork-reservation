import React from 'react'
import { EditProps, Edit, SimpleForm, TextInput, required } from 'react-admin'

const RoomEdit: (props: EditProps) => JSX.Element = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="city" disabled />
      <TextInput source="building" disabled />
      <TextInput source="name" validate={required()} />
      <TextInput source="floor" validate={required()} />
      <TextInput source="capacity" validate={required()} />
      <TextInput source="equipment" validate={required()} />
    </SimpleForm>
  </Edit>
)

export default RoomEdit
