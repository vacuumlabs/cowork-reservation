import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import ScreenNavigator from './src/screens'
import { UserContextProvider } from './src/contexts/UserContext'
import { DataContextProvider } from './src/contexts/DataContext'

const App: React.FC = () => {
  return (
    <UserContextProvider>
      <DataContextProvider>
        <NavigationContainer>
          <ScreenNavigator />
        </NavigationContainer>
      </DataContextProvider>
    </UserContextProvider>
  )
}

export default App
