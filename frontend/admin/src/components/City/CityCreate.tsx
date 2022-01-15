import React from 'react'
import { CreateProps, Create, SimpleForm, TextInput } from 'react-admin'

const CityCreate: (props: CreateProps) => JSX.Element = (props) => (
  <Create title="Add City" {...props}>
    <SimpleForm>
      <TextInput source="name" />
    </SimpleForm>
  </Create>
)
export default CityCreate
