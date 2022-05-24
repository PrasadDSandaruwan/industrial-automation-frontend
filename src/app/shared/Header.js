import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap'

export class Header extends Component {
  closeMenu(e) {
    e.target.closest('.dropdown').classList.remove('show')
    e.target.closest('.dropdown .dropdown-menu').classList.remove('show')
  }

  toggleHeaderMenu(e) {
    e.preventDefault()
    document.querySelector('body').classList.toggle('az-header-menu-show')
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      document.querySelector('body').classList.remove('az-header-menu-show')
    }
  }

  render() {
    const { user } = this.props
    return (
      <div>
        <div className="az-header">
          <div className="container">
            <div className="az-header-left">
              <a href="#/" className="az-logo">
                <span></span> InAuto
              </a>
              <a
                id="azMenuShow"
                onClick={(event) => this.toggleHeaderMenu(event)}
                className="az-header-menu-icon d-lg-none"
                href="#/"
              >
                <span></span>
              </a>
            </div>
            <div className="az-header-menu">
              <div className="az-header-menu-header">
                <Link to="/" className="az-logo">
                  <span></span> azia
                </Link>
                <a
                  href="#/"
                  onClick={(event) => this.toggleHeaderMenu(event)}
                  className="close"
                >
                  &times;
                </a>
              </div>
              <ul className="nav">
                <li
                  className={
                    this.isPathActive('/dashboard')
                      ? 'nav-item active'
                      : 'nav-item'
                  }
                >
                  <Link to="/dashboard" className="nav-link">
                    Dashboard
                  </Link>
                </li>

                {user && user.authorities[0] === 'ADMIN' && (
                  <li
                    className={
                      this.isPathActive('/machines')
                        ? 'nav-item active'
                        : 'nav-item'
                    }
                  >
                    <Link to="/machines" className="nav-link">
                      Machines
                    </Link>
                  </li>
                )}

                {user && user.authorities[0] === 'ADMIN' && (
                  <li
                    className={
                      this.isPathActive('/alarms')
                        ? 'nav-item active'
                        : 'nav-item'
                    }
                  >
                    <Link to="/alarms" className="nav-link">
                      Alarms
                    </Link>
                  </li>
                )}

                {user && user.authorities[0] === 'ADMIN' && (
                  <li
                    className={
                      this.isPathActive('/usermanagement')
                        ? 'nav-item active'
                        : 'nav-item'
                    }
                  >
                    <Link to="/usermanagement" className="nav-link">
                      User Management
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <div className="az-header-right">
              <Dropdown className="az-header-notification">
                <Dropdown.Toggle as={'a'} className="new">
                  <i className="typcn typcn-bell"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div className="az-dropdown-header mg-b-20 d-sm-none">
                    <a
                      href="#/"
                      onClick={(event) => this.closeMenu(event)}
                      className="az-header-arrow"
                    >
                      <i className="icon ion-md-arrow-back"></i>
                    </a>
                  </div>
                  <h6 className="az-notification-title">Notifications</h6>
                  <p className="az-notification-text">
                    You have 2 unread notification
                  </p>
                  <div className="az-notification-list">
                    <div className="media">
                      <div className="az-img-user">
                        <img
                          src={require('../../assets/images/img5.jpg')}
                          alt=""
                        ></img>
                      </div>
                      <div className="media-body">
                        <p>
                          <strong>Adrian Monino</strong> added new comment on
                          your photo
                        </p>
                        <span>Mar 12 10:40pm</span>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-footer">
                    <a href="#/">View All Notifications</a>
                  </div>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown className="az-profile-menu">
                <Dropdown.Toggle as={'a'} className="az-img-user">
                  <img
                    src={require('../../assets/images/img1.jpg')}
                    alt=""
                  ></img>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div className="az-dropdown-header d-sm-none">
                    <a
                      href="#/"
                      onClick={(event) => this.closeMenu(event)}
                      className="az-header-arrow"
                    >
                      <i className="icon ion-md-arrow-back"></i>
                    </a>
                  </div>
                  <div className="az-header-profile">
                    <div className="az-img-user">
                      <img
                        src={require('../../assets/images/img1.jpg')}
                        alt=""
                      ></img>
                    </div>
                    <h6>Aziana Pechon</h6>
                    <span>Position</span>
                  </div>

                  <Link to="/Profile" className="dropdown-item">
                    <i className="typcn typcn-user-outline"></i> My Profile
                  </Link>
                  <Link to="/Profile" className="dropdown-item">
                    <i className="typcn typcn-edit"></i> Edit Profile
                  </Link>
                  <Link to="/logout" className="dropdown-item">
                    <i className="typcn typcn-power-outline"></i> Sign Out
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    )
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path)
  }
}

export default withRouter(Header)
