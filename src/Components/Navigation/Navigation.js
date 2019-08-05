import React, {useContext, useEffect} from 'react'
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

  useEffect(() => {
    axios.get('/api/user')
    .then(res => setUser(res.data))
    .catch(err => console.log(err))
  }, [])

  const displayPortal = user ?
    <nav className="Navigation">
        <section className="NavigationMenu">
          <i className="fas fa-bars"></i>
        </section>
        <section className="NavigationLinks">
          <Link to='/'><img src={Microphone} /></Link>
          <section className="NavigationUser">
            <h2>{user && user.name}</h2>
            <i className="fas fa-chevron-down"></i>
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
