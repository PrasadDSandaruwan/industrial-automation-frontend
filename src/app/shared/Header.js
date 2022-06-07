import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

export class Header extends Component {
  closeMenu(e) {
    e.target.closest(".dropdown").classList.remove("show");
    e.target.closest(".dropdown .dropdown-menu").classList.remove("show");
  }

  toggleHeaderMenu(e) {
    e.preventDefault();
    document.querySelector("body").classList.toggle("az-header-menu-show");
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      document.querySelector("body").classList.remove("az-header-menu-show");
    }
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <div className="az-header">
          <div className="container">
            <div className="az-header-left">
              <a href="#/" className="az-logo">
                <span>Automated</span>
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
                    this.isPathActive("/dashboard")
                      ? "nav-item active"
                      : "nav-item"
                  }
                >
                  <Link to="/dasboard/rate-of-production" className="nav-link">
                    Dashboard
                  </Link>
                </li>

                {user && user.authorities[0] === "ADMIN" && (
                  <li
                    className={
                      this.isPathActive("/machines")
                        ? "nav-item active"
                        : "nav-item"
                    }
                  >
                    <Link to="/machines/view-all-machines" className="nav-link">
                      Machines
                    </Link>
                  </li>
                )}

                {user && user.authorities[0] === "ADMIN" && (
                  <li
                    className={
                      this.isPathActive("/alarms")
                        ? "nav-item active"
                        : "nav-item"
                    }
                  >
                    <Link to="/alarms/all-alarms" className="nav-link">
                      Alarms
                    </Link>
                  </li>
                )}

                {user && user.authorities[0] === "ADMIN" && (
                  <li
                    className={
                      this.isPathActive("/usermanagement")
                        ? "nav-item active"
                        : "nav-item"
                    }
                  >
                    <Link
                      to="/usermanagement/view-all-users"
                      className="nav-link"
                    >
                      User Management
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <div className="az-header-right">
              <Link to="/demo" class="btn btn-info" role="button">
                Live Demo
              </Link>

              <Dropdown className="az-profile-menu">
                <Dropdown.Toggle as={"a"} className="az-img-user">
                  <i class="fas fa-user-alt" style={{ fontSize: "28px" }}></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Link to="/profile/user-profile" className="dropdown-item">
                    <i className="typcn typcn-user-outline"></i> My Profile
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
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(Header);
