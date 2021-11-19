import React from 'react'
import { View, StyleSheet } from 'react-native'

import { Typography, Screen } from '../../components'
import Header from './Header'
import Footer from './Footer'

const RoomDetailScreen: React.FC = () => {
  return (
    <Screen layoutVariant="space-between">
      <View style={styles.header}>
        <Header />
      </View>

      <View style={styles.main}>
        {/* TODO add margins */}
        <Typography variant="h1">Matrix</Typography>
        <Typography variant="h3">FREE</Typography>
        <Typography variant="h2">00:22:35</Typography>
      </View>

      <View style={styles.footer}>
        <Footer />
      </View>
    </Screen>
  )
}

export default RoomDetailScreen

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  main: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
