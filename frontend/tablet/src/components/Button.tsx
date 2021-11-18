import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import theme, { TypographyColorVariant } from './theme'
import Typography from './Typography'

type ButtonVariant = 'primary' | 'secondary' | 'error'

const buttonVariantTextColorMap: {
  [key in ButtonVariant]: TypographyColorVariant
} = {
  primary: 'black',
  secondary: 'white',
  error: 'white',
}

const buttonVariantBackgroundColorMap: {
  [key in ButtonVariant]: string
} = {
  primary: theme.colors.turquoise,
  secondary: theme.colors.backgroundDark,
  error: theme.colors.red,
}

type ButtonProps = {
  title: string
  onPress: () => void
  variant?: ButtonVariant
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
}) => {
  const styles = createStyles(variant)
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Typography
        variant="button"
        color={buttonVariantTextColorMap[variant]}
        style={styles.text}
      >
        {title}
      </Typography>
    </TouchableOpacity>
  )
}

export default Button

const createStyles = (variant: ButtonVariant) =>
  StyleSheet.create({
    button: {
      backgroundColor: buttonVariantBackgroundColorMap[variant],
      borderRadius: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.lg,
    },
    text: {
      textTransform: 'uppercase',
    },
  })
