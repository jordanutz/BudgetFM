import React, {Component} from 'react'
import './Reset.scss'
import routes from './routes'
import {withRouter} from 'react-router-dom'

// Components
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Navigation from './Components/Navigation/Navigation'

class App extends Component {
  render () {

    const displayNavigation = this.props.location.pathname === '/' || 
      this.props.location.pathname === '/auth' ? <Header /> : <Navigation />

    return (
      <div className="App">
        {displayNavigation}
        {routes}
        <Footer />
      </div>
    )
  }
}

export default withRouter(App);
