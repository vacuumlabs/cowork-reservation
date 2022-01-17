import React from 'react'
import { subHours, addHours, subMinutes, addMinutes } from 'date-fns'
import { StyleSheet } from 'react-native'
import { Room, Building, Event, City } from 'shared/models'

import { NavigationProps } from '..'
import authProvider from '../../authProvider'
import { Button, Grid, Screen } from '../../components'
import RoomCard from './RoomCard'

// TODO use real data
const dummyCity: City = {
  id: '1',
  name: 'Bratislava',
}

const dummyBuilding: Building = {
  id: '1',
  name: 'SkyPark',
  cityId: dummyCity.id,
  city: dummyCity,
  address: 'Jurkovičova Tepláreň',
}

const dummyEventList: Event[] = [
  {
    calendarId: '1',
    name: 'VC Meeting',
    author: 'Karol Sloboda',
    startDate: subHours(new Date(), 2),
    endDate: subHours(new Date(), 1),
    googleId: '1',
    tenantId: '1',
  },
  {
    calendarId: '2',
    name: 'VC Meeting 2',
    author: 'Janko Zelenka',
    startDate: subMinutes(new Date(), 30),
    endDate: addMinutes(new Date(), 30),
    googleId: '2',
    tenantId: '2',
  },
  {
    calendarId: '3',
    name: 'TLK Meeting',
    author: 'Milan Hevier',
    startDate: addHours(new Date(), 1),
    endDate: addHours(new Date(), 2),
    googleId: '3',
    tenantId: '3',
  },
]

const dummyRoomList: Room[] = [
  {
    id: '1',
    name: 'Matrix',
    building: dummyBuilding,
    buildingId: dummyBuilding.id,
    floor: '7',
    capacity: '4',
    equipment: '',
    event: dummyEventList,
  },
  {
    id: '2',
    name: 'Harry Potter',
    building: dummyBuilding,
    buildingId: dummyBuilding.id,
    floor: '7',
    capacity: '2',
    equipment: '',
    event: dummyEventList,
  },
  {
    id: '3',
    name: 'Tardis',
    building: dummyBuilding,
    buildingId: dummyBuilding.id,
    floor: '7',
    capacity: '1',
    equipment: '',
    event: dummyEventList,
  },
]

const RoomListScreen: React.FC<NavigationProps> = ({
  navigation,
}: NavigationProps) => {
  return (
    <Screen>
      <Grid alignItems="flex-end">
        <Button
          key="logout"
          title="Log Out"
          variant="error"
          onPress={() => authProvider.signOut()}
        />
      </Grid>

      <Grid
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
        style={styles.list}
      >
        {dummyRoomList.map((room) => (
          // TODO RoomCard with more info and better design
          <RoomCard
            key={room.id}
            {...room}
            onPress={() =>
              navigation.navigate('RoomDetailScreen', {
                room,
              })
            }
          />
        ))}
      </Grid>
    </Screen>
  )
}

export default RoomListScreen

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
})
