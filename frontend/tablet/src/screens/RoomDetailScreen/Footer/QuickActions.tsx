import { addMinutes, isBefore } from 'date-fns'
import React from 'react'
import { StyleSheet } from 'react-native'

import { Typography, Grid, theme, Button } from '../../../components'
import { findRoomNextEvent, isRoomAvailable } from '../../../utils'
import { dummyRoomList } from '../../RoomListScreen'

const extendMeetingMinutes = [15, 30, 45, 60]

type QuickActionsProps = {
  currentRoomId: string
}

const QuickActions: React.FC<QuickActionsProps> = ({ currentRoomId }) => {
  const room = dummyRoomList.find((r) => r.id === currentRoomId)

  if (!room) return null
  const nextEvent = findRoomNextEvent(room)

  return (
    <Grid justify="flex-end" alignItems="center">
      <Typography variant="button" style={styles.title}>
        {isRoomAvailable(room) ? 'QUICK RESERVATION' : 'EXTEND MEETING'}
      </Typography>
      <Grid direction="row" spacing={1}>
        {extendMeetingMinutes.map((minutes) => {
          const isEnoughTime =
            !nextEvent ||
            isBefore(addMinutes(new Date(), minutes), nextEvent.startDate)
          return (
            <Button
              key={minutes}
              title={`${minutes} min`}
              variant={isEnoughTime ? 'primary' : 'secondary'}
              onPress={() => {
                isEnoughTime
                  ? // eslint-disable-next-line no-console
                    console.log(`TODO extend by ${minutes} minutes`)
                  : null
              }}
            />
          )
        })}
      </Grid>
    </Grid>
  )
}

export default QuickActions

const styles = StyleSheet.create({
  title: {
    margin: theme.spacing.lg,
  },
})
