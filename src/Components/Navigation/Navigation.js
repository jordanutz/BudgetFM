import React, {useContext, useEffect} from 'react'
import './Navigation.scss'
import axios from 'axios'

import {AuthContext} from '../../Context/AuthContext'

const Navigation = () => {

  const {setUser} = useContext(AuthContext)

  useEffect(() => {
    axios.get('/api/user')
    .then(res => setUser(res.data))
    .catch(err => console.log(err))
  }, [])

  return (
    <nav>
      Navigation
    </nav>
  )
}


export default Navigation
