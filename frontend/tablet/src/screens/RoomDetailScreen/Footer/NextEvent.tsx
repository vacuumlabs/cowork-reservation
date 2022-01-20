import { format } from 'date-fns'
import React from 'react'

import { Typography, Grid } from '../../../components'
import { findRoomNextEvent } from '../../../utils'
import { dummyRoomList } from '../../RoomListScreen'

type NextEventProps = {
  currentRoomId: string
}

const NextEvent: React.FC<NextEventProps> = ({ currentRoomId }) => {
  const room = dummyRoomList.find((r) => r.id === currentRoomId)
  const nextEvent = room ? findRoomNextEvent(room) : undefined

  if (!room || !nextEvent) {
    return (
      <Grid justify="flex-end" alignItems="flex-end">
        <Typography variant="button">NO UPCOMING MEETINGS</Typography>
      </Grid>
    )
  }

  const { name, startDate, endDate, author, tenantName } = nextEvent

  return (
    <Grid alignItems="flex-end" spacing={2}>
      <Typography variant="button">NEXT MEETING</Typography>
      <Grid alignItems="flex-end">
        <Typography variant="h4">{name}</Typography>
        <Typography>
          {format(startDate, 'HH:mm')} - {format(endDate, 'HH:mm')}
        </Typography>
        <Typography color="gray">{author}</Typography>
        <Typography color="white">{tenantName}</Typography>
      </Grid>
    </Grid>
  )
}

export default NextEvent
