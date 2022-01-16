import React from 'react'
import {
  EditProps,
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
} from 'react-admin'

const UserEdit: (props: EditProps) => JSX.Element = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" />
      <ReferenceInput
        source="tenantId"
        reference="tenants"
        label="Tenant"
        disabled
      >
        <AutocompleteInput />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
)

export default UserEdit
