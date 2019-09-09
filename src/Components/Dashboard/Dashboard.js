import React, {useContext, useState, useEffect} from 'react'
import './Dashboard.scss'
import {Link} from 'react-router-dom'

// Context
import {AuthContext} from '../../Context/AuthContext'
import {ProfileContext} from '../../Context/ProfileContext'

// Packages
import CountUp from 'react-countup'
import axios from 'axios'

// Components
import {Container, Row, Col} from 'react-bootstrap'
import Menu from '../Menu/Menu'
import NoAccess from '../NoAccess/NoAccess'
import UserCalendar from '../UserCalendar/UserCalendar'

// Images
import Current from './assets/current.svg'
import Expenses from './assets/expenses.svg'
import Income from './assets/income.svg'
import User from './assets/user.svg'

const Dashboard = () => {

  const {user} = useContext(AuthContext)
  const {balance} = useContext(ProfileContext)
  const [date, setDate] = useState(new Date())
  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)

  useEffect(() => {
    axios.get(`/api/dashboard?date=${date}`)
    .then(res => {
      setIncome(res.data.getIncome)
      setExpense(res.data.getExpense)
    })
    .catch(err => console.log(err))
  }, [date])

  const displayDashboard = user ? 
    <div className="Dashboard">
      <Menu />
      <section className="DashboardMain">
        <Container>
          <Row className="DashboardDetails">
            <Col xs={12}>
              <h1>Dashboard</h1>
              <h2>Welcome back, {user.name && user.name}</h2>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={6} lg={4}>
              <section id="Balance" className="DashboardModule">
                <h2>$<CountUp
                  start={0}
                  end={balance}
                  delay={0}
                  decimals={0}
                  duration={1}
                >
                </CountUp></h2>
                <h3><span>Current</span> Balance</h3>
                <img src={Current} />
                <section id="BalanceDarken" className="ModuleFooter">
                  <Link to={`/user/${user.id}/balance`}><h4>Update</h4></Link>
                </section>
              </section>
            </Col>
            <Col xs={12} sm={12} md={6} lg={4}>
              <section id="Income" className="DashboardModule">
                <h2>$<CountUp
                  start={0}
                  end={income ? parseInt(income[0].sum) : 0}
                  delay={0}
                  decimals={0}
                  duration={1}
                >
                </CountUp></h2>
                <h3><span>Monthly</span> Income</h3>
                <img src={Income} />
                <section id="IncomeDarken" className="ModuleFooter">
                  <Link to={`/user/${user.id}/income`}><h4>Update</h4></Link>
                </section>
              </section>
            </Col>
            <Col xs={12} sm={12} md={6} lg={4}>
              <section id="Expenses" className="DashboardModule">
              <h2>$<CountUp
                  start={0}
                  end={expense ? parseInt(expense[0].sum) : 0}
                  delay={0}
                  decimals={0}
                  duration={1}
                >
                </CountUp></h2>
                <h3><span>Monthly</span> Expenses</h3>
                <img src={Expenses} />
                <section id="ExpensesDarken" className="ModuleFooter">
                  <Link to={`/user/${user.id}/expenses`}><h4>Update</h4></Link>
                </section>
              </section>
            </Col>
            <Col xs={12} sm={12} md={6} lg={4}>
              <UserCalendar 
                date={date}
                setDate={setDate}
              />
            </Col>
            <Col xs={12} sm={12} md={12} lg={8}>
              <section id="SpendingGraph" className="DashboardModule">
                <img src={User} />
                <h2 id="SpendingHeader">$<CountUp
                  start={1}
                  end={37}
                  delay={0}
                  decimals={0}
                  duration={1}
                >
                </CountUp>%</h2>
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
      {displayDashboard}
    </React.Fragment>
  )
}

export default Dashboard