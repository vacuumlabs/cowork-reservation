import React from 'react'

import { NavigationProps } from '..'
import authProvider from '../../authProvider'
import { Button, Grid, Screen } from '../../components'
import { Room } from '../../models'

// TODO use real data
const dummyRoomList: Room[] = [
  {
    id: '1',
    title: 'Matrix',
    city: 'Bratislava',
    building: 'SkyPark',
    floor: '7',
    capacity: 4,
  },
  {
    id: '2',
    title: 'Harry Potter',
    city: 'Bratislava',
    building: 'SkyPark',
    floor: '7',
    capacity: 2,
  },
  {
    id: '3',
    title: 'Tardis',
    city: 'Bratislava',
    building: 'SkyPark',
    floor: '7',
    capacity: 1,
  },
]

const RoomListScreen: React.FC<NavigationProps> = ({
  navigation,
}: NavigationProps) => {
  return (
    <Screen justify="flex-start">
      <Grid alignItems="flex-end">
        <Button
          key="logout"
          title="Log Out"
          onPress={() => authProvider.signOut()}
        />
      </Grid>

      <Grid alignItems="center" spacing={1}>
        {dummyRoomList.map((room) => (
          // TODO RoomCard with more info and better design
          <Button
            key={room.id}
            title={room.title}
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
