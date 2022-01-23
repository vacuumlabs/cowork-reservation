import React from 'react'
import {
  CreateProps,
  Create,
  SimpleForm,
  TextInput,
  required,
  RadioButtonGroupInput,
  useGetIdentity,
  ReferenceInput,
  AutocompleteInput,
} from 'react-admin'

import { UserRole } from '../../models'

const InvitationCreate: (props: CreateProps) => JSX.Element = (props) => {
  const { identity } = useGetIdentity()
  return (
    <Create title="Add Building" {...props}>
      <SimpleForm>
        <RadioButtonGroupInput
          source="domain"
          label="Type"
          choices={[
            { id: 'False', name: 'User' },
            { id: 'True', name: 'Domain' },
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
        {identity?.role === UserRole.SUPER_ADMIN && (
          <ReferenceInput
            source="tenantId"
            reference="tenants"
            link={false}
            validate={required()}
          >
            <AutocompleteInput />
          </ReferenceInput>
        )}
      </SimpleForm>
    </Create>
  )
}
export default InvitationCreate
