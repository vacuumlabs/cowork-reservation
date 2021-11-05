import React from 'react'
import {
  CreateProps,
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
  required,
} from 'react-admin'

const UserCreate: (props: CreateProps) => JSX.Element = (props) => {
  return (
    <Create title="Add Admin" {...props}>
      <SimpleForm>
        <TextInput source="name" validate={required()} />
        <TextInput source="email" validate={required()} />
        <ReferenceInput
          source="companyId"
          reference="companies"
          link={false}
          validate={required()}
        >
          <AutocompleteInput />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  )
}

export default UserCreate
