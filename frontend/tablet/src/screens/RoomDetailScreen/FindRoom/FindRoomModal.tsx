import Modal from 'react-native-modal'
import React, { useContext, useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'

import { Button, Grid, theme, Typography } from '../../../components'
import RoomAvailabilityList from './RoomAvailabilityList'
import { DataContext } from '../../../contexts/DataContext'

const { height } = Dimensions.get('window')

const FindRoomModal: React.FC = () => {
  const { rooms, isLoading, currentRoomId } = useContext(DataContext)
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
        animationIn="slideInRight"
        animationOut="slideOutRight"
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

          {!rooms || isLoading ? (
            <Typography variant="h2">Loading rooms...</Typography>
          ) : (
            <RoomAvailabilityList rooms={rooms} currentRoomId={currentRoomId} />
          )}
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
