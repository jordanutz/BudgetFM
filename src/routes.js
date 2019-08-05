import React from 'react'
import {Switch, Route} from 'react-router-dom'

// Components
import Homepage from './Components/Homepage/Homepage'
import Auth from './Components/Auth/Auth'
import Dashboard from './Components/Dashboard/Dashboard'

export default (
  <Switch>
    <Route exact path='/' component={Homepage} />
    <Route path='/auth' component={Auth} />
    <Route path='/dashboard' component={Dashboard} />
  </Switch>
)
