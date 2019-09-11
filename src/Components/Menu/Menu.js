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
      <Link to={`/user/${user.id}`}>
        <i className={props.location.pathname === `/user/${user.id}` ? 'fas fa-home active' : 'fas fa-home'}></i>
      </Link>
      <Link to={`/user/${user.id}/balance`}>
        <i className={props.location.pathname === `/user/${user.id}/balance` ? 'fas fa-play-circle active' : 'fas fa-play-circle'}></i>
      </Link>
      <Link to={`/user/${user.id}/income`}>
        <i className={props.location.pathname === `/user/${user.id}/income` ? 'fas fa-signal active' : 'fas fa-signal'}></i>
      </Link>
      <Link to={`/user/${user.id}/expenses`}>
        <i className={props.location.pathname === `/user/${user.id}/expenses` ? 'fas fa-pause-circle active' : 'fas fa-pause-circle'}></i>
      </Link>
      <button onClick={userLogout}><i className="fas fa-power-off"></i></button>
    </section>
  )
}

export default withRouter(Menu)