import React from 'react'
import { CreateProps, Create, SimpleForm, TextInput } from 'react-admin'

const CompanyCreate: (props: CreateProps) => JSX.Element = (props) => (
  <Create title="Add Company" {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" />
      <TextInput source="phone" />
    </SimpleForm>
  </Create>
)
export default CompanyCreate
