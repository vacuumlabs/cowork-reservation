import React from 'react'
import { View, StyleSheet } from 'react-native'

import { Typography, Screen, Button } from '../components'
import theme from '../components/theme'

const RoomDetailScreen: React.FC = () => {
  return (
    <Screen>
      <View style={styles.layout}>
        <View style={styles.header}>
          <View>
            <Typography variant="h3">13:37</Typography>
            <Typography variant="h4">Thursday, Oct 28</Typography>
          </View>

          <Button
            title="Find Room"
            // eslint-disable-next-line no-console
            onPress={() => console.log('TODO Open find room drawer')}
          />
        </View>

        <View style={styles.main}>
          {/* TODO add margins */}
          <Typography variant="h1">Matrix</Typography>
          <Typography variant="h3">FREE</Typography>
          <Typography variant="h2">00:22:35</Typography>
        </View>

        <View style={styles.footer}>
          {/* TODO extract style */}
          {/* eslint-disable-next-line react-native/no-inline-styles */}
          <View style={{ justifyContent: 'flex-end' }}>
            <Typography variant="button">QUICK RESERVATION</Typography>
            {/* TODO extract style */}
            {/* eslint-disable-next-line react-native/no-inline-styles */}
            <View style={{ flexDirection: 'row' }}>
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

          {/* TODO extract style */}
          {/* eslint-disable-next-line react-native/no-inline-styles */}
          <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            {/* TODO margins */}
            <Typography variant="button">NEXT MEETING</Typography>
            <Typography variant="h4">Team Meeting</Typography>
            <Typography>14:30</Typography>
            <Typography color="gray">Karol Sloboda</Typography>
          </View>
        </View>
      </View>
    </Screen>
  )
}

export default RoomDetailScreen

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing.xl * 2,
  },
  main: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing.xl * 2,
  },
})
