import React, { useState } from 'react'
import { LoadingIndicator, useMutation } from 'react-admin'
import { makeStyles, TextField, Button, Card, Grid } from '@material-ui/core'

function RegisterPage(): JSX.Element {
  const classes = useStyles()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [register, { loading }] = useMutation({
    type: 'create',
    resource: 'users',
    payload: {
      data: {
        name: name,
        email: email,
        password: password,
      },
    },
  })
  return (
    <Card className={classes.registrationCard}>
      <Grid container direction="column" alignItems="center" spacing={1}>
        <Grid item>
          <TextField
            required
            label="Name"
            inputProps={{ maxLength: 50 }}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            required
            label="E-mail"
            inputProps={{ maxLength: 200 }}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            required
            label="Password"
            type="new-password"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </Grid>
        <Grid item>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={register}
              className={classes.button}
            >
              Register
            </Button>
          )}
        </Grid>
      </Grid>
    </Card>
  )
}

export default RegisterPage

const useStyles = makeStyles({
  registrationCard: {
    minHeight: 250,
  },
  button: {
    marginTop: 16,
  },
})
