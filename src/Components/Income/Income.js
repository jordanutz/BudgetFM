import React, {useContext, useState, useEffect} from 'react'
import './Income.scss'
import CountUp from 'react-countup'
import axios from 'axios'

// Components
import Menu from '../Menu/Menu'
import NoAccess from '../NoAccess/NoAccess'
import {Container, Row, Col} from 'react-bootstrap'
import UserCalendar from '../UserCalendar/UserCalendar'
import AddIncome from '../AddIncome/AddIncome'

// Context
import {AuthContext} from '../../Context/AuthContext'
import {ProfileContext} from '../../Context/ProfileContext'

const Income = () => {

  const {user} = useContext(AuthContext)
  const [toggle, setToggle] = useState(false)
  const [date, setDate] = useState(new Date())

  const toggleAdd = () => {
    setToggle(!toggle)
  }

  useEffect( () => {
    axios.get('/api/income')
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
  })

  const displayToggle = toggle &&
    <div className="ToggleOverlay">
      <AddIncome setToggle={setToggle}/>
    </div>

  const displayIncome = user ? 
    <div className="Income">
      <Menu />
      <section className="IncomeMain">
        <Container>
          <Row className="IncomeDetails">
            <Col xs={12} sm={12} md={8} lg={8} style={{padding: '0'}}>
              <section className="IncomeHeader">
                <h1>Income</h1>
                <button onClick={toggleAdd}>Add New Income</button>    
              </section>
              <Row className="IncomeList">
                <Col xs={12} sm={12} md={12} lg={12} style={{padding: '0'}}>
                  <section className="IncomeSearch">
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
              <section className="IncomeCard">
                <h3>$<span><CountUp
                    start={0}
                    end={136}
                    delay={0}
                    decimals={0}
                    duration={1}
                  >
                  </CountUp></span></h3>
              </section>
              <section className="IncomeCard"></section>
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
      {displayIncome}
    </React.Fragment>
  )
}

export default Income