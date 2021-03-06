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

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    axios.get('/api/user')
    .then(res => {
      setUser(res.data[0])
    })
    .catch(err => console.log(err))
  }, [setUser])

  const userLogout = () => {
    axios.get('/api/logout')
    .then(res => setUser(null))
    .catch(err => console.log(err))
  }


  const displayPortal = user ?
    <nav className="Navigation">
        <section className="NavigationMenu"></section>
        <section className="NavigationLinks">
          <section className="NavigationLogo">
            <Link to='/'><img src={Microphone} />
            <h1>BudgetFM</h1>
            </Link>
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
