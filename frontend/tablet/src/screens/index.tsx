import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import RoomDetailScreen from './RoomDetailScreen'

const { Navigator, Screen } = createStackNavigator()

const ScreenNavigator: () => JSX.Element = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="RoomDetailScreen" component={RoomDetailScreen} />
    </Navigator>
  )
}

export default ScreenNavigator
