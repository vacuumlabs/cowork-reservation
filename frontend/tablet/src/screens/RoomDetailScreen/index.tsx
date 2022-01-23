import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import SystemNavigationBar from 'react-native-system-navigation-bar'
import { hoursToSeconds, minutesToSeconds } from 'date-fns'

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
import { DataContext } from '../../contexts/DataContext'

const RoomDetailScreen: React.FC = () => {
  const { rooms, isLoading, currentRoomId, endCurrentEvent } =
    useContext(DataContext)

  if (!rooms || isLoading)
    return (
      <Screen>
        <Typography variant="h2">Loading room...</Typography>
      </Screen>
    )

  const room = rooms.find((r) => r.id === currentRoomId)

  if (!room)
    return (
      <Screen>
        <Typography variant="h2">Room not found</Typography>
      </Screen>
    )

  const isAvailable = isRoomAvailable(room)
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
            {isAvailable ? 'FREE' : 'BOOKED'}
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
              onPress={() => endCurrentEvent(room.id)}
              variant="error"
              style={styles.earlyButton}
            />
          )}
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
  earlyButton: {
    bottom: 90,
    position: 'absolute',
    alignSelf: 'center',
  },
})
