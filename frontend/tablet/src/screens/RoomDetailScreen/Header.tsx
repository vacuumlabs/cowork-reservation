import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { format } from 'date-fns'

import { Typography, Button, Grid } from '../../components'

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

      <Button
        title="Find Room"
        // TODO Add find room drawer
        // eslint-disable-next-line no-console
        onPress={() => console.log('TODO Open find room drawer')}
      />
    </Grid>
  )
}

export default Header
