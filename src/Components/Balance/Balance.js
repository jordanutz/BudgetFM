import React, {useContext} from 'react'
import './Balance.scss'

// Components
import Menu from '../Menu/Menu'
import NoAccess from '../NoAccess/NoAccess'
import {Container, Row, Col} from 'react-bootstrap'
import CountUp from 'react-countup'

// Context
import {AuthContext} from '../../Context/AuthContext'

const Balance = () => {

  const {user} = useContext(AuthContext)

  const displayBalance = user ? 
    <div className="Balance">
      <Menu />
      <section className="BalanceMain">
        <Container>
          <Row style={{display: 'flex', alignItems: 'stretch'}}>
            <Col xs={12} sm={12} md={6} lg={6}>
              <section className="BalanceUpdate">
                <h1>Current Balance</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ornare arcu nec laoreet aliquam. Phasellus placerat purus nec consequat dapibus. Suspendisse bibendum tempor lacus a elementum. Proin vel dictum ante. Pellentesque ex ipsum, scelerisque ut eros sit amet, aliquet feugiat lectus. </p>
                <span>$<input type="text" value={user.balance} /></span>
                <button>Update Balance</button>
              </section>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <section className="BalanceCurrent">
                <h3>$<span><CountUp
                  start={0}
                  end={user.balance}
                  delay={0}
                  decimals={0}
                  duration={1.75}
                >
                </CountUp></span></h3>
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
      {displayBalance}
    </React.Fragment>
  )
}

export default Balance