import { endOfToday } from 'date-fns'
import { Room, RoomEvent } from 'shared/models'

export const isRoomAvailable: (room: Room | undefined) => boolean = (room) => {
  const now = new Date()
  return room.events.every(
    (event) => !(event.startDate < now && now < event.endDate)
  )
}

export const findRoomNextChangeDate: (room: Room) => Date | undefined = (
  room
) => {
  const now = new Date()
  return room.events.reduce<Date | undefined>((nextChangeDate, event) => {
    if (event.startDate < now && now < event.endDate) return event.endDate
    if (!nextChangeDate && event.startDate > now) return event.startDate
    return nextChangeDate
  }, undefined)
}

export const findRoomNextEvent: (room: Room) => RoomEvent | undefined = (
  room
) => {
  const now = new Date()
  return room?.events.reduce<RoomEvent | undefined>(
    (nextEvent, event) =>
      event.startDate > now &&
      (!nextEvent || nextEvent.startDate > event.startDate)
        ? event
        : nextEvent,
    undefined
  )
}

export const formatDuration: (duration: Duration) => string = (duration) => {
  const formatLessThanTen = (n?: number) =>
    !n ? `00` : n < 10 ? `0${n}` : `${n}`

  return `${formatLessThanTen(duration.hours)}:${formatLessThanTen(
    duration.minutes
  )}:${formatLessThanTen(duration.seconds)}`
}

export const diffChangeDateAndNow: (changeDate: Date | undefined) => number = (
  changeDate
) => {
  const now = new Date()
  if (changeDate) {
    return (changeDate.getTime() - now.getTime()) / 1000
  } else return (endOfToday().getTime() - now.getTime()) / 1000
}
