import React from 'react'
import './Header.scss'
import {Link} from 'react-router-dom'

// Images
import Microphone from './assets/microphone.svg'

const Header = (props) => {
  return (
    <header>
      <Link to='/' style={{color: 'white', textDecoration: 'none'}}><div className="Logo">
        <img src={Microphone} alt="Main" />
        <h1>BudgetFM</h1>
      </div></Link>
      <nav>
        <ul>
          <Link to='/login'><button>Log In</button></Link>
        </ul>
      </nav>
    </header>
  )
}

export default Header
