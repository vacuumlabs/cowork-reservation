import React, { useState } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { Login } from 'ra-ui-materialui'
import { Button, Card, TextField } from '@mui/material'

// TODO extract to env
const firebaseConfig = {
  apiKey: 'AIzaSyAJ_GxyUXUkja9DCHXVTbH9Jhje5bsfv9s',
  authDomain: 'coworkreservation.firebaseapp.com',
  projectId: 'coworkreservation',
  storageBucket: 'coworkreservation.appspot.com',
  messagingSenderId: '182196777623',
  appId: '1:182196777623:web:c9d18ac242055ba54f2fd2',
  measurementId: 'G-LRR9NTQ779',
}

firebase.initializeApp(firebaseConfig)

const uiConfig = {
  signInSuccessUrl: '#/',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  popupMode: true,
}

function LoginPage(): JSX.Element {
  const [loginPage, setLoginPage] = useState(true)

  const handleSwitch = () => {
    setLoginPage(!loginPage)
  }

  // TODO
  const handleRegistration = () => {
    console.log('NYI (not yet implemented)')
  }
  return (
    <div>
      {loginPage ? (
        <Login>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
          <Button
            variant="contained"
            onClick={handleSwitch}
            style={{
              display: 'flex',
              alignSelf: 'center',
              marginLeft: '7.5em',
              marginBottom: '1em',
              backgroundColor: '#3f51b5',
              fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
              borderRadius: '2px',
            }}
          >
            Register
          </Button>
        </Login>
      ) : (
        <Login>
          <Card
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <TextField
              required
              id="standard-required"
              label="Name"
              variant="standard"
              inputProps={{ maxLength: 50 }}
            />
            <TextField
              required
              id="standard-required"
              label="E-mail"
              variant="standard"
              inputProps={{ maxLength: 50 }}
            />
            <TextField
              required
              id="standard-password-input"
              label="Password"
              type="password"
              variant="standard"
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
              }}
            >
              <Button
                variant="contained"
                style={{
                  boxShadow: 'none',
                  marginTop: 10,
                  marginBottom: 10,
                  marginRight: 1,
                  backgroundColor: 'rgba(0, 0, 255, 0)',
                  color: '#3f51b5',
                  fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
                  borderRadius: '2px',
                  marginLeft: 20,
                }}
                onClick={handleSwitch}
                size="small"
              >
                Cancel
              </Button>
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
                onClick={handleRegistration}
                size="small"
              >
                Register
              </Button>
            </div>
          </Card>
        </Login>
      )}
    </div>
  )
}

export default LoginPage
