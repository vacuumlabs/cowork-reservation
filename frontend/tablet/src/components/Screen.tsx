import React, { PropsWithChildren } from 'react'
import { StyleSheet, View, Dimensions, ViewStyle } from 'react-native'
import RadialGradient from 'react-native-radial-gradient'

import Grid from './Grid'
import theme from './theme'

const { height, width } = Dimensions.get('window')

type ScreenProps = PropsWithChildren<{
  justify?: ViewStyle['justifyContent']
  alignItems?: ViewStyle['alignItems']
}>

const Screen: React.FC<ScreenProps> = ({
  justify = 'center',
  alignItems = 'center',
  children,
}) => {
  const styles = createStyles()

  return (
    <View style={styles.screen}>
      <RadialGradient
        style={{ width, height }}
        colors={[theme.colors.backgroundDark, theme.colors.backgroundDarker]}
        center={[width / 2, height / 2]}
        radius={width / 2}
      >
        <Grid
          justify={justify}
          alignItems={alignItems}
          stretch
          style={styles.layout}
        >
          {children}
        </Grid>
      </RadialGradient>
    </View>
  )
}

export default Screen

const createStyles = () =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.backgroundDarker,
    },
    layout: {
      flex: 1,
      height: '100%',
      padding: theme.spacing.xl * 2,
    },
  })
