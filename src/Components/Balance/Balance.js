import React, {useContext} from 'react'
import './Balance.scss'

// Components
import Menu from '../Menu/Menu'
import NoAccess from '../NoAccess/NoAccess'
import {Container, Row, Col} from 'react-bootstrap'
import CountUp from 'react-countup'
import {AuthContext} from '../../Context/AuthContext'
import {ProfileContext} from '../../Context/ProfileContext'

const Balance = (props) => {

  const {user} = useContext(AuthContext)
  const {balance} = useContext(ProfileContext)

  const displayBalance = user ? 
    <div className="Balance">
      <Menu />
      <section className="BalanceMain">
        <Container>
          <Row style={{display: 'flex', alignItems: 'stretch'}}>
            <Col sm={12} md={6} lg={6}>
              <section className="BalanceUpdate UpdateMobile" >
                <h1>Current Balance</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ornare arcu nec laoreet aliquam. Phasellus placerat purus nec consequat dapibus. Suspendisse bibendum tempor lacus a elementum. Proin vel dictum ante. Pellentesque ex ipsum, scelerisque ut eros sit amet, aliquet feugiat lectus. </p>
              </section>
            </Col>
            <Col sm={12} md={6} lg={6} className="BalanceMobile">
              <section className="BalanceCurrent">
                <h3>$<span><CountUp
                  start={0}
                  end={balance}
                  delay={0}
                  decimals={2}
                  duration={1}
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