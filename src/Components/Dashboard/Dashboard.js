import React, {useContext} from 'react'
import './Dashboard.scss'
import {AuthContext} from '../../Context/AuthContext'

import {Container, Row, Col} from 'react-bootstrap'

// Images
import Current from './assets/current.svg'
import Expenses from './assets/expenses.svg'
import Income from './assets/income.svg'
import User from './assets/user.svg'
import Calendar from './assets/calendar.svg'

const Dashboard = () => {

  const {user} = useContext(AuthContext)

  const displayDashboard = user ? 
    <div className="Dashboard">
        <section className="DashboardMenu">
          <i class="fas fa-home"></i>
          <i class="fas fa-play-circle"></i>
          <i class="fas fa-signal"></i>
          <i class="fas fa-pause-circle"></i>
          <i class="fas fa-user"></i>
          <i class="fas fa-power-off"></i>
        

        </section>
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
                  <h2>$21</h2>
                  <img src={Current} />
                  <section id="BalanceDarken" className="ModuleFooter">
                    <h3>Details</h3>
                  </section>
                </section>
              </Col>
              <Col xs={12} sm={12} md={6} lg={4}>
                <section id="Income" className="DashboardModule">
                  <h2>$136</h2>
                  <img src={Income} />
                  <section id="IncomeDarken" className="ModuleFooter">
                    <h3>Details</h3>
                  </section>
                </section>
              </Col>
              <Col xs={12} sm={12} md={6} lg={4}>
                <section id="Expenses" className="DashboardModule">
                  <h2>$169</h2>
                  <img src={Expenses} />
                  <section id="ExpensesDarken" className="ModuleFooter">
                    <h3>Details</h3>
                  </section>
                </section>
              </Col>
              <Col xs={12} sm={12} md={6} lg={8}>
                <section id="SpendingGraph" className="DashboardModule">
                  <img src={User} />
                  <h2 id="SpendingHeader">37%</h2>
                  <section id="SpendingDarken" className="ModuleFooter">
                    <h3>Details</h3>
                  </section>
                </section>
              </Col>
              <Col xs={12} sm={12} md={12} lg={4}>
                <section id="Goals" className="DashboardModule">
                  <h2>8/19</h2>
                  <img src={Calendar} />
                  <section id="GoalsDarken" className="ModuleFooter">
                      <h3>View Calendar</h3>
                  </section>
                </section>
              </Col>
            </Row>
          </Container>
        </section>
      </div> 

    : 

    <div className="NoAccess">
      <h3>Please login to access account details.</h3>
    </div>

  return (
    <React.Fragment>
      {displayDashboard}
    </React.Fragment>
  )
}

export default Dashboard