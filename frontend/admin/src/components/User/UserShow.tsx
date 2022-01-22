import React from 'react'
import {
  EmailField,
  ReferenceField,
  Show,
  ShowProps,
  SimpleShowLayout,
  TextField,
  useGetIdentity,
} from 'react-admin'
import { Typography } from '@material-ui/core'

import { User } from '../../models'

const UserTitle = ({ record }: { record?: User }) => (
  <span>{record ? record.name : 'User'}</span>
)

const UserShow: (props: ShowProps) => JSX.Element = (props) => {
  const { identity } = useGetIdentity()
  return identity ? (
    <Show {...props} title={<UserTitle />}>
      {identity.tenantId === undefined ? (
        <Typography variant="h5">
          You are not part of any organisation.
        </Typography>
      ) : (
        <SimpleShowLayout>
          <TextField source="name" />
          <EmailField source="email" />
          <ReferenceField
            source="tenantId"
            reference="tenants"
            link={true}
            label="Tenant"
          >
            <TextField source="name" />
          </ReferenceField>
        </SimpleShowLayout>
      )}
    </Show>
  ) : (
    <></>
  )
}

export default UserShow
