import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import MainNavigator from './src/screens'

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  )
}

export default App
