import Modal from 'react-native-modal'
import React, { useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'

import { Button, Grid, theme, Typography } from '../../components'
import { dummyRoomList } from '../RoomListScreen'

const { height } = Dimensions.get('window')

type FindRoomModalProps = {
  roomId: string
}

const FindRoomModal: React.FC<FindRoomModalProps> = ({ roomId }) => {
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
        onSwipeComplete={onDismiss}
        swipeDirection="right"
        animationIn="fadeInRight"
        animationOut="fadeOutRight"
        style={styles.modal}
      >
        <Grid style={styles.content} stretch>
          <Grid direction="row" justify="flex-end">
            <Button title="Close" variant="secondary" onPress={onDismiss} />
          </Grid>
          <Grid>
            {rooms.map((room) => (
              <Typography
                key={room.id}
                color={room.id === roomId ? 'turquoise' : 'white'}
              >
                {room.name}
              </Typography>
            ))}
          </Grid>
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
})
