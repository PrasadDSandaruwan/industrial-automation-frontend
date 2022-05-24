import React, { Component } from 'react'
import Auth from '../../../services/user/authService'

class Logout extends Component {
  componentDidMount() {
    Auth.logout()
    window.location = '/signin'
  }

  render() {
    return null
  }
}

export default Logout
