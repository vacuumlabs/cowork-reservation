import React from 'react'
import { View, StyleSheet } from 'react-native'

import { Button } from '../components'

const RoomDetailScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Button title="Room Detail" onPress={() => 'Pressed'} />
    </View>
  )
}

export default RoomDetailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
})
