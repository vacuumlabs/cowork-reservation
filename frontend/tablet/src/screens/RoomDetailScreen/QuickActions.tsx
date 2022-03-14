import { addMinutes, isBefore } from 'date-fns'
import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'

import { Typography, Grid, theme, Button } from '../../components'
import { DataContext } from '../../contexts/DataContext'
import { findRoomCurrentEvent, findRoomNextEvent } from '../../utils'

const buttonMinutes = [15, 30, 45, 60]

const QuickActions: React.FC = () => {
  const { rooms, isLoading, currentRoomId, bookEvent, extendCurrentEvent } =
    useContext(DataContext)

  if (!rooms || isLoading)
    return <Typography variant="h2">Loading rooms...</Typography>

  const room = rooms.find((r) => r.id === currentRoomId)

  if (!room) return null
  const currentEvent = findRoomCurrentEvent(room)
  const nextEvent = findRoomNextEvent(room)
  const isAvailable = !currentEvent

  return (
    <Grid alignItems="center">
      <Typography variant="button" style={styles.title}>
        {isAvailable ? 'QUICK RESERVATION' : 'EXTEND MEETING'}
      </Typography>
      <Grid direction="row" spacing={3}>
        {buttonMinutes.map((minutes) => {
          const isEnoughTime =
            !nextEvent ||
            isBefore(
              addMinutes(
                isAvailable ? new Date() : currentEvent.endDate,
                minutes
              ),
              nextEvent.startDate
            )
          const action = () => {
            isAvailable
              ? bookEvent(currentRoomId, minutes)
              : extendCurrentEvent(currentRoomId, minutes)
          }
          return (
            <Button
              key={minutes}
              title={`${minutes} min`}
              variant={isEnoughTime ? 'primary' : 'secondary'}
              onPress={() => {
                isEnoughTime ? action() : null
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
