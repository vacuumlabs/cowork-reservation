export type TypographyVariant = 'button'
export type TypographyColorVariant = 'white' | 'black' | 'turquoise' | 'red'
export type TypographyFontFamilyVariant = 'caption' | 'round' | 'madurai'

const theme = {
  colors: {
    white: '#FFFFFF',
    black: '#000000',
    turquoise: '#36DABC',
    red: '#F15152',
  } as { [key in TypographyColorVariant]: string },
  fontFamily: {
    caption: 'PT Sans Caption Bold',
    round: 'Crete Round',
    madurai: 'Hind Madurai',
  } as { [key in TypographyFontFamilyVariant]: string },
  fontSize: {
    button: 18,
  } as { [key in TypographyVariant]: number },
  borderRadius: {
    middle: 12,
  },
  paddingHorizontal: {
    middle: 18,
  },
  paddingVertical: {
    middle: 12,
  },
}

export default theme
