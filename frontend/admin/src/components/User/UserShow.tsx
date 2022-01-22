import React, { useEffect } from 'react'
import {
  EmailField,
  ReferenceField,
  Show,
  ShowProps,
  SimpleShowLayout,
  TextField,
  useGetIdentity,
} from 'react-admin'
import { Typography } from '@mui/material'
import { User, UserRole } from 'shared/models'
import { Link } from 'react-router-dom'

import { getIdToken } from '../../authProvider'

const UserTitle = ({ record }: { record?: User }) => (
  <span>{record ? record.name : 'User'}</span>
)

const UserShow: (props: ShowProps) => JSX.Element = (props) => {
  const { identity } = useGetIdentity()

  // TEMP console.log firebase idToken for dev purposes
  useEffect(() => {
    const logIdToken = async () => {
      // eslint-disable-next-line no-console
      console.log(await getIdToken())
    }

    if (process.env.NODE_ENV === 'development') {
      logIdToken()
    }
  }, [])

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
          {identity.role === UserRole.SUPER_ADMIN ? (
            <></>
          ) : (
            <ReferenceField
              source="tenantId"
              reference="tenants"
              link={true}
              label="Tenant"
            >
              <TextField source="name" />
            </ReferenceField>
          )}
          <TextField source="role" />
          {identity.role === UserRole.TENANT_ADMIN ? (
            <Link to="/calendar" className="btn btn-primary">
              Link service account
            </Link>
          ) : (
            <></>
          )}
        </SimpleShowLayout>
      )}
    </Show>
  ) : (
    <></>
  )
}

export default UserShow
