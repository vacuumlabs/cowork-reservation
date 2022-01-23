import React, { useContext } from 'react'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'

import { Room } from '../models'
import LoginScreen from './LoginScreen'
import RoomListScreen from './RoomListScreen'
import RoomDetailScreen from './RoomDetailScreen'
import { UserContext } from '../contexts/UserContext'

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
  const { user, isLoading } = useContext(UserContext)
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {!isLoading && user ? (
        <>
          <Screen name="RoomListScreen" component={RoomListScreen} />
          <Screen name="RoomDetailScreen" component={RoomDetailScreen} />
        </>
      ) : (
        <Screen name="LoginScreen" component={LoginScreen} />
      )}
    </Navigator>
  )
}

export default ScreenNavigator
