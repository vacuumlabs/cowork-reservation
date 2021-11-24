import React, { useState } from 'react'
import {
  CreateProps,
  Create,
  SimpleForm,
  TextInput,
  required,
  ReferenceInput,
  AutocompleteInput,
} from 'react-admin'

const RoomCreate: (props: CreateProps) => JSX.Element = (props) => {
  const [city, setCity] = useState('')
  return (
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
          <AutocompleteInput onInputValueChange={(value) => setCity(value)} />
        </ReferenceInput>
        <ReferenceInput
          source="buildingId"
          reference="buildings"
          link={false}
          validate={required()}
          label="Building"
          filter={{ cityId: city }}
        >
          <AutocompleteInput />
        </ReferenceInput>

        <TextInput source="floor" validate={required()} />
        <TextInput source="capacity" validate={required()} />
        <TextInput source="equipment" validate={required()} />
      </SimpleForm>
    </Create>
  )
}

export default RoomCreate
