declare module 'react-native-radial-gradient' {
  import React, { PropsWithChildren } from 'react'
  import { ViewStyle } from 'react-native'

  type RadialGradientProps = PropsWithChildren<{
    style: ViewStyle
    colors: string[]
    center: number[]
    radius: number
  }>

  const RadialGradient: (props: RadialGradientProps) => JSX.Element
  export default RadialGradient
}
