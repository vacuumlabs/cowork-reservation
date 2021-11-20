import React from 'react'
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'

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
  style?: ViewStyle
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  style,
}) => {
  const styles = createStyles(variant)
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
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

const createStyles = (variant: ButtonVariant) => {
  const verticalPadding = theme.spacing.lg
  return StyleSheet.create({
    button: {
      height: verticalPadding * 2 + theme.fontSize.button,
      backgroundColor: buttonVariantBackgroundColorMap[variant],
      borderRadius: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: verticalPadding,
    },
    text: {
      textTransform: 'uppercase',
    },
  })
}
