import { format } from 'date-fns'
import React from 'react'

import { Typography, Grid } from '../../../components'
import { findRoomCurrentEvent } from '../../../utils'
import { dummyRoomList } from '../../RoomListScreen'

type CurrentEventProps = {
  currentRoomId: string
}

const CurrentEvent: React.FC<CurrentEventProps> = ({ currentRoomId }) => {
  const room = dummyRoomList.find((r) => r.id === currentRoomId)
  const currentEvent = room ? findRoomCurrentEvent(room) : undefined

  if (!room || !currentEvent) {
    return (
      <Grid justify="flex-end" alignItems="flex-end">
        <Typography variant="button">NO CURRENT MEETING</Typography>
      </Grid>
    )
  }

  const { name, startDate, endDate, author, tenantName } = currentEvent

  return (
    <Grid alignItems="flex-start" spacing={2}>
      <Typography variant="button">CURRENT MEETING</Typography>
      <Grid alignItems="flex-start">
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

export default CurrentEvent
