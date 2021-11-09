import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Room } from './src/screens'

const {Navigator, Screen} = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="room" component={Room}></Screen>
        </Navigator>
    </NavigationContainer>
  )
}

export default App