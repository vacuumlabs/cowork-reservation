import { Room } from 'shared/models'

export const isRoomAvailable: (room: Room) => boolean = (room) => {
  const now = new Date()
  return room.events.some(
    (event) => event.startDate < now && now < event.endDate
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

export const formatDuration: (duration: Duration) => string = (duration) => {
  const formatLessThanTen = (n?: number) =>
    !n ? `00` : n < 10 ? `0${n}` : `${n}`

  return `${formatLessThanTen(duration.hours)}:${formatLessThanTen(
    duration.minutes
  )}:${formatLessThanTen(duration.seconds)}`
}
