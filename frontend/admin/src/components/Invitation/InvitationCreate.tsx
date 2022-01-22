import React from 'react'
import {
  CreateProps,
  Create,
  SimpleForm,
  TextInput,
  required,
  ReferenceInput,
  AutocompleteInput,
  RadioButtonGroupInput,
} from 'react-admin'

const InvitationCreate: (props: CreateProps) => JSX.Element = (props) => (
  <Create title="Add Building" {...props}>
    <SimpleForm>
      <RadioButtonGroupInput
        source="domain"
        label="Type"
        choices={[
          { id: 'True', name: 'User' },
          { id: 'False', name: 'Domain' },
        ]}
        validate={required()}
      />
      <RadioButtonGroupInput
        source="role"
        choices={[
          { id: 'TENANT_ADMIN', name: 'Tenant admin' },
          { id: 'USER', name: 'Employee' },
        ]}
        validate={required()}
      />
      <TextInput source="value" label="Value" validate={required()} />
    </SimpleForm>
  </Create>
)
export default InvitationCreate
