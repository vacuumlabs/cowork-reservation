import React, { PropsWithChildren } from 'react'
import { StyleSheet, Text, TextProps } from 'react-native'

import theme, { TypographyVariant, TypographyColorVariant } from './theme'

type TypographyProps = PropsWithChildren<
  {
    variant?: TypographyVariant
    color?: TypographyColorVariant
  } & TextProps
>

const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  color = 'white',
  style,
  children,
  ...props
}: TypographyProps) => {
  const styles = createStyles(variant, color)
  return (
    <Text style={[styles.typography, style]} {...props}>
      {children}
    </Text>
  )
}

export default Typography

const createStyles = (
  variant: TypographyVariant,
  color: TypographyColorVariant
) =>
  StyleSheet.create({
    typography: {
      color: theme.typographyColors[color],
      fontSize: theme.fontSize[variant],
      fontFamily: theme.fontFamily[variant],
    },
  })
