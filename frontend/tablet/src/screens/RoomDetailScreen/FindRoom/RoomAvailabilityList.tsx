import React from 'react'
import { SectionList, StyleSheet, View } from 'react-native'
import { Room } from 'shared/models'

import { theme, Typography } from '../../../components'
import { findRoomNextChangeDate, isRoomAvailable } from '../../../utils'
import RoomListItem from './RoomListItem'

type RoomAvailabilityListProps = {
  rooms: Room[]
}

const getSplitRoomList = (rooms: Room[]) => {
  return [
    { title: 'Floor', data: rooms },
    { title: 'Building', data: rooms },
    { title: 'Building', data: rooms },
    { title: 'Building', data: rooms },
    { title: 'Building', data: rooms },
    { title: 'Building', data: rooms },
  ]
}

const RoomAvailabilityList: React.FC<RoomAvailabilityListProps> = ({
  rooms,
}) => {
  return (
    <SectionList
      scrollEnabled
      stickySectionHeadersEnabled
      sections={getSplitRoomList(rooms)}
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
