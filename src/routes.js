import React from 'react'
import {Switch, Route} from 'react-router-dom'

// Components
import Homepage from './Components/Homepage/Homepage'
import Auth from './Components/Auth/Auth'
import Dashboard from './Components/Dashboard/Dashboard'
import Balance from './Components/Balance/Balance'
import Expenses from './Components/Expenses/Expenses'
import Income from './Components/Income/Income'
import Summary from './Components/Summary/Summary'

export default (
  <Switch>
    <Route exact path='/' component={Homepage} />
    <Route path='/auth' component={Auth} />
    <Route exact path='/user/:id' component={Dashboard} />
    <Route path='/user/:id/balance' component={Balance} />
    <Route path='/user/:id/expenses' component={Expenses} />
    <Route path='/user/:id/income' component={Income} />
    <Route path='/user/:id/summary' component={Summary} />
  </Switch>
)
