import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { GoogleSigninButton } from '@react-native-google-signin/google-signin'

import { Button, Screen } from '../../components'
import AuthProvider from '../../AuthProvider'
import theme from '../../components/theme'

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Screen>
      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        style={styles.input}
      />
      <Button
        title="Log In"
        onPress={() => AuthProvider.signIn(email, password)}
      />
      <GoogleSigninButton
        style={styles.googleButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={() => AuthProvider.googleSignIn()}
      />
    </Screen>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  input: {
    height: theme.spacing.xl * 2,
    width: theme.spacing.xl * 10,
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.turquoise,
    fontSize: theme.fontSize.body,
  },
  googleButton: {
    marginTop: theme.spacing.md,
  },
})
