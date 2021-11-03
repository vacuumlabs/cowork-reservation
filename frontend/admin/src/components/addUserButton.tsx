import React from 'react'
import { Button } from 'react-admin'
import { Link } from 'react-router-dom'
import Add from '@material-ui/icons/Add'

const AddUserButton = (): JSX.Element => (
  <Button component={Link} label="Add admin" to={'../../users/create'}>
    <Add />
  </Button>
)

export default AddUserButton
