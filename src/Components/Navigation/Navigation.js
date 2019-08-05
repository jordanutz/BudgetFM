import React, {useContext, useEffect, useState} from 'react'
import './Navigation.scss'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Header from '../Header/Header'

// Images
import Microphone from '../Header/assets/microphone.svg'

// Context
import {AuthContext} from '../../Context/AuthContext'

const Navigation = () => {

  const {user, setUser} = useContext(AuthContext)
  const [dropdown, setDropdown] = useState(false)

  useEffect(() => {
    axios.get('/api/user')
    .then(res => setUser(res.data))
    .catch(err => console.log(err))
  }, [])

  const toggleDropdown = () => {
    console.log('hit')
    setDropdown(!dropdown);
  }

  const userLogout = () => {
    axios.get('/api/logout')
    .then(res => setUser(null))
    .catch(err => console.log(err))
  }

  const displayToggle = dropdown && 
    <div className="DashboardDrop">
      <Link to='/'><button onClick={userLogout}>Sign Out</button></Link>
    </div>

  const displayPortal = user ?
    <nav className="Navigation">
        <section className="NavigationMenu">
          <i className="fas fa-bars"></i>
        </section>
        <section className="NavigationLinks">
          <Link to='/'><img src={Microphone} /></Link>
          <section className="NavigationUser">
            <h2>{user && user.name}</h2>
            <button onClick={toggleDropdown}><i className="fas fa-chevron-down"></i></button>
            {displayToggle}
          </section>
        </section>

      </nav>
     : 
     <Header />
    

  return (
    <div>
      {displayPortal}
    </div>
  )
}


export default Navigation
