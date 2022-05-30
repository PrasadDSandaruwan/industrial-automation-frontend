import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './App.scss'
import AppRoutes from './AppRoutes'
import Header from './shared/Header'
import Footer from './shared/Footer'
import Auth from '../services/user/authService'
import './styleMachine.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


class App extends Component {
  state = {}
  componentDidMount() {
    this.onRouteChanged()
  }
  render() {
    let headerComponent = !this.state.isFullPageLayout ? (
      <Header user={Auth.getCurrentUser()} />
    ) : (
      ''
    )
    let footerComponent = !this.state.isFullPageLayout ? <Footer /> : ''
    return (
      <div>
        <ToastContainer/>
        {headerComponent}
        <div className="az-content-wrapper">
          <AppRoutes />
        </div>
        {footerComponent}
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged()
    }
  }

  onRouteChanged() {
    console.log('ROUTE CHANGED')
    window.scrollTo(0, 0)
    const fullPageLayoutRoutes = ['/signin', '/changepassword', '/page-404']
    for (let i = 0; i < fullPageLayoutRoutes.length; i++) {
      if (this.props.location.pathname === fullPageLayoutRoutes[i]) {
        this.setState({
          isFullPageLayout: true,
        })
        document.querySelector('.az-content-wrapper').classList.add('p-0')
        break
      } else {
        this.setState({
          isFullPageLayout: false,
        })
        document.querySelector('.az-content-wrapper').classList.remove('p-0')
      }
    }
  }
}

export default withRouter(App)
