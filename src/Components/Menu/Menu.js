import React, {useContext} from 'react'
import './Menu.scss'
import axios from 'axios'
import {withRouter, Link} from 'react-router-dom'

// Context
import {AuthContext} from '../../Context/AuthContext'

const Menu = (props) => {

  const {user, setUser} = useContext(AuthContext)

  const userLogout = () => {
    axios.get('/api/logout')
    .then(res => {
      setUser(null)
      directHomepage()
    }) 
    .catch(err => console.log(err))
  }

  const directHomepage = () => {
    props.history.push('/')
  }

  return (
    <section className="DashboardMenu">
      <Link to={`/dashboard/${user.id}`}><i className="fas fa-home"></i></Link>
      <i className="fas fa-play-circle"></i>
      <i className="fas fa-signal"></i>
      <i className="fas fa-pause-circle"></i>
      <i className="fas fa-user"></i>
      <button onClick={userLogout}><i className="fas fa-power-off"></i></button>
    </section>
  )
}

export default withRouter(Menu)