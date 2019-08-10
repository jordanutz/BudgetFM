import React, {useContext} from 'react'
import './Income.scss'

// Components
import Menu from '../Menu/Menu'
import NoAccess from '../NoAccess/NoAccess'
import {Container, Row, Col} from 'react-bootstrap'
import UserCalendar from '../UserCalendar/UserCalendar'

// Context
import {AuthContext} from '../../Context/AuthContext'

const Income = () => {

  const {user} = useContext(AuthContext)

  const displayIncome = user ? 
    <div className="Income">
      <Menu />
      <section className="IncomeMain">
        <Container>
          <Row className="IncomeDetails">
            <Col xs={12} sm={12} md={8} lg={8} style={{padding: '0'}}>
              <section className="IncomeHeader">
                <h1>Income</h1>
                <button>Add New Income</button>    
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
              <section className="BalanceCard"></section>
              <section className="BalanceCard"></section>
        
              <UserCalendar />
            </Col>
          </Row>
        </Container>  
      </section>
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