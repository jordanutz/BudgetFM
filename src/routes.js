import React from 'react'
import {Switch, Route} from 'react-router-dom'

// Components
import Homepage from './Components/Homepage/Homepage'
import Auth from './Components/Auth/Auth'

export default (
  <Switch>
    <Route exact path='/' component={Homepage} />
    <Route path='/auth' component={Auth} />
  </Switch>
)
