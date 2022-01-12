import React, { useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'

import {
  Button,
  Grid,
  Screen,
  KeyboardAvoidingView,
  DismissKeyboard,
  Typography,
} from '../../components'
import authProvider from '../../authProvider'
import theme from '../../components/theme'

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('superadmin@test.sk')
  const [password, setPassword] = useState('superadmin')

  return (
    <Screen>
      <DismissKeyboard>
        <KeyboardAvoidingView>
          <Grid
            spacing={6}
            justify="center"
            alignItems="center"
            style={styles.wrapper}
          >
            <Grid spacing={2}>
              <Grid spacing={1}>
                <Typography variant="button">Email</Typography>
                <TextInput
                  placeholder="Email"
                  onChangeText={setEmail}
                  value={email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.input}
                  placeholderTextColor={theme.colors.backgroundDarker}
                />
              </Grid>
              <Grid spacing={1}>
                <Typography variant="button">Password</Typography>
                <TextInput
                  placeholder="Password"
                  onChangeText={setPassword}
                  value={password}
                  secureTextEntry={true}
                  style={styles.input}
                  placeholderTextColor={theme.colors.backgroundDarker}
                />
              </Grid>
            </Grid>
            <Button
              title="Log In"
              onPress={() => authProvider.signIn(email, password)}
              style={styles.button}
            />
          </Grid>
        </KeyboardAvoidingView>
      </DismissKeyboard>
    </Screen>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  input: {
    width: theme.inputWidth,
    padding: theme.spacing.md,
    borderRadius: theme.spacing.xs,
    color: theme.typographyColors.black,
    backgroundColor: theme.colors.backgroundLight,
    fontSize: theme.fontSize.body,
  },
  button: {
    width: theme.inputWidth - theme.spacing.xl,
  },
})
