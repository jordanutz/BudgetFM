import React, {useEffect, useContext} from 'react'
import './Header.scss'
import {Link, withRouter} from 'react-router-dom'
import axios from 'axios'
import {AuthContext} from '../../Context/AuthContext'

// Images
import Microphone from './assets/microphone.svg'

const Header = (props) => {

  const {user, setUser} = useContext(AuthContext)

  useEffect(() => {
    axios.get('/api/user')
    .then(res => {
      console.log('hit login header')
      setUser(res.data[0])
    })
    .catch(err => console.log(err))
  }, [setUser])

  const userLogout = () => {
    axios.get('/api/logout')
    .then(res => setUser(null))
    .catch(err => console.log(err))
  }

  return (
    <header className={props.location.pathname === '/auth' ? 'LoginStyling' : null }>
      <Link to='/' style={{color: 'white', textDecoration: 'none'}}><div className="Logo">
        <img src={Microphone} alt="Main" />
        <h1>BudgetFM</h1>
      </div></Link>
      <nav>
        <ul>
          {
            props.location.pathname === '/auth' ?  
            null : 
            <div className="HeaderMenu">
              {user && user.id  ? 
                <Link to='/'><button onClick={userLogout}>Sign Out</button></Link> : 
                <section className="HeaderLinks">
                  <Link to={{ pathname: '/auth', state: {signIn: true} }}>Sign In</Link> 
                  <Link to={{ pathname: '/auth', state: {signIn: false} }}><button>Get Started</button></Link>
                </section>
              } 
            </div>
          }
        </ul>
      </nav>
    </header>
  )
}

export default withRouter(Header)
