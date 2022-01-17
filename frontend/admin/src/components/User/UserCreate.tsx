import React from 'react'
import {
  CreateProps,
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
  required,
  useGetIdentity,
} from 'react-admin'

const UserCreate: (props: CreateProps) => JSX.Element = (props) => {
  const { identity } = useGetIdentity()
  return (
    <Create title="Add Admin" {...props}>
      <SimpleForm>
        <TextInput source="email" validate={required()} />
        <ReferenceInput
          source="tenantId"
          reference="tenants"
          link={false}
          defaultValue={identity?.tenantId}
          disabled
        >
          <AutocompleteInput />
        </ReferenceInput>
        <AutocompleteInput
          source="role"
          choices={[
            { id: 'TENANT_ADMIN', name: 'Tenant admin' },
            { id: 'USER', name: 'Employee' },
          ]}
        />
      </SimpleForm>
    </Create>
  )
}

export default UserCreate
