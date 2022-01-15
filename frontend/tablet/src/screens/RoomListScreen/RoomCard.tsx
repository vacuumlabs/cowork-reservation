import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Room } from 'shared/models'

import { Grid, Icon, theme, Typography } from '../../components'

type RoomCardProps = Room & {
  onPress: () => void
}

const RoomCard: React.FC<RoomCardProps> = ({
  name,
  city,
  building,
  capacity,
  floor,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Grid spacing={1} stretch>
        <Grid direction="row" justify="space-between" alignItems="center">
          <Typography variant="h4" color="black">
            {name}
          </Typography>
          <Grid direction="row" alignItems="center">
            <Typography color="black">{capacity} </Typography>
            <Icon name="userFriends" />
          </Grid>
        </Grid>
        <Grid>
          <Typography color="black">{city.name}</Typography>
          <Typography color="black">{building.name}</Typography>
          <Typography color="black">Floor {floor}</Typography>
        </Grid>
      </Grid>
    </TouchableOpacity>
  )
}

export default RoomCard

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.backgroundLight,
    borderRadius: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    width: 300,
  },
})
