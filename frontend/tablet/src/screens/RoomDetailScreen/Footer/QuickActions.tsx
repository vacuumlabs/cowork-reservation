import { addMinutes, isBefore } from 'date-fns'
import React from 'react'
import { StyleSheet } from 'react-native'

import { Typography, Grid, theme, Button } from '../../../components'
import { findRoomNextEvent, quickIsRoomAvailable } from '../../../utils'
import { dummyRoomList } from '../../RoomListScreen'

type QuickActionsProps = {
  currentRoomId: string
}

const QuickActions: React.FC<QuickActionsProps> = ({ currentRoomId }) => {
  const room = dummyRoomList.find((r) => r.id === currentRoomId)
  const nextEvent = room ? findRoomNextEvent(room) : undefined

  if (!room || !nextEvent) {
    return (
      <Grid justify="flex-end">
        <Typography variant="button">QUICK RESERVATION</Typography>
        <Grid direction="row" spacing={1} style={styles.buttons}>
          <Button
            title="15 min"
            // eslint-disable-next-line no-console
            onPress={() => console.log('TODO reserve 15 min')}
          />
          <Button
            title="30 min"
            // eslint-disable-next-line no-console
            onPress={() => console.log('TODO reserve 30 min')}
          />
          <Button
            title="45 min"
            // eslint-disable-next-line no-console
            onPress={() => console.log('TODO reserve 45 min')}
          />
          <Button
            title="60 min"
            // eslint-disable-next-line no-console
            onPress={() => console.log('TODO reserve 60 min')}
          />
        </Grid>
      </Grid>
    )
  }

  const { startDate } = nextEvent

  return (
    <Grid justify="flex-end">
      <Typography variant="button">
        {quickIsRoomAvailable(room) ? 'QUICK RESERVATION' : 'EXTEND MEETING'}
      </Typography>
      <Grid direction="row" spacing={1} style={styles.buttons}>
        {isBefore(addMinutes(new Date(), 15), startDate) ? (
          <Button
            title="15 min"
            // eslint-disable-next-line no-console
            onPress={() => console.log('TODO reserve 15 min')}
          />
        ) : (
          <Button title="15 min" onPress={() => ''} variant="secondary" />
        )}
        {isBefore(addMinutes(new Date(), 30), startDate) ? (
          <Button
            title="30 min"
            // eslint-disable-next-line no-console
            onPress={() => console.log('TODO reserve 30 min')}
          />
        ) : (
          <Button title="30 min" onPress={() => ''} variant="secondary" />
        )}
        {isBefore(addMinutes(new Date(), 45), startDate) ? (
          <Button
            title="45 min"
            // eslint-disable-next-line no-console
            onPress={() => console.log('TODO reserve 45 min')}
          />
        ) : (
          <Button title="45 min" onPress={() => ''} variant="secondary" />
        )}
        {isBefore(addMinutes(new Date(), 60), startDate) ? (
          <Button
            title="60 min"
            // eslint-disable-next-line no-console
            onPress={() => console.log('TODO reserve 60 min')}
          />
        ) : (
          <Button title="60 min" onPress={() => ''} variant="secondary" />
        )}
      </Grid>
    </Grid>
  )
}

export default QuickActions

const styles = StyleSheet.create({
  buttons: {
    marginTop: theme.spacing.lg,
  },
})
