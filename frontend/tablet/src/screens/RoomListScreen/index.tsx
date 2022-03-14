import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'

import { NavigationProps } from '..'
import authProvider from '../../authProvider'
import { Button, Grid, Screen, Typography } from '../../components'
import { DataContext } from '../../contexts/DataContext'
import RoomCard from './RoomCard'

const RoomListScreen: React.FC<NavigationProps> = ({
  navigation,
}: NavigationProps) => {
  const { rooms, isLoading, setCurrentRoomId } = useContext(DataContext)

  return (
    <Screen>
      <Grid alignItems="flex-end">
        <Button
          key="logout"
          title="Log Out"
          variant="secondary"
          onPress={() => authProvider.signOut()}
        />
      </Grid>

      <Grid
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
        style={styles.list}
      >
        {!rooms || isLoading ? (
          <Typography variant="h2">Loading rooms...</Typography>
        ) : (
          rooms.map((room) => (
            <RoomCard
              key={room.id}
              {...room}
              onPress={() => {
                setCurrentRoomId(room.id)
                navigation.navigate('RoomDetailScreen')
              }}
            />
          ))
        )}
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
