import React from 'react'
import './Reset.scss'
import routes from './routes'
import {withRouter} from 'react-router-dom'

// Components
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Navigation from './Components/Navigation/Navigation'

// Context
import AuthContextProvider from './Context/AuthContext'

const App = (props) => {

  const displayNavigation = props.location.pathname === '/' || 
    props.location.pathname === '/auth' ? <Header /> : <Navigation />

  return (
      <div className="App">
        <AuthContextProvider>
          {displayNavigation}
          {routes}
          <Footer />
        </AuthContextProvider>
      </div>

  )
}

export default withRouter(App);
