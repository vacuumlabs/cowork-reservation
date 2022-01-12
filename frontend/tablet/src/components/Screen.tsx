import React, { PropsWithChildren } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import RadialGradient from 'react-native-radial-gradient'

import theme from './theme'

const { height, width } = Dimensions.get('window')

const Screen: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <RadialGradient
      style={styles.screen}
      colors={[theme.colors.backgroundDark, theme.colors.backgroundDarker]}
      center={[width / 2, height / 2]}
      radius={width / 2}
    >
      {children}
    </RadialGradient>
  )
}

export default Screen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: theme.spacing.xl * 2,
  },
})
