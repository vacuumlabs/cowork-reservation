import React from 'react'
import { View } from 'react-native'
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
  parseIconFromClassName,
} from 'react-native-fontawesome'

import theme, { TypographyColorVariant } from './theme'

// browse icons at https://fontawesome.com/v5.15/icons?d=gallery&p=2

type IconProps = {
  name:
    | keyof typeof SolidIcons
    | keyof typeof RegularIcons
    | keyof typeof BrandIcons
  color?: TypographyColorVariant
}

const Icon: React.FC<IconProps> = ({ name, color }) => {
  return (
    <View>
      <FontAwesome
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        icon={parseIconFromClassName(name)}
        style={{
          color: color
            ? theme.typographyColors[color]
            : theme.colors.backgroundDark,
        }}
      />
    </View>
  )
}

export default Icon
