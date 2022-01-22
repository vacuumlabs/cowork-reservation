import * as React from 'react'
import { Route } from 'react-router-dom'

import AddCalendar from './components/Calendar/AddCalendar'

export default [
  <Route key="calendar" exact path="/calendar" component={AddCalendar} />,
]
