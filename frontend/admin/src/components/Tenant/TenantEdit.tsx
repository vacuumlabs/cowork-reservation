import React from 'react'
import { EditProps, Edit, SimpleForm, TextInput, required } from 'react-admin'

const TenantEdit: (props: EditProps) => JSX.Element = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
      <TextInput source="email" validate={required()} />
    </SimpleForm>
  </Edit>
)

export default TenantEdit
