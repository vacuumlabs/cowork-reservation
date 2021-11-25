import React, { PropsWithChildren, useEffect, useState } from 'react'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

type User = FirebaseAuthTypes.User | null | undefined

type UserContextType = {
  user: User
  isLoading: boolean
}

export const UserContext = React.createContext<UserContextType>({
  user: null,
  isLoading: true,
})

type Props = PropsWithChildren<{}>

export const UserContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [user, setUser] = useState<User>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '182196777623-5ids1dgk2ng0vemgspem665t6a2rehv8.apps.googleusercontent.com',
    })

    const unsubscribe = auth().onAuthStateChanged((authUser) => {
      setUser(authUser)
      setIsLoading(false)
    })

    return () => {
      unsubscribe()
    }
  })

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  )
}
