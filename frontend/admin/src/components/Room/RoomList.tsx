import React from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  makeStyles,
  CardActions,
} from '@material-ui/core'
import {
  EditButton,
  List,
  ListProps,
  TextInput,
  useListContext,
} from 'react-admin'

import { Room } from '../../models'

const useStyles = makeStyles({
  root: {
    marginTop: '3em',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: 'auto',
    width: 200,
    margin: '2em',
  },
  actionSpacer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
})

const RoomFilters = [
  <TextInput key={0} label="Search city" source="q" alwaysOn />,
]

const RoomGrid = () => {
  const classes = useStyles()
  const { data, ids } = useListContext<Room>()
  return ids ? (
    <Grid container className={classes.root}>
      {ids.map((id) => (
        <Grid container item key={id} xs={6} md={2} spacing={3}>
          <Card className={classes.card}>
            <CardContent className={classes.title}>
              <Typography variant="h5" component="h2" align="center">
                {data[id].name}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography variant="subtitle1" component="h2" align="center">
                <p>Floor {data[id].floor} </p>
              </Typography>
              <Typography variant="subtitle1" component="h2" align="center">
                <p> Capacity: {data[id].capacity} </p>
              </Typography>
              <Typography variant="subtitle1" component="h2" align="center">
                {data[id].equipment}
              </Typography>
            </CardContent>
            <CardActions className={classes.actionSpacer}>
              <EditButton record={data[id]} />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  ) : null
}

const RoomList: (props: ListProps) => JSX.Element = (props) => (
  <List {...props} filters={RoomFilters}>
    <RoomGrid />
  </List>
)

export default RoomList
