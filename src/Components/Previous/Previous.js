import React, {useContext} from 'react'
import './Previous.scss'

// Components
import Menu from '../Menu/Menu'
import NoAccess from '../NoAccess/NoAccess'

// Context
import {AuthContext} from '../../Context/AuthContext'

const Previous = () => {

  const {user} = useContext(AuthContext)

  const displayPrevious = user ? 
    <div className="Previous">
      <Menu />
      <section className="PreviousMain">
        <h1>Previous</h1>
      </section>
    </div>

    : 

    <NoAccess />

  return (
    <React.Fragment>
      {displayPrevious}
    </React.Fragment>
  )
}

export default Previous