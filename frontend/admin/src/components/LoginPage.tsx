import React, { useState } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { Login } from 'react-admin'
import { Typography, Button, Box } from '@material-ui/core'

import RegisterPage from './Auth/RegisterPage'

// TODO extract to env
const firebaseConfig = {
  apiKey: 'AIzaSyDWEi46ncDnVLlZBfQtJUQaExTTS0vfFV4',
  authDomain: 'zeta-store-338710.firebaseapp.com',
  projectId: 'zeta-store-338710',
  storageBucket: 'zeta-store-338710.appspot.com',
  messagingSenderId: '150065018955',
  appId: '1:150065018955:web:181764ae5d5d134502f5ce',
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
  const [showRegister, setShowRegister] = useState(false)
  return (
    <Login>
      {!showRegister ? (
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
            <Box pb={1}>
              <Typography align="center">
                Don&apos;t have an account?
              </Typography>
            </Box>

            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowRegister(true)}
            >
              Sign up
            </Button>
          </Box>
        </>
      ) : (
        <RegisterPage setShowRegister={setShowRegister} />
      )}
    </Login>
  )
}

export default LoginPage
