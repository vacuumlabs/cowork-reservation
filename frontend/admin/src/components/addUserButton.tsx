import React from 'react'
import { Button } from 'react-admin'
import { Link } from 'react-router-dom'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import Add from '@material-ui/icons/Add'

import { User } from '../models'

const AddUserButton = ({ record }: { record?: User }) => {
  console.log(record)
  return (
    <Button component={Link} label="Add admin" to={'../../users/create'}>
      <Add />
    </Button>
  )
}

export default AddUserButton
