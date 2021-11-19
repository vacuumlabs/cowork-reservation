import React, { PropsWithChildren } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import RadialGradient from 'react-native-radial-gradient'

import theme from './theme'

const { height, width } = Dimensions.get('window')

type ScreenProps = PropsWithChildren<{}>

const Screen: React.FC<ScreenProps> = ({ children }) => {
  return (
    <View style={styles.screen}>
      <RadialGradient
        style={{ width, height }}
        colors={[theme.colors.backgroundDark, theme.colors.backgroundDarker]}
        center={[width / 2, height / 2]}
        radius={width / 2}
      >
        {children}
      </RadialGradient>
    </View>
  )
}

export default Screen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.backgroundDarker,
  },
})
