export type ColorVariant =
  | 'turquoise'
  | 'red'
  | 'backgroundLight'
  | 'backgroundDark'
  | 'backgroundDarker'
export type TypographyColorVariant = 'turquoise' | 'white' | 'black' | 'gray'
export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'button'
export type SizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const SPACING_UNIT = 8

export const spacing = (multiplier: number): number =>
  Math.floor(multiplier * SPACING_UNIT)

const theme = {
  spacing: {
    xs: spacing(1),
    sm: spacing(1.5),
    md: spacing(2),
    lg: spacing(2.5),
    xl: spacing(4),
  } as { [key in SizeVariant]: number },
  iconSizeVariant: {
    xs: 20,
    sm: 24,
    md: 28,
    lg: 32,
    xl: 48,
  } as { [key in SizeVariant]: number },
  colors: {
    turquoise: '#36DABC',
    red: '#F15152',
    backgroundLight: '#A9DEFF',
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
  lineHeight: {
    h1: 92,
    h2: 94,
    h3: 52,
    h4: 36,
    body: 30,
    button: 28.5,
  } as { [key in TypographyVariant]: number },
  inputWidth: 300,
}

export default theme
