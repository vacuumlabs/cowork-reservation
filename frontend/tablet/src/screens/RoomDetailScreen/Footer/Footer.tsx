import React from 'react'
import { StyleSheet } from 'react-native'

import { Grid } from '../../../components'
import Event from './Event'
import QuickActions from './QuickActions'

type FooterProps = {
  currentRoomId: string
}

const Footer: React.FC<FooterProps> = ({ currentRoomId }) => {
  return (
    <Grid direction="row" justify="space-between" stretch>
      <Grid justify="flex-end" style={styles.sideWrapper}>
        <Event eventVariant="current" currentRoomId={currentRoomId} />
      </Grid>
      <Grid justify="flex-end" style={styles.centerWrapper}>
        <QuickActions currentRoomId={currentRoomId} />
      </Grid>
      <Grid justify="flex-end" style={styles.sideWrapper}>
        <Event eventVariant="next" currentRoomId={currentRoomId} />
      </Grid>
    </Grid>
  )
}

export default Footer

const styles = StyleSheet.create({
  sideWrapper: {
    flexGrow: 1,
  },
  centerWrapper: {
    flexGrow: 3,
  },
})
