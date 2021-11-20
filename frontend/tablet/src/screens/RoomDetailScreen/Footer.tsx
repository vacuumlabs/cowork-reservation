import React from 'react'
import { StyleSheet, View } from 'react-native'

import { Typography, Button, theme } from '../../components'

const Footer: React.FC = () => {
  return (
    <>
      <View style={styles.quickActions}>
        <Typography variant="button">QUICK RESERVATION</Typography>
        <View style={styles.buttons}>
          {/* TODO add margins */}
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
        </View>
      </View>

      <View style={styles.nextMeeting}>
        <Typography variant="button">NEXT MEETING</Typography>
        <Typography variant="h4" style={styles.meetingName}>
          Team Meeting
        </Typography>
        <Typography>14:00 - 14:30</Typography>
        <Typography color="gray">Karol Sloboda</Typography>
      </View>
    </>
  )
}

export default Footer

const styles = StyleSheet.create({
  quickActions: {
    justifyContent: 'flex-end',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: theme.spacing.lg,
  },
  nextMeeting: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  meetingName: {
    marginTop: theme.spacing.md,
  },
})
