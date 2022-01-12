import React from 'react'
import { EditProps, Edit, SimpleForm, TextInput, required } from 'react-admin'

const CityEdit: (props: EditProps) => JSX.Element = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
    </SimpleForm>
  </Edit>
)

export default CityEdit
