import React from 'react'
import {
  EditProps,
  Edit,
  SimpleForm,
  TextInput,
  required,
  ReferenceInput,
  AutocompleteInput,
} from 'react-admin'

const BuildingEdit: (props: EditProps) => JSX.Element = (props) => (
  <Edit {...props}>
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
  </Edit>
)

export default BuildingEdit
