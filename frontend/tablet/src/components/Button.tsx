import React from 'react'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import theme from './theme'

import { Typography } from '.'

type ButtonProps = {
  title: string
  onPress: () => void
}

const Button: React.FC<ButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Typography variant="button" color="black">
        {title}
      </Typography>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.turquoise,
    borderRadius: theme.borderRadius.middle,
    paddingHorizontal: theme.paddingHorizontal.middle,
    paddingVertical: theme.paddingVertical.middle,
  },
})
