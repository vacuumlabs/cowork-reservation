import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { format } from 'date-fns'

import { Typography, Grid } from '../../components'
import FindRoomModal from './FindRoom/FindRoomModal'

const Header: React.FC = () => {
  const [dateTime, setDateTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Grid direction="row" justify="space-between">
      <View>
        <Typography variant="h3">{format(dateTime, 'HH:mm')}</Typography>
        <Typography variant="h4">{format(dateTime, 'EEEE, MMM dd')}</Typography>
      </View>

      <FindRoomModal />
    </Grid>
  )
}

export default Header
