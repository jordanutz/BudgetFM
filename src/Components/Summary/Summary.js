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
  const [income, setIncome] = useState(null)
  const [expense, setExpense] = useState(null)
  const [totalIncome, setTotalIncome] = useState(null)
  const [totalExpense, setTotalExpense] = useState(null)

  useEffect(() => {
    axios.get(`/api/summary?date=${date}`)
    .then(res => {
      console.log(res.data)
    })
    .catch(err => console.log(err))
  }, [date])


  // const incomeSummary  = {
  //   labels: [
  //     'Gift', 
  //     'Investment', 
  //     'Other', 
  //     'Rewards', 
  //     'Salary'
  //   ], 
  //   datasets: [{
  //     data: [income[0].sum, income[1].sum, income[2].sum, income[3].sum, income[4].sum]
  //   }]
  // }

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
              </section>
            </Col>
            <Col xs={12} sm={12} md={12} lg={6}>
              <section className="SummaryModule"> 
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