import React, {Component} from 'react'
import './Login.scss'

class Login extends Component {
  constructor () {
    super()
    this.state = {
      signIn: false, 
      
    }
  }

  toggleSignIn = () => {
    this.setState({
      signIn: true
    })
  }

  toggleSignUp = () => {
    this.setState({
      signIn: false
    })
  }

  render () {

    return (
      <div className="Login">
       
      </div>
    )
  }
}

export default Login