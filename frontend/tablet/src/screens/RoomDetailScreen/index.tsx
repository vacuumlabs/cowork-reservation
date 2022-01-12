import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet } from 'react-native'

import { NavigatorStackParamList } from '..'
import { Typography, Screen, Grid } from '../../components'
import Clock from './Clock'
import Header from './Header'
import Footer from './Footer'

type RoomDetailProps = StackScreenProps<
  NavigatorStackParamList,
  'RoomDetailScreen'
>

const RoomDetailScreen: React.FC<RoomDetailProps> = ({
  route,
}: RoomDetailProps) => {
  const { room } = route.params

  return (
    <Screen>
      <Grid justify="space-between" stretch style={styles.wrapper}>
        <Header />

        <Grid justify="center" alignItems="center" spacing={2}>
          <Typography variant="h1">{room.title}</Typography>
          <Typography variant="h3">FREE</Typography>
          <Clock color="turquoise" max={10} />
        </Grid>

        <Footer />
      </Grid>
    </Screen>
  )
}

export default RoomDetailScreen

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
})
