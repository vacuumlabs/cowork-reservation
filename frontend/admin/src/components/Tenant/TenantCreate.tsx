import React from 'react'
import { CreateProps, Create, SimpleForm, TextInput } from 'react-admin'

const TenantCreate: (props: CreateProps) => JSX.Element = (props) => (
  <Create title="Add Tenant" {...props}>
    <SimpleForm>
      <TextInput source="name" />
    </SimpleForm>
  </Create>
)
export default TenantCreate
