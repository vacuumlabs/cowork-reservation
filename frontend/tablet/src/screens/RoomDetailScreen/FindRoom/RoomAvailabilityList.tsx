import React from 'react'
import { SectionList, StyleSheet, View } from 'react-native'

import { theme, Typography } from '../../../components'
import { Room } from '../../../models'
import { findRoomNextChangeDate, isRoomAvailable } from '../../../utils'
import RoomListItem from './RoomListItem'

type RoomAvailabilityListProps = {
  rooms: Room[]
  currentRoomId: string
}

const getSplitRoomList = (rooms: Room[], currentRoom?: Room) => {
  return currentRoom
    ? [
        {
          title: `Floor ${currentRoom.floor}`,
          data: rooms.filter((r) => r.floor === currentRoom.floor),
        },
        {
          title: `Rest of ${currentRoom.building.name}`,
          data: rooms.filter(
            (r) =>
              r.building.id === currentRoom.building.id &&
              r.floor !== currentRoom.floor
          ),
        },
      ]
    : [{ title: 'Rooms', data: rooms }]
}

const RoomAvailabilityList: React.FC<RoomAvailabilityListProps> = ({
  rooms,
  currentRoomId,
}) => {
  const currentRoom = rooms.find((r) => r.id === currentRoomId)

  return (
    <SectionList
      scrollEnabled
      stickySectionHeadersEnabled
      sections={getSplitRoomList(rooms, currentRoom)}
      keyExtractor={(item, index) => item.id + index}
      renderItem={({ item }) => (
        <RoomListItem
          key={item.id}
          title={item.name}
          isAvailable={isRoomAvailable(item)}
          changeDate={findRoomNextChangeDate(item)}
          capacity={item.capacity}
        />
      )}
      SectionSeparatorComponent={() => <View style={styles.section} />}
      ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      renderSectionHeader={({ section: { title } }) => (
        <Typography variant="h3" style={styles.header}>
          {title}
        </Typography>
      )}
      ListFooterComponent={() => <View style={styles.footer} />}
    />
  )
}

export default RoomAvailabilityList

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.backgroundDarker,
  },
  section: {
    marginBottom: theme.spacing.md,
  },
  itemSeparator: {
    marginBottom: theme.spacing.xs,
  },
  footer: {
    marginBottom: 250,
  },
})
