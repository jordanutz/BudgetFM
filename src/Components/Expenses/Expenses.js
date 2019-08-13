import React, {useContext, useState} from 'react'
import './Expenses.scss'
import CountUp from 'react-countup'

// Components
import Menu from '../Menu/Menu'
import NoAccess from '../NoAccess/NoAccess'
import {Container, Row, Col} from 'react-bootstrap'
import UserCalendar from '../UserCalendar/UserCalendar'
import {withRouter} from 'react-router-dom'
import AddExpense from '../AddExpense/AddExpense'

// Context
import {AuthContext} from '../../Context/AuthContext'

const Expenses = (props) => {

  const {user} = useContext(AuthContext)

  const [toggle, setToggle] = useState(false)

  const toggleAdd = () => {
    setToggle(!toggle)
  }

  const displayToggle = toggle &&
  <div className="ToggleOverlay">
    <div className="AddExpenseModule">
      <h2>Add Expense</h2>
    </div>
  </div>

  const displayExpenses = user ? 
    <div className="Expenses">
      <Menu />
      <section className="ExpensesMain">
        <Container>
          <Row className="ExpensesDetails">
            <Col xs={12} sm={12} md={8} lg={8} style={{padding: '0'}}>
              <section className="ExpensesHeader">
                <h1>Expenses</h1>
                <button onClick={toggleAdd}>Add New Expense</button>    
              </section>
              <Row className="ExpensesList">
                <Col xs={12} sm={12} md={12} lg={12} style={{padding: '0'}}>
                  <section className="ExpensesSearch">
                    <input placeholder="Search" type="text" />
                    <h2>Pagination Here</h2>
                  </section>
                </Col>
                <Row className="HeadingRow">
                  <Col xs={12} sm={12} md={3} lg={3}>
                      <h2>Date</h2>
                    </Col>
                    <Col xs={12} sm={12} md={3} lg={3}>
                      <h2>Description</h2>
                    </Col>
                    <Col xs={12} sm={12} md={3} lg={3}>
                      <h2>Category</h2>
                    </Col>
                    <Col xs={12} sm={12} md={3} lg={3}>
                      <h2>Amount</h2>
                    </Col>
                  </Row>
                </Row>
            </Col>
            <Col xs={12} sm={12} md={4} lg={4}>
              <section className="ExpenseCard">
                  <h3>$<span><CountUp
                      start={0}
                      end={169}
                      delay={0}
                      decimals={0}
                      duration={1.75}
                    >
                    </CountUp></span></h3>
                </section>
              <section className="ExpenseCard"></section>  
              <UserCalendar />
            </Col>
          </Row>
        </Container>  
      </section>
      {displayToggle}
    </div>

    : 

    <NoAccess />

  return (
    <React.Fragment>
      {displayExpenses}
    </React.Fragment>
  )
}

export default withRouter(Expenses)