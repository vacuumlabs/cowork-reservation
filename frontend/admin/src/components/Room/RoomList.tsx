import React from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  makeStyles,
} from '@material-ui/core'
import { List, ListProps, useListContext } from 'react-admin'

import { Room } from '../../models'

const useStyles = makeStyles({
  root: {
    marginTop: '1em',
    display: 'flex',
    justifyContent: 'space-around',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const RoomGrid = () => {
  const classes = useStyles()
  const { data, ids } = useListContext<Room>()
  return ids ? (
    <Grid container spacing={2} className={classes.root}>
      {ids.map((id) => (
        <Grid key={id}>
          <Card>
            <CardContent className={classes.title}>
              <Typography variant="h5" component="h2" align="center">
                {data[id].roomNumber}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  ) : null
}

const RoomList: (props: ListProps) => JSX.Element = (props) => (
  <List {...props}>
    <RoomGrid />
  </List>
)

export default RoomList
