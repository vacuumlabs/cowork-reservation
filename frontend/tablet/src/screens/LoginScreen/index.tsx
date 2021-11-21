import React from 'react'

import { NavigationProps } from '..'
import { Button, Screen, Typography } from '../../components'
import theme from '../../components/theme'

const LoginScreen: React.FC<NavigationProps> = ({
  navigation,
}: NavigationProps) => {
  return (
    <Screen>
      <Typography variant="h3" style={{ marginBottom: theme.spacing.xl }}>
        TODO login form
      </Typography>
      <Button
        title="Log In"
        onPress={() => navigation.navigate('RoomListScreen')}
      />
    </Screen>
  )
}

export default LoginScreen
