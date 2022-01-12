import React from 'react'
import {
  CreateProps,
  Create,
  SimpleForm,
  TextInput,
  required,
  ReferenceInput,
  AutocompleteInput,
} from 'react-admin'

const BuildingCreate: (props: CreateProps) => JSX.Element = (props) => (
  <Create title="Add Building" {...props}>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
      <ReferenceInput
        source="cityId"
        reference="cities"
        link={false}
        validate={required()}
        label="City"
      >
        <AutocompleteInput />
      </ReferenceInput>
      <TextInput source="address" validate={required()} />
    </SimpleForm>
  </Create>
)
export default BuildingCreate
