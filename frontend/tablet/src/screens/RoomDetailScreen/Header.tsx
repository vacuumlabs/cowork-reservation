import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { format } from 'date-fns'

import { Typography, Grid } from '../../components'
import FindRoomModal from './FindRoom/FindRoomModal'

type HeaderProps = {
  roomName: string
}

const Header: React.FC<HeaderProps> = ({ roomName }) => {
  const [dateTime, setDateTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <View style={styles.headerContainer}>
      <View style={styles.dateContainer}>
        <Typography variant="h3">{format(dateTime, 'HH:mm')}</Typography>
        <Typography variant="h4">{format(dateTime, 'EEEE, MMM dd')}</Typography>
      </View>
      <View style={styles.titleContainer}>
        <Typography variant="h1">{roomName}</Typography>
      </View>

      <View style={styles.findRoomModalContainer}>
        <FindRoomModal />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
  },
  dateContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  titleContainer: {
    flex: 2,
    alignItems: 'center',
  },
  findRoomModalContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
})

export default Header
