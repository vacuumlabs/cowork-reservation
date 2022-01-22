import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet } from 'react-native'
import SystemNavigationBar from 'react-native-system-navigation-bar'
import { hoursToSeconds, minutesToSeconds } from 'date-fns'

import { NavigatorStackParamList } from '..'
import { Typography, Screen, Grid, Button } from '../../components'
import Clock from './Clock'
import Header from './Header'
import Footer from './Footer/Footer'
import {
  diffChangeDateAndNow,
  findRoomCurrentEvent,
  findRoomNextChangeDate,
  isRoomAvailable,
} from '../../utils'

type RoomDetailProps = StackScreenProps<
  NavigatorStackParamList,
  'RoomDetailScreen'
>

const RoomDetailScreen: React.FC<RoomDetailProps> = ({
  route,
}: RoomDetailProps) => {
  const { room } = route.params
  if (!room)
    return (
      <Screen>
        <Typography variant="h1">Room not found</Typography>
      </Screen>
    )

  const changeDate = findRoomNextChangeDate(room)
  const currentEvent = findRoomCurrentEvent(room)

  const currentEventStartEndDate = currentEvent
    ? hoursToSeconds(currentEvent.endDate.getHours()) +
      minutesToSeconds(currentEvent.endDate.getMinutes()) +
      currentEvent.endDate.getSeconds() -
      (hoursToSeconds(currentEvent.startDate.getHours()) +
        minutesToSeconds(currentEvent.startDate.getMinutes()) +
        currentEvent.startDate.getSeconds())
    : 0

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
            <Clock color="turquoise" max={diffChangeDateAndNow(changeDate)} />
          ) : (
            <Clock
              color="red"
              max={diffChangeDateAndNow(changeDate)}
              bookedTime={currentEventStartEndDate}
            />
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
    bottom: 90,
    position: 'absolute',
    alignSelf: 'center',
  },
})
