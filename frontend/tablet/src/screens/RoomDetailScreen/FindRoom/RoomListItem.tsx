import React, { useEffect, useState } from 'react'
import { intervalToDuration } from 'date-fns'

import { Grid, Icon, Typography } from '../../../components'
import { formatDuration } from '../../../utils'

type RoomListItemProps = {
  key: string
  title: string
  isAvailable: boolean
  capacity: string
  changeDate?: Date
}

const RoomListItem: React.FC<RoomListItemProps> = ({
  title,
  isAvailable,
  changeDate,
  capacity,
}) => {
  const [timeLeft, setTimeLeft] = useState<Duration | null>(
    changeDate
      ? intervalToDuration({ start: new Date(), end: changeDate })
      : null
  )

  useEffect(() => {
    if (changeDate) {
      const intervalId = setInterval(
        () =>
          setTimeLeft(
            intervalToDuration({ start: new Date(), end: changeDate })
          ),
        1000
      )
      return () => {
        clearInterval(intervalId)
      }
    }
  }, [changeDate])

  return (
    <Grid direction="row" justify="space-between" alignItems="center">
      <Typography variant="h4" color={isAvailable ? 'turquoise' : 'white'}>
        {title}
      </Typography>
      <Grid direction="row" alignItems="center" spacing={4}>
        <Typography
          variant="button"
          color={isAvailable ? 'turquoise' : 'white'}
        >
          {isAvailable ? 'FREE' : 'BOOKED'}{' '}
          {timeLeft && `(${formatDuration(timeLeft)})`}
        </Typography>

        <Grid direction="row" alignItems="center">
          <Typography variant="button" color="white">
            {capacity}{' '}
          </Typography>
          <Icon name="userFriends" color="white" />
        </Grid>
      </Grid>
    </Grid>
  )
}
export default RoomListItem
