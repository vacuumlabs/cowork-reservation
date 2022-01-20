import React from 'react'

import { Grid } from '../../../components'
import CurrentEvent from './CurrentEvent'
import NextEvent from './NextEvent'
import QuickActions from './QuickActions'

type FooterProps = {
  currentRoomId: string
}

const Footer: React.FC<FooterProps> = ({ currentRoomId }) => {
  return (
    <Grid direction="row" justify="space-between" alignItems="flex-end">
      <CurrentEvent currentRoomId={currentRoomId} />
      <QuickActions currentRoomId={currentRoomId} />
      <NextEvent currentRoomId={currentRoomId} />
    </Grid>
  )
}

export default Footer
