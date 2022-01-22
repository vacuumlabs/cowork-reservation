import React from 'react'
import {
  Datagrid,
  List,
  ListProps,
  ReferenceField,
  TextField,
} from 'react-admin'

const InvitationList: (props: ListProps) => JSX.Element = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="value" />
      <ReferenceField
        source="tenantId"
        reference="tenants"
        link={false}
        label="Tenant"
      >
        <TextField source="name" />
      </ReferenceField>
      <TextField source="status" />
      <TextField source="role" />
    </Datagrid>
  </List>
)

export default InvitationList
