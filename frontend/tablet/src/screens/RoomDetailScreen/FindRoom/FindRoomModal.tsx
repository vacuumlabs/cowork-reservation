import Modal from 'react-native-modal'
import React, { useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'

import { Button, Grid, theme, Typography } from '../../../components'
import { dummyRoomList } from '../../RoomListScreen'
import RoomAvailabilityList from './RoomAvailabilityList'

const { height } = Dimensions.get('window')

const FindRoomModal: React.FC = () => {
  // TODO replace with fetched data
  const rooms = dummyRoomList
  const [isVisible, setIsVisible] = useState(false)

  const onOpen = () => {
    setIsVisible(true)
  }

  const onDismiss = () => {
    setIsVisible(false)
  }

  return (
    <View>
      <Button title="Find Room" onPress={onOpen} />

      <Modal
        onBackdropPress={onDismiss}
        isVisible={isVisible}
        style={styles.modal}
      >
        <Grid style={styles.content} stretch>
          <Grid
            direction="row"
            justify="space-between"
            alignItems="flex-end"
            style={styles.header}
          >
            <Typography variant="h3">Find room</Typography>
            <Button title="Close" variant="secondary" onPress={onDismiss} />
          </Grid>

          <RoomAvailabilityList rooms={rooms} />
        </Grid>
      </Modal>
    </View>
  )
}

export default FindRoomModal

const styles = StyleSheet.create({
  modal: {
    alignSelf: 'flex-end',
    marginRight: 0,
  },
  content: {
    width: 700,
    height: height,
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.backgroundDarker,
  },
  header: {
    borderBottomColor: theme.colors.backgroundLight,
    borderBottomWidth: 1,
    paddingBottom: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
})
