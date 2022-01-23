import React from 'react'
import { StyleSheet } from 'react-native'

import { Grid } from '../../../components'
import Event from './Event'
import QuickActions from './QuickActions'

const Footer: React.FC = () => {
  return (
    <Grid direction="row" justify="space-between" stretch>
      <Grid
        justify="flex-end"
        alignItems="flex-start"
        style={styles.sideWrapper}
      >
        <Event eventVariant="current" />
      </Grid>
      <Grid justify="flex-end" style={styles.centerWrapper}>
        <QuickActions />
      </Grid>
      <Grid justify="flex-end" alignItems="flex-end" style={styles.sideWrapper}>
        <Event eventVariant="next" />
      </Grid>
    </Grid>
  )
}

export default Footer

const styles = StyleSheet.create({
  sideWrapper: {
    flexGrow: 1,
    width: 250,
  },
  centerWrapper: {
    flexGrow: 3,
  },
})
