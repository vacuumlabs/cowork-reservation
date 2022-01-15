import React from 'react'
import { StyleSheet } from 'react-native'
import { Room, Building, Event, City } from 'shared/models'

import { NavigationProps } from '..'
import authProvider from '../../authProvider'
import { Button, Grid, Screen } from '../../components'
import RoomCard from './RoomCard'

// TODO use real data
const dummyCityList: City[] = [
  {
    id: '1',
    name: 'Bratislava',
  },
]

const dummyBuildingList: Building[] = [
  {
    id: '1',
    name: 'SkyPark',
    cityId: dummyCityList[0].id,
    city: dummyCityList[0],
    address: 'Jurkovičova Tepláreň',
  },
]

const dummyEventList: Event[] = [
  {
    calendarId: '1',
    roomId: '1',
    name: 'VC Meeting',
    author: 'Karol Sloboda',
    start: '2022-01-15T16:33:54.795Z',
    end: '2022-01-15T17:03:54.795Z',
    googleId: '1',
    tenantId: '1',
  },
  {
    calendarId: '2',
    roomId: '1',
    name: 'VC Meeting 2',
    author: 'Janko Zelenka',
    start: '2022-01-15T18:45:00.795Z',
    end: '2022-01-15T19:00:00.795Z',
    googleId: '2',
    tenantId: '2',
  },
  {
    calendarId: '3',
    roomId: '2',
    name: 'TLK Meeting',
    author: 'Milan Hevier',
    start: '2022-01-16T11:00:00.795Z',
    end: '2022-01-16T12:00:00.795Z',
    googleId: '3',
    tenantId: '3',
  },
]

const dummyRoomList: Room[] = [
  {
    id: '1',
    name: 'Matrix',
    city: dummyCityList[0],
    cityId: dummyCityList[0].id,
    building: dummyBuildingList[0],
    buildingId: dummyBuildingList[0].id,
    floor: '7',
    capacity: '4',
    equipment: '',
    event: dummyEventList,
  },
  {
    id: '2',
    name: 'Harry Potter',
    city: dummyCityList[0],
    cityId: dummyCityList[0].id,
    building: dummyBuildingList[0],
    buildingId: dummyBuildingList[0].id,
    floor: '7',
    capacity: '2',
    equipment: '',
    event: dummyEventList,
  },
  {
    id: '3',
    name: 'Tardis',
    city: dummyCityList[0],
    cityId: dummyCityList[0].id,
    building: dummyBuildingList[0],
    buildingId: dummyBuildingList[0].id,
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
