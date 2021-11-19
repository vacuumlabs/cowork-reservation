import React from 'react'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'

import { Room } from '../models'
import LoginScreen from './LoginScreen'
import RoomListScreen from './RoomListScreen'
import RoomDetailScreen from './RoomDetailScreen'

const { Navigator, Screen } = createStackNavigator()

export type NavigatorStackParamList = {
  LoginScreen: undefined
  RoomListScreen: undefined
  RoomDetailScreen: {
    room: Room
  }
}

export type NavigationProps = StackScreenProps<
  NavigatorStackParamList,
  keyof NavigatorStackParamList
>

const ScreenNavigator: () => JSX.Element = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="LoginScreen" component={LoginScreen} />
      <Screen name="RoomListScreen" component={RoomListScreen} />
      <Screen name="RoomDetailScreen" component={RoomDetailScreen} />
    </Navigator>
  )
}

export default ScreenNavigator
