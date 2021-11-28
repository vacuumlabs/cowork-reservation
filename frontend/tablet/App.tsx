import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import ScreenNavigator from './src/screens'
import { UserContextProvider } from './src/contexts/UserContext'

const App: React.FC = () => {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <ScreenNavigator />
      </NavigationContainer>
    </UserContextProvider>
  )
}

export default App
