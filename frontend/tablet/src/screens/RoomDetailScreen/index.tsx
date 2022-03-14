import React, { useContext, useEffect, useState } from 'react'
import { LayoutChangeEvent, StyleSheet, View } from 'react-native'
import SystemNavigationBar from 'react-native-system-navigation-bar'

import { Typography, Screen } from '../../components'
import RoomClock from './RoomClock'
import Header from './Header'

import {
  findRoomCurrentEvent,
  findRoomNextChangeDate,
  findRoomNextEvent,
} from '../../utils'
import { DataContext } from '../../contexts/DataContext'
import Event from './Event'
import QuickActions from './QuickActions'
import { Room, RoomEvent } from '../../models'

const RoomDetailScreen: React.FC = () => {
  const { rooms, isLoading, currentRoomId } = useContext(DataContext)
  const [clockAspectRatio, setClockAspectRatio] = useState(1)
  const [room, setRoom] = useState<Room>()
  const [currentEvent, setCurrentEvent] = useState<RoomEvent>()
  const [nextEvent, setNextEvent] = useState<RoomEvent>()

  if (!rooms || isLoading)
    return (
      <Screen>
        <Typography variant="h2">Loading room...</Typography>
      </Screen>
    )

  useEffect(() => {
    const selectedRoom = rooms.find((r) => r.id === currentRoomId)
    if (selectedRoom) {
      setRoom(selectedRoom)
      setCurrentEvent(findRoomCurrentEvent(selectedRoom))
      setNextEvent(findRoomNextEvent(selectedRoom))
    }
  }, [currentRoomId, rooms])

  if (!room)
    return (
      <Screen>
        <Typography variant="h2">Room not found</Typography>
      </Screen>
    )

  SystemNavigationBar.stickyImmersive()

  const onClockLayout = (e: LayoutChangeEvent) => {
    const { height, width } = e.nativeEvent.layout
    const clockParentAspectRatio = width / height
    setClockAspectRatio(clockParentAspectRatio)
  }

  const onEventStateChange = () => {
    setCurrentEvent(findRoomCurrentEvent(room))
    setNextEvent(findRoomNextEvent(room))
  }

  return (
    <Screen>
      <Header roomName={room.name} />
      <View style={styles.centerContentWrapper}>
        <View style={styles.wrapper}>
          <Event eventVariant="current" event={currentEvent} />
        </View>
        <View onLayout={onClockLayout} style={styles.clockWrapper}>
          <RoomClock
            room={room}
            parentAspectRatio={clockAspectRatio}
            onEventStateChange={onEventStateChange}
          />
        </View>
        <View style={styles.wrapper}>
          <Event eventVariant="next" event={nextEvent} />
        </View>
      </View>
      <QuickActions />
    </Screen>
  )
}

export default RoomDetailScreen

const styles = StyleSheet.create({
  centerContentWrapper: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  clockWrapper: {
    flex: 2,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  wrapper: {
    flex: 1,
  },
  statusLabel: {
    top: 90,
    position: 'absolute',
    alignSelf: 'center',
  },
  sideWrapper: {
    flexGrow: 1,
    width: 250,
  },
})
