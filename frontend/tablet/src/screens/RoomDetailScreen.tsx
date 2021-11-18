import React from 'react'
import { View, StyleSheet } from 'react-native'

import { Button } from '../components'

const RoomDetailScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* eslint-disable-next-line no-console */}
      <Button title="Room Detail" onPress={() => console.log('Pressed')} />
      <Button
        variant="secondary"
        title="Room Detail"
        // eslint-disable-next-line no-console
        onPress={() => console.log('Pressed')}
      />
      <Button
        variant="error"
        title="Room Detail"
        // eslint-disable-next-line no-console
        onPress={() => console.log('Pressed')}
      />
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
