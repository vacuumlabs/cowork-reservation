import React, { useState } from 'react'
import {
  LoadingIndicator,
  useMutation,
  useNotify,
  useRedirect,
} from 'react-admin'
import {
  makeStyles,
  TextField,
  Button,
  Card,
  Grid,
  Typography,
  Box,
} from '@material-ui/core'

type RegisterPageProps = {
  setShowRegister: (value: boolean) => void
}

function RegisterPage({ setShowRegister }: RegisterPageProps): JSX.Element {
  const classes = useStyles()
  const notify = useNotify()
  const redirect = useRedirect()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [register, { loading }] = useMutation(
    {
      type: 'create',
      resource: 'register',
      payload: {
        data: {
          name: name,
          email: email,
          password: password,
        },
      },
    },
    {
      onSuccess: ({ data }) => {
        setShowRegister(false)
        notify('Registration successfull')
      },
      onFailure: (error) => {
        notify(error.message, {
          type: 'warning',
        })
        setShowRegister(false)
      },
    }
  )
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
            className={classes.input}
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
            className={classes.input}
          />
        </Grid>
        <Grid item>
          <TextField
            required
            label="Password"
            type="password"
            autoComplete="new-password"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            className={classes.input}
          />
        </Grid>
        <Grid item>
          <Box
            p={2}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              align="center"
              color="primary"
              onClick={() => setShowRegister(false)}
              className={classes.signIn}
            >
              Already have an account? Sign in.
            </Typography>
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
          </Box>
        </Grid>
      </Grid>
    </Card>
  )
}

export default RegisterPage

const useStyles = makeStyles({
  registrationCard: {
    minHeight: 300,
  },
  input: {
    width: 220,
  },
  signIn: {
    marginTop: 8,
    marginBottom: 8,
    cursor: 'pointer',
  },
  button: {
    width: '100%',
  },
})
