import React from 'react'
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
  parseIconFromClassName,
} from 'react-native-fontawesome'

import theme, { SizeVariant, TypographyColorVariant } from './theme'

// browse icons at https://fontawesome.com/v5.15/icons?d=gallery&p=2

type IconProps = {
  name:
    | keyof typeof SolidIcons
    | keyof typeof RegularIcons
    | keyof typeof BrandIcons
  color?: TypographyColorVariant
  size?: SizeVariant
}

const Icon: React.FC<IconProps> = ({ name, color, size = 'md' }) => {
  return (
    <FontAwesome
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      icon={parseIconFromClassName(name)}
      style={{
        color: color
          ? theme.typographyColors[color]
          : theme.colors.backgroundDark,
        fontSize: theme.iconSizeVariant[size],
      }}
    />
  )
}

export default Icon
