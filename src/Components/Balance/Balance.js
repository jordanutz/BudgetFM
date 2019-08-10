import React, {useContext} from 'react'
import './Balance.scss'

// Components
import Menu from '../Menu/Menu'
import NoAccess from '../NoAccess/NoAccess'
import {Container, Row, Col} from 'react-bootstrap'

// Context
import {AuthContext} from '../../Context/AuthContext'

const Balance = () => {

  const {user} = useContext(AuthContext)

  const displayBalance = user ? 
    <div className="Balance">
      <Menu />
      <section className="BalanceMain">
        <Container fluid>
          <Row className="BalanceDetails">
            <Col xs={12}>
              <h1>Balance</h1>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={6} lg={6}>
              <h2>List</h2>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <h2>Navigation</h2>
            </Col>
          </Row>
        </Container>  
      </section>
    </div>

    : 

    <NoAccess />

  return (
    <React.Fragment>
      {displayBalance}
    </React.Fragment>
  )
}

export default Balance