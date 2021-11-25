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

const RoomCreate: (props: CreateProps) => JSX.Element = (props) => (
  <Create {...props}>
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
      <ReferenceInput
        source="buildingId"
        reference="buildings"
        link={false}
        validate={required()}
        label="Building"
      >
        <AutocompleteInput />
      </ReferenceInput>

      <TextInput source="floor" validate={required()} />
      <TextInput source="capacity" validate={required()} />
      <TextInput source="equipment" validate={required()} />
    </SimpleForm>
  </Create>
)

export default RoomCreate
