import { Card, CardContent, CardHeader } from '@material-ui/core'
import React from 'react'
import { Show, ShowProps, TextField, useGetIdentity } from 'react-admin'

const UserShow: (props: ShowProps) => JSX.Element = (props) => {
  const { identity } = useGetIdentity()
  console.log(identity)
  return (
    <Show {...props} title="Profile">
      <Card>
        <CardHeader title={`Hello ${identity?.name}`} />
        <CardContent>
          {identity?.tenantId === undefined
            ? 'You are not part of any organisation.'
            : 'Here is your calendar'}
        </CardContent>
      </Card>
    </Show>
  )
}

export default UserShow
