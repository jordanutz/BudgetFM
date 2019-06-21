import React from 'react'
import './Header.scss'
import {Link, withRouter} from 'react-router-dom'

// Images
import Microphone from './assets/microphone.svg'

const Header = (props) => {

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
            <Link to='/auth'><button>Log In</button></Link>
          }
        </ul>
      </nav>
    </header>
  )
}

export default withRouter(Header)
