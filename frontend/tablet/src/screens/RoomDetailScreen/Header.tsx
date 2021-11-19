import React from 'react'
import { View } from 'react-native'

import { Typography, Button } from '../../components'

const Header: React.FC = () => {
  return (
    <>
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
    </>
  )
}

export default Header
