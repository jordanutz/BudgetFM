import React, {useContext, useState} from 'react'
import './Balance.scss'

// Components
import Menu from '../Menu/Menu'
import NoAccess from '../NoAccess/NoAccess'
import {Container, Row, Col} from 'react-bootstrap'
import CountUp from 'react-countup'
import axios from 'axios'

// Context
import {AuthContext} from '../../Context/AuthContext'
import {ProfileContext} from '../../Context/ProfileContext'

const Balance = () => {

  const {user, setUser} = useContext(AuthContext)
  const {balance, setBalance} = useContext(ProfileContext)
  const [input, setInput] = useState('')

  const submitBalance = (e, balance) => {
    e.preventDefault()
    let userBalance = {balance: parseInt(input)}
    axios.put('/api/balance', userBalance).then(res => {
      setBalance(res.data.balance)
    })
  }
  
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
                <span>$<input type="text" value={input} placeholder={balance} onChange={(e) => setInput(e.target.value)} /></span>
                <button onClick={(e) => submitBalance(e, balance)}>Update Balance</button>
              </section>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <section className="BalanceCurrent">
                <h3>$<span><CountUp
                  start={0}
                  end={balance}
                  delay={0}
                  decimals={0}
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