import React from 'react'
import { View } from 'react-native'

import { Typography, Button, Grid } from '../../components'

const Header: React.FC = () => {
  return (
    <Grid direction="row" justify="space-between">
      <View>
        <Typography variant="h3">13:37</Typography>
        <Typography variant="h4">Thursday, Oct 28</Typography>
      </View>

      <Button
        title="Find Room"
        // TODO Add find room drawer
        // eslint-disable-next-line no-console
        onPress={() => console.log('TODO Open find room drawer')}
      />
    </Grid>
  )
}

export default Header
