import React, { PropsWithChildren, useEffect, useState } from 'react'
import { subHours, addHours, subMinutes, addMinutes } from 'date-fns'
import uuid from 'react-native-uuid'

import { Room, Building, City, Tenant } from '../models'
import { findRoomCurrentEvent, isRoomAvailable } from '../utils'

type DataContextType = {
  rooms: Room[] | null
  isLoading: boolean
  currentRoomId: string
  setCurrentRoomId: (id: string) => void
  extendCurrentEvent: (roomId: string, minutes: number) => void
  endCurrentEvent: (roomId: string) => void
  bookEvent: (roomId: string, minutes: number) => void
}

export const DataContext = React.createContext<DataContextType>({
  rooms: null,
  isLoading: true,
  currentRoomId: '',
  setCurrentRoomId: () => {
    /**/
  },
  extendCurrentEvent: () => {
    /**/
  },
  endCurrentEvent: () => {
    /**/
  },
  bookEvent: () => {
    /**/
  },
})

type Props = PropsWithChildren<{}>

export const DataContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [rooms, setRooms] = useState<Room[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentRoomId, setCurrentRoomId] = useState<string>('')

  useEffect(() => {
    const timerId = setTimeout(() => {
      setRooms(dummyRoomList)
      setIsLoading(false)
    }, 1000)

    return () => {
      clearTimeout(timerId)
    }
  }, [])

  const extendCurrentEvent = (roomId: string, minutes: number) => {
    const room = rooms?.find((r) => r.id === roomId)
    if (rooms && room) {
      const event = findRoomCurrentEvent(room)
      if (event) {
        const roomEvents = [
          ...room.events.filter((e) => e.id !== event.id),
          { ...event, endDate: addMinutes(event.endDate, minutes) },
        ]
        const newRoom = {
          ...room,
          events: roomEvents,
        }
        const newRooms = rooms.filter((r) => r.id !== currentRoomId)
        setRooms([...newRooms, newRoom])
      }
    }
  }

  const endCurrentEvent = (roomId: string) => {
    const room = rooms?.find((r) => r.id === roomId)
    if (rooms && room) {
      const event = findRoomCurrentEvent(room)
      if (event) {
        const roomEvents = [
          ...room.events.filter((e) => e.id !== event.id),
          { ...event, endDate: new Date() },
        ]
        const newRoom = {
          ...room,
          events: roomEvents,
        }
        const newRooms = rooms.filter((r) => r.id !== currentRoomId)
        setRooms([...newRooms, newRoom])
      }
    }
  }

  const bookEvent = (roomId: string, minutes: number) => {
    const room = rooms?.find((r) => r.id === roomId)
    if (rooms && room) {
      if (isRoomAvailable(room)) {
        const roomEvents = [
          ...room.events,
          {
            id: uuid.v4().toString(),
            calendarId: 'x',
            name: 'Quick Reservation',
            author: 'Tablet',
            startDate: new Date(),
            endDate: addMinutes(new Date(), minutes),
            googleId: 'x',
            tenantId: 'x',
            tenant: dummyTenant,
          },
        ]
        const newRoom = {
          ...room,
          events: roomEvents,
        }
        const newRooms = rooms.filter((r) => r.id !== currentRoomId)
        setRooms([...newRooms, newRoom])
      }
    }
  }

  return (
    <DataContext.Provider
      value={{
        rooms,
        isLoading,
        currentRoomId,
        setCurrentRoomId,
        extendCurrentEvent,
        endCurrentEvent,
        bookEvent,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

const dummyCity: City = {
  id: '1',
  name: 'Bratislava',
}

const dummyBuilding: Building = {
  id: '1',
  name: 'SkyPark',
  cityId: dummyCity.id,
  city: dummyCity,
  address: 'Jurkovičova Tepláreň',
}

const dummyTenant: Tenant = {
  id: '1',
  name: 'Vacuumlabs',
}

export const dummyRoomList: Room[] = [
  {
    id: '1',
    name: 'Matrix',
    building: dummyBuilding,
    buildingId: dummyBuilding.id,
    floor: '8',
    capacity: '4',
    equipment: '',
    events: [
      {
        id: '1',
        calendarId: '1',
        name: 'VC Meeting',
        author: 'Karol Sloboda',
        startDate: subHours(new Date(), 2),
        endDate: subHours(new Date(), 1),
        googleId: '1',
        tenantId: '1',
        tenant: dummyTenant,
      },
      {
        id: '2',
        calendarId: '2',
        name: 'VC Meeting 2',
        author: 'Janko Zelenka',
        startDate: subMinutes(new Date(), 5),
        endDate: addMinutes(new Date(), 10),
        googleId: '2',
        tenantId: '2',
        tenant: dummyTenant,
      },
      {
        id: '3',
        calendarId: '3',
        name: 'TLK Meeting',
        author: 'Milan Hevier',
        startDate: addHours(new Date(), 1),
        endDate: addHours(new Date(), 2),
        googleId: '3',
        tenantId: '3',
        tenant: dummyTenant,
      },
    ],
  },
  {
    id: '2',
    name: 'Harry Potter',
    building: dummyBuilding,
    buildingId: dummyBuilding.id,
    floor: '7',
    capacity: '2',
    equipment: '',
    events: [
      {
        id: '4',
        calendarId: '1',
        name: 'VC Meeting',
        author: 'Karol Sloboda',
        startDate: subHours(new Date(), 2),
        endDate: subHours(new Date(), 1),
        googleId: '1',
        tenantId: '1',
        tenant: dummyTenant,
      },
    ],
  },
  {
    id: '3',
    name: 'Tardis',
    building: dummyBuilding,
    buildingId: dummyBuilding.id,
    floor: '7',
    capacity: '1',
    equipment: '',
    events: [
      {
        id: '5',
        calendarId: '3',
        name: 'Design Daily',
        author: 'Michal Novák',
        startDate: addMinutes(new Date(), 25),
        endDate: addHours(new Date(), 2),
        googleId: '3',
        tenantId: '3',
        tenant: dummyTenant,
      },
    ],
  },
]
