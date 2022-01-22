import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useDataProvider, useGetIdentity } from 'react-admin'

function AddCalendar(): JSX.Element {
  const dataprovider = useDataProvider()
  const { identity } = useGetIdentity()
  return (
    <Box>
      <Typography variant="h6" component="div">
        Domain wide delegation setup
      </Typography>
      <Typography variant="body2" gutterBottom>
        1. Sign in to your Google Admin console.
      </Typography>
      <Typography variant="body2" gutterBottom>
        2. On the left panel click &quot;Show more&quot;
      </Typography>
      <Typography variant="body2" gutterBottom>
        3. navigate to: Security -&gt; Access and data control -&gt; API
        controls
      </Typography>
      <Typography variant="body2" gutterBottom>
        4. Scroll down and click on &quot;MANAGE DOMAIN WIDE DELEGATION&quot;
      </Typography>
      <Typography variant="body2" gutterBottom>
        5. Click on add new{' '}
      </Typography>
      <Typography variant="body2" gutterBottom>
        6. To the field Client ID paste this: 115567082871599091777
      </Typography>
      <Typography component={'span'} variant="body2" gutterBottom>
        7. Add following scopes:
        <Typography variant="body2" gutterBottom pl={2}>
          https://www.googleapis.com/auth/admin.directory.user
        </Typography>
        <Typography variant="body2" gutterBottom pl={2}>
          https://www.googleapis.com/auth/admin.directory.resource.calendar
        </Typography>
        <Typography variant="body2" gutterBottom pl={2}>
          https://www.googleapis.com/auth/admin.directory.group
        </Typography>
        <Typography variant="body2" gutterBottom pl={2}>
          https://www.googleapis.com/auth/calendar
        </Typography>
      </Typography>
      <Typography variant="body2" gutterBottom>
        8. Click authorize
      </Typography>
      <Typography variant="h6" component="div">
        Adding a service account
      </Typography>
      <Typography variant="body2" gutterBottom>
        1. Make sure you are in home page
      </Typography>
      <Typography variant="body2" gutterBottom>
        2. On the User tab click Add a user
      </Typography>
      <Typography component={'span'} variant="body2" gutterBottom>
        3. Fill the form using this values:
        <Typography variant="body2" gutterBottom pl={2}>
          First name: Service
        </Typography>
        <Typography variant="body2" gutterBottom pl={2}>
          Last name: Account
        </Typography>
      </Typography>
      <Typography variant="body2" gutterBottom>
        4. Click &quot;Add new user&quot;
      </Typography>
      <Typography variant="body2" gutterBottom>
        5. Click on the newly created user. (if you don&apos;t see the user,
        refresh the page
      </Typography>
      <Typography variant="body2" gutterBottom>
        6. Scroll down to &quot;Admin roles and privileges&quot; and click on
        &quot;ASSIGN ROLES&quot;
      </Typography>
      <Typography variant="body2" gutterBottom>
        7. Assign role &quot;Super Admin&quot; and click save
      </Typography>
      {/* <button onClick={DoneClicked}>Done</button> */}
      <Button
        variant="contained"
        style={{
          marginTop: 10,
          marginBottom: 10,
          marginLeft: 5,
          backgroundColor: '#3f51b5',
          fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
          borderRadius: '2px',
          alignSelf: 'flex-end',
        }}
        onClick={() => {
          // dataprovider.getOne('users', { id: '1' }).then(({ data }) => {
          //   console.log(data)
          // })
          console.log(
            identity ? `serviceaccount@${identity.email.split('@')[1]}` : ''
          )
        }}
        size="small"
      >
        Complete
      </Button>
    </Box>
  )
}

export default AddCalendar
