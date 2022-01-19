import React from 'react'
import { StyleSheet } from 'react-native'

import { Typography, Button, theme, Grid } from '../../../components'
import NextEvent from './NextEvent'

type FooterProps = {
  currentRoomId: string
}

const Footer: React.FC<FooterProps> = ({ currentRoomId }) => {
  return (
    <Grid direction="row" justify="space-between" alignItems="flex-end">
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

      <NextEvent currentRoomId={currentRoomId} />
    </Grid>
  )
}

export default Footer

const styles = StyleSheet.create({
  buttons: {
    marginTop: theme.spacing.lg,
  },
  meetingName: {
    marginTop: theme.spacing.md,
  },
})
