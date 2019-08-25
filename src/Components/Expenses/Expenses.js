import React, {useContext, useState, useEffect} from 'react'
import './Expenses.scss'
import CountUp from 'react-countup'
import axios from 'axios'

// Components
import Menu from '../Menu/Menu'
import NoAccess from '../NoAccess/NoAccess'
import {Container, Row, Col} from 'react-bootstrap'
import UserCalendar from '../UserCalendar/UserCalendar'
import AddExpense from '../AddExpense/AddExpense'

// Context
import {AuthContext} from '../../Context/AuthContext'
import {ProfileContext} from '../../Context/ProfileContext'

const Expenses = () => {

  const {user} = useContext(AuthContext)
  const {setBalance} = useContext(ProfileContext)
  const [toggle, setToggle] = useState(false)
  const [date, setDate] = useState(new Date())
  const [expenses, setExpenses] = useState(null)
  const [sum, setSum] = useState(0)

  useEffect( () => {
    axios.get(`/api/expense?date=${date}`)
    .then(res => { 
      setExpenses(res.data.getExpense)
      setSum(res.data.sumExpense)
    })
    .catch(err => console.log(err))
  }, [date])

  const toggleAdd = () => {
    setToggle(!toggle)
  }

  const colorSelection = {
    payments: '#F14135', 
    food: '#E118A7', 
    home: '#5218E1', 
    clothing: '#18E12D', 
    education: '#1843E1', 
    recreation: '#18C6E1', 
    transportation: '#B318E1', 
    other: '#FFE826'
  }

  const submitExpense = (e, description, category, amount, date) => {
    e.preventDefault()
  
    let expense = {
      description, 
      category, 
      amount, 
      date
    }
  
    axios.post('/api/expense', {expense})
    .then(res => {
      setToggle(false)
      setExpenses(res.data.getExpense)
      setSum(res.data.sumExpense)
      setBalance(res.data.updatedBalance)
    })
    .catch(err => console.log(err))
  }
  
  const displayToggle = toggle &&
    <div className="ToggleOverlay">
      <AddExpense colorSelection={colorSelection} submitExpense={submitExpense} setToggle={setToggle} />
    </div>

  const expensesLog = expenses && expenses.map(single => {
    return (
      <Row className="HeadingRow ExpenseLog" key={single.expenses}>
        <Col xs={12} sm={12} md={3} lg={3}>
          <h2>{single.date_posted}</h2>
        </Col>
        <Col xs={12} sm={12} md={3} lg={3}>
          <h2>{single.description}</h2>
        </Col>
        <Col xs={12} sm={12} md={3} lg={3} className="ExpenseCategory">
            <i className={single.icon} style={{backgroundColor: colorSelection[single.type.toLowerCase()]}}></i>
            <h2>{single.type}</h2>
        </Col>
        <Col xs={12} sm={12} md={3} lg={3}>
          <h2>{single.amount}</h2>
        </Col>
      </Row>
    )
  })

  const displayExpenses = user ? 
    <div className="Expense">
      <Menu />
      <section className="ExpenseMain">
        <Container>
          <Row className="ExpenseDetails">
            <Col xs={12} sm={12} md={8} lg={8} style={{padding: '0'}}>
              <section className="ExpenseHeader">
                <h1>Expenses</h1>
                <button onClick={toggleAdd}>Add New Expense</button>    
              </section>
              <Row className="ExpenseList">
                <Col xs={12} sm={12} md={12} lg={12} style={{padding: '0'}}>
                  <section className="ExpenseSearch">
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
                {expensesLog}
              </Row>
          </Col>
          <Col xs={12} sm={12} md={4} lg={4}>
            <section className="ExpenseCard">
              <h3>$<span><CountUp
                  start={0}
                  end={sum ? sum[0].sum : 0}
                  delay={0}
                  decimals={0}
                  duration={1}
                >
                </CountUp></span></h3>
            </section>
            <section className="ExpenseCard"></section>
            <UserCalendar 
              date={date}
              setDate={setDate}
            />
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

export default Expenses