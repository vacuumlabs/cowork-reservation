import React, { useState } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { Login } from 'react-admin'
import { Typography, Button, Box } from '@material-ui/core'

import RegisterPage from './Auth/RegisterPage'

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
  const [showRegister, setShowRegister] = useState(true)
  return (
    <Login>
      {showRegister ? (
        <>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />

          <Box
            p={2}
            display="flex"
            justifyContent="center"
            flexDirection="column"
          >
            <Typography align="center">Don&apos;t have an account?</Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowRegister(!showRegister)}
            >
              Sign up
            </Button>
          </Box>
        </>
      ) : (
        <RegisterPage />
      )}
    </Login>
  )
}

export default LoginPage
