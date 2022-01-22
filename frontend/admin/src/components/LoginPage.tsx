import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { Login } from 'ra-ui-materialui'

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
}

function LoginPage(): JSX.Element {
  return (
    <div>
      <Login>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </Login>
    </div>
  )
}

export default LoginPage
