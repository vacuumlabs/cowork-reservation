import React, { PropsWithChildren } from 'react'
import { StyleSheet, Text, TextProps } from 'react-native'

import theme, {
  TypographyVariant,
  TypographyColorVariant,
  TypographyFontFamilyVariant,
} from './theme'

type TygographyProps = PropsWithChildren<
  {
    variant?: TypographyVariant
    color?: TypographyColorVariant
    fontFamily?: TypographyFontFamilyVariant
  } & TextProps
>

const Typography: React.FC<TygographyProps> = ({
  variant = 'button',
  color = 'white',
  fontFamily = 'caption',
  style,
  children,
  ...props
}: TygographyProps) => {
  const styles = createStyles(variant, color, fontFamily)
  return (
    <Text style={[styles.typography, style]} {...props}>
      {children}
    </Text>
  )
}

export default Typography

const createStyles = (
  variant: TypographyVariant,
  color: TypographyColorVariant,
  fontFamily: TypographyFontFamilyVariant
) =>
  StyleSheet.create({
    typography: {
      color: theme.colors[color],
      fontSize: theme.fontSize[variant],
      fontFamily: theme.fontFamily[fontFamily],
    },
  })
