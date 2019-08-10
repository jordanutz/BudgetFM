import React, {useContext} from 'react'
import './Expenses.scss'

// Components
import Menu from '../Menu/Menu'
import NoAccess from '../NoAccess/NoAccess'

// Context
import {AuthContext} from '../../Context/AuthContext'

const Expenses = () => {

  const {user} = useContext(AuthContext)

  const displayExpenses = user ? 
    <div className="Expenses">
      <Menu />
      <section className="ExpensesMain">
        <h1>Expenses</h1>
      </section>
    </div>

    : 

    <NoAccess />

  return (
    <React.Fragment>
      {displayExpenses}
    </React.Fragment>
  )
}

export default Expenses