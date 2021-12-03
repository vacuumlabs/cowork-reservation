import { Card, CardContent, CardHeader } from '@material-ui/core'
import React from 'react'
import { Logout, Show, ShowProps, useGetIdentity } from 'react-admin'

const UserShow: (props: ShowProps) => JSX.Element = (props) => {
  const { identity } = useGetIdentity()
  return (
    <Show {...props} title="Cowork Reservation App">
      <Card>
        <CardHeader title={`Hello ${identity?.name}`} />
        <CardContent>
          {identity?.tenantId === undefined
            ? 'You are not part of any organisation.'
            : 'Here is your calendar'}
        </CardContent>
        <Logout button={true} />
      </Card>
    </Show>
  )
}

export default UserShow
