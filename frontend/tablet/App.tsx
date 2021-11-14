import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { RoomDetailScreen } from './src/screens'

const {Navigator, Screen} = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="RoomDetailScreen" component={RoomDetailScreen}></Screen>
        </Navigator>
    </NavigationContainer>
  )
}

export default App