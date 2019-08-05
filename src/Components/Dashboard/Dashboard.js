import React, {useContext} from 'react'
import './Dashboard.scss'
import {AuthContext} from '../../Context/AuthContext'

import {Container, Row, Col} from 'react-bootstrap'

const Dashboard = () => {

  const {user} = useContext(AuthContext)
  console.log(user)

  return (
    <div className="Dashboard">
      <section className="DashboardMenu"></section>
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
              <section id="Balance" className="DashboardModule"></section>
            </Col>
            <Col xs={12} sm={12} md={6} lg={4}>
              <section id="Income" className="DashboardModule"></section>
            </Col>
            <Col xs={12} sm={12} md={6} lg={4}>
              <section id="Expenses" className="DashboardModule"></section>
            </Col>
            <Col xs={12} sm={12} md={6} lg={8}>
              <section id="SpendingGraph" className="DashboardModule"></section>
            </Col>
            <Col xs={12} sm={12} md={12} lg={4}>
              <section id="Goals" className="DashboardModule"></section>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default Dashboard