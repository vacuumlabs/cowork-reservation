import { format } from 'date-fns'
import React from 'react'

import { Typography, Grid } from '../../../components'
import { findRoomCurrentEvent, findRoomNextEvent } from '../../../utils'
import { dummyRoomList } from '../../RoomListScreen'

type EventProps = {
  eventVariant: 'current' | 'next'
  currentRoomId: string
}

const Event: React.FC<EventProps> = ({ eventVariant, currentRoomId }) => {
  const room = dummyRoomList.find((r) => r.id === currentRoomId)
  if (!room) return null

  const event =
    eventVariant === 'current'
      ? findRoomCurrentEvent(room)
      : findRoomNextEvent(room)

  if (!room || !event) {
    return (
      <Grid justify="flex-end" alignItems="flex-end">
        <Typography variant="button">
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
      spacing={2}
    >
      <Typography variant="button">
        {eventVariant === 'current' ? 'IN PROGRESS' : 'STARTING NEXT'}
      </Typography>
      <Grid alignItems={eventVariant === 'current' ? 'flex-start' : 'flex-end'}>
        <Typography variant="h4">{name}</Typography>
        <Typography>
          {format(startDate, 'HH:mm')} - {format(endDate, 'HH:mm')}
        </Typography>
        <Typography color="gray">{author}</Typography>
        <Typography color="white">{tenant.name}</Typography>
      </Grid>
    </Grid>
  )
}

export default Event
