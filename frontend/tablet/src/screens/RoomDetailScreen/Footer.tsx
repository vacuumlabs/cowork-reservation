import React from 'react'
import { StyleSheet } from 'react-native'

import { Typography, Button, theme, Grid } from '../../components'

const Footer: React.FC = () => {
  return (
    <Grid direction="row" justify="space-between">
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

      <Grid justify="flex-end" alignItems="flex-end">
        <Typography variant="button">NEXT MEETING</Typography>
        <Typography variant="h4" style={styles.meetingName}>
          Team Meeting
        </Typography>
        <Typography>14:00 - 14:30</Typography>
        <Typography color="gray">Karol Sloboda</Typography>
      </Grid>
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
