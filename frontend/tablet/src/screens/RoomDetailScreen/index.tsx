import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet } from 'react-native'
import SystemNavigationBar from 'react-native-system-navigation-bar'
import { isBefore, isFuture, isPast } from 'date-fns'

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

  SystemNavigationBar.stickyImmersive()

  let availability = 'FREE'
  let nextMeetName = ''
  let nextMeetStartDate = new Date()
  let nextMeetEndDate = new Date()
  let nextMeetAuthor = ''

  for (let i = 0; i < room.event.length; i++) {
    // Room availability
    if (isPast(room.event[i].startDate) && isFuture(room.event[i].endDate)) {
      availability = 'BOOKED'
    }

    // Next meeting
    if (isFuture(room.event[i].startDate)) {
      if (nextMeetName.length === 0) {
        nextMeetName = room.event[i].name
        nextMeetStartDate = room.event[i].startDate
        nextMeetEndDate = room.event[i].endDate
        nextMeetAuthor = room.event[i].author
      } else {
        const compareDate = nextMeetStartDate
        if (isBefore(room.event[i].startDate, compareDate)) {
          nextMeetName = room.event[i].name
          nextMeetStartDate = room.event[i].startDate
          nextMeetEndDate = room.event[i].endDate
          nextMeetAuthor = room.event[i].author
        }
      }
    }
  }

  return (
    <Screen>
      <Grid justify="space-between" stretch style={styles.wrapper}>
        <Header />

        <Grid justify="center" alignItems="center" spacing={2}>
          <Typography variant="h1">{room.name}</Typography>
          <Typography variant="h3">{availability}</Typography>
          <Clock color="turquoise" max={10} />
        </Grid>

        <Footer
          name={nextMeetName}
          startDate={nextMeetStartDate}
          endDate={nextMeetEndDate}
          author={nextMeetAuthor}
        />
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
