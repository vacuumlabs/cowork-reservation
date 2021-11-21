import React, { PropsWithChildren } from 'react'
import { StyleSheet, View, Dimensions, ViewStyle } from 'react-native'
import RadialGradient from 'react-native-radial-gradient'

import theme from './theme'

const { height, width } = Dimensions.get('window')

type ScreenProps = PropsWithChildren<{
  layoutVariant?: ViewStyle['justifyContent']
}>

const Screen: React.FC<ScreenProps> = ({
  layoutVariant = 'center',
  children,
}) => {
  const styles = createStyles(layoutVariant)

  return (
    <View style={styles.screen}>
      <RadialGradient
        style={{ width, height }}
        colors={[theme.colors.backgroundDark, theme.colors.backgroundDarker]}
        center={[width / 2, height / 2]}
        radius={width / 2}
      >
        <View style={styles.layout}>{children}</View>
      </RadialGradient>
    </View>
  )
}

export default Screen

const createStyles = (layoutVariant: ViewStyle['justifyContent']) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.backgroundDarker,
    },
    layout: {
      flex: 1,
      justifyContent: layoutVariant,
      padding: theme.spacing.xl * 2,
      ...(layoutVariant === 'center'
        ? {
            alignItems: 'center',
          }
        : {}),
    },
  })
