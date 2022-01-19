import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet } from 'react-native'
import SystemNavigationBar from 'react-native-system-navigation-bar'

import { NavigatorStackParamList } from '..'
import { Typography, Screen, Grid, Button, theme } from '../../components'
import Clock from './Clock'
import Header from './Header'
import Footer from './Footer/Footer'
import { isRoomAvailable } from '../../utils'

type RoomDetailProps = StackScreenProps<
  NavigatorStackParamList,
  'RoomDetailScreen'
>

const RoomDetailScreen: React.FC<RoomDetailProps> = ({
  route,
}: RoomDetailProps) => {
  const { room } = route.params

  SystemNavigationBar.stickyImmersive()

  return (
    <Screen>
      <Grid justify="space-between" stretch style={styles.wrapper}>
        <Header />

        <Grid justify="center" alignItems="center" spacing={2}>
          <Typography variant="h1">{room.name}</Typography>
          <Typography variant="h3">
            {isRoomAvailable(room) ? 'FREE' : 'BOOKED'}
          </Typography>
          {isRoomAvailable(room) ? (
            <Clock color="turquoise" max={10} />
          ) : (
            <Clock color="red" max={10} />
          )}
          {!isRoomAvailable(room) && (
            <Button
              title="End early"
              onPress={() => 'TODO end earlier meet'}
              variant="error"
              style={styles.earlyButton}
            />
          )}
        </Grid>

        <Footer currentRoomId={room.id} />
      </Grid>
    </Screen>
  )
}

export default RoomDetailScreen

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  earlyButton: {
    top: -theme.spacing.xl * 2,
    position: 'absolute',
    alignSelf: 'center',
  },
})
