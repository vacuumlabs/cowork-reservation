export type ColorVariant =
  | 'turquoise'
  | 'red'
  | 'backgroundDark'
  | 'backgroundDarker'
export type TypographyColorVariant = 'turquoise' | 'white' | 'black' | 'gray'
export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'button'
type SizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const theme = {
  spacing: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 32,
  } as { [key in SizeVariant]: number },
  colors: {
    turquoise: '#36DABC',
    red: '#F15152',
    backgroundDark: '#00304E',
    backgroundDarker: '#01161F',
  } as { [key in ColorVariant]: string },
  typographyColors: {
    turquoise: '#36DABC',
    white: '#FFFFFF',
    black: '#000000',
    gray: '#C1C1C1',
  } as { [key in TypographyColorVariant]: string },
  fontFamily: {
    h1: 'Crete Round',
    h2: 'PT Sans Caption Bold',
    h3: 'PT Sans Caption Bold',
    h4: 'Crete Round',
    body: 'Hind Madurai',
    button: 'PT Sans Caption Bold',
  } as { [key in TypographyVariant]: string },
  fontSize: {
    h1: 72,
    h2: 72,
    h3: 40,
    h4: 28,
    body: 22,
    button: 22,
  } as { [key in TypographyVariant]: number },
}

export default theme
