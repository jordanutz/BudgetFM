import React, {useContext, useState, useEffect} from 'react'
import './Summary.scss'

// Components
import Menu from '../Menu/Menu'
import NoAccess from '../NoAccess/NoAccess'
import {Container, Row, Col} from 'react-bootstrap'
import UserCalendar from '../UserCalendar/UserCalendar'
import axios from 'axios'
import { Doughnut } from 'react-chartjs-2';


// Context
import {AuthContext} from '../../Context/AuthContext'

const Summary = () => {

  const {user} = useContext(AuthContext)
  const [date, setDate] = useState(new Date())
  const [income, setIncome] = useState([null])
  const [expense, setExpense] = useState(null)

  useEffect(() => {
    axios.get(`/api/summary?date=${date}`)
    .then(res => {
      setIncome(res.data.income)
      setExpense(res.data.expense)
    })
    .catch(err => console.log(err))
  }, [date])


  const incomeSummary  = {
    labels: [
      'Gift', 
      'Investment', 
      'Other', 
      'Rewards', 
      'Salary'
    ], 
    datasets: [{
      data: [income && income.gift, income && income.investment, income && income.otherIncome, income && income.reward, income && income.salary],
      backgroundColor: ['#F14135', '#5218E1', '#FFE826', '#18E12D', '#18C6E1']
    }]
  }

  const expenseSummary = {
    labels: [
      'Clothing', 
      'Education', 
      'Food', 
      'Home', 
      'Other', 
      'Payments', 
      'Recreation', 
      'Transportation'
    ], 
    datasets: [{
      data: [
        expense && expense.clothing, 
        expense && expense.education, 
        expense && expense.food, 
        expense && expense.home, 
        expense && expense.otherExpense, 
        expense && expense.payment, 
        expense && expense.recreation, 
        expense && expense.transportation 
      ], 
      backgroundColor: [ '#18E12D', '#1843E1', '#E118A7', '#5218E1', '#FFE826', '#F14135', '#18C6E1', '#B318E1']
    }]
  }

  console.log(income && income)

  const displaySummary = user ? 
    <div className="Summary">
      <Menu />
      <section className="SummaryMain">
        <Container>
          <Row className="SummaryDetails">
            <Col xs={12} sm={12} md={8} lg={8}>
              <h1>Summary</h1>
            </Col>
            <Col xs={12} sm={12} md={4} lg={4}>
              <UserCalendar 
                date={date}
                setDate={setDate}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <section className="SummaryPrevious">
              </section>     
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={12} lg={6}>
              <section className="SummaryModule"> 

              <Doughnut data={incomeSummary}
                width={100}
                height={100}
                options={{
		                maintainAspectRatio: true
	              }}/>


              </section>
            </Col>
            <Col xs={12} sm={12} md={12} lg={6}>
              <section className="SummaryModule"> 

              <Doughnut data={expenseSummary}
                width={100}
                height={100}
                options={{
		                maintainAspectRatio: true
	              }}/>

              </section>
            </Col>   
          </Row>
        </Container>
      </section>
    </div>

    : 

    <NoAccess />

  return (
    <React.Fragment>
      {displaySummary}
    </React.Fragment>
  )
}

export default Summary