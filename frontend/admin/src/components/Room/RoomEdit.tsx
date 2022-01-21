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

const RoomEdit: (props: EditProps) => JSX.Element = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <ReferenceInput source="cityId" reference="cities" label="City">
        <AutocompleteInput />
      </ReferenceInput>
      <ReferenceInput
        source="buildingId"
        reference="buildings"
        label="Building"
      >
        <AutocompleteInput />
      </ReferenceInput>
      <TextInput source="name" validate={required()} />
      <TextInput source="floor" validate={required()} />
      <TextInput source="capacity" validate={required()} />
      <TextInput source="equipment" validate={required()} />
    </SimpleForm>
  </Edit>
)

export default RoomEdit
