import React from 'react'
import { StyleSheet } from 'react-native'
import { Room } from 'shared/models'

import { NavigationProps } from '..'
import authProvider from '../../authProvider'
import { Button, Grid, Screen } from '../../components'
import RoomCard from './RoomCard'

// TODO use real data
const dummyRoomList: Room[] = [
  {
    id: '1',
    name: 'Matrix',
    city: 'Bratislava',
    cityId: '1',
    building: 'SkyPark',
    buildingId: '1',
    floor: '7',
    capacity: '4',
    equipment: '',
  },
  {
    id: '2',
    name: 'Harry Potter',
    city: 'Bratislava',
    cityId: '1',
    building: 'SkyPark',
    buildingId: '1',
    floor: '7',
    capacity: '2',
    equipment: '',
  },
  {
    id: '3',
    name: 'Tardis',
    city: 'Bratislava',
    cityId: '1',
    building: 'SkyPark',
    buildingId: '1',
    floor: '7',
    capacity: '1',
    equipment: '',
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
