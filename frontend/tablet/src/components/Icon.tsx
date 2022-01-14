import React from 'react'
import { View } from 'react-native'
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
  parseIconFromClassName,
} from 'react-native-fontawesome'

// browse icons at https://fontawesome.com/v5.15/icons?d=gallery&p=2

type IconProps = {
  name:
    | keyof typeof SolidIcons
    | keyof typeof RegularIcons
    | keyof typeof BrandIcons
}

const Icon: React.FC<IconProps> = ({ name }) => {
  return (
    <View>
      {/* @ts-ignore lib types missing*/}
      <FontAwesome icon={parseIconFromClassName(name)} />
    </View>
  )
}

export default Icon
