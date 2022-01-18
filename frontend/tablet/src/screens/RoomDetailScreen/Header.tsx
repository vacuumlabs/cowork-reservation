import React from 'react'
import { View } from 'react-native'

import { Typography, Grid } from '../../components'
import FindRoomModal from './FindRoom/FindRoomModal'

const Header: React.FC = () => {
  return (
    <Grid direction="row" justify="space-between">
      <View>
        <Typography variant="h3">13:37</Typography>
        <Typography variant="h4">Thursday, Oct 28</Typography>
      </View>

      <FindRoomModal />
    </Grid>
  )
}

export default Header
