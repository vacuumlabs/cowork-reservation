import React, { PropsWithChildren } from 'react'
import { StyleSheet, View } from 'react-native'

import theme from './theme'

type ScreenProps = PropsWithChildren<{}>

const Screen: React.FC<ScreenProps> = ({ children }) => {
  return <View style={styles.screen}>{children}</View>
}

export default Screen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.backgroundDarker,
  },
})
