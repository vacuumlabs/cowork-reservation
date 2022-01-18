import React from 'react'
import { View } from 'react-native'

import { Typography, Grid } from '../../components'
import FindRoomModal from './FindRoomModal'

type HeaderProps = {
  roomId: string
}

const Header: React.FC<HeaderProps> = ({ roomId }) => {
  return (
    <Grid direction="row" justify="space-between">
      <View>
        <Typography variant="h3">13:37</Typography>
        <Typography variant="h4">Thursday, Oct 28</Typography>
      </View>

      <FindRoomModal roomId={roomId} />
    </Grid>
  )
}

export default Header
