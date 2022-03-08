import { format } from 'date-fns'
import React, { useContext } from 'react'
import { StyleProp, TextStyle, View } from 'react-native'

import { Typography, Grid } from '../../components'
import { spacing } from '../../components/theme'
import { DataContext } from '../../contexts/DataContext'
import { findRoomCurrentEvent, findRoomNextEvent } from '../../utils'

type EventProps = {
  eventVariant: 'current' | 'next'
}

const Event: React.FC<EventProps> = ({ eventVariant }) => {
  const { rooms, isLoading, currentRoomId } = useContext(DataContext)
  const textAlignStyle: StyleProp<TextStyle> = {
    textAlign: eventVariant === 'current' ? 'left' : 'right',
  }

  if (!rooms || isLoading)
    return <Typography variant="h2">Loading rooms...</Typography>

  const room = rooms.find((r) => r.id === currentRoomId)
  if (!room) return null

  const event =
    eventVariant === 'current'
      ? findRoomCurrentEvent(room)
      : findRoomNextEvent(room)

  if (!room || !event) {
    return (
      <Grid stretch>
        <Typography
          variant="button"
          style={[textAlignStyle, { height: 'auto' }]}
        >
          {eventVariant === 'current'
            ? 'NO CURRENT MEETING'
            : 'NO NEXT MEETINGS'}
        </Typography>
      </Grid>
    )
  }

  const { name, startDate, endDate, author, tenant } = event

  return (
    <Grid
      alignItems={eventVariant === 'current' ? 'flex-start' : 'flex-end'}
      stretch
      spacing={2}
    >
      <Typography
        numberOfLines={2}
        variant="button"
        style={[textAlignStyle, { height: 'auto' }]}
      >
        {eventVariant === 'current' ? 'IN PROGRESS' : 'STARTING NEXT'}
      </Typography>
      <Grid
        alignItems={eventVariant === 'current' ? 'flex-start' : 'flex-end'}
        style={{ width: '100%' }}
      >
        <Typography
          variant="h4"
          numberOfLines={2}
          style={[textAlignStyle, { height: 'auto' }]}
        >
          {name}
        </Typography>
        <Typography style={textAlignStyle}>
          {format(startDate, 'HH:mm')} - {format(endDate, 'HH:mm')}
        </Typography>
        <Typography color="gray" style={textAlignStyle}>
          {author}
        </Typography>
        <Typography color="white" style={textAlignStyle}>
          {tenant.name}
        </Typography>
      </Grid>
    </Grid>
  )
}
export default Event
