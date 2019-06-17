import React from 'react'
import {Switch, Route} from 'react-router-dom'

// Components
import Homepage from './Components/Homepage/Homepage'
import Login from './Components/Login/Login'

export default (
  <Switch>
    <Route exact path='/' component={Homepage} />
    <Route path='/login' component={Login} />
  </Switch>
)
