import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import Joi from "joi";
import Auth from "../../services/user/authService";
import Form from "../components/common/form";
import AddNotifications from "../components/AddNotifications";
import EditNotifications from "../components/EditNotifications";

export class Notifications extends Component {
  render() {
    return (
      <div>
        <div className="container p-md-0">
          <div className="az-content-body">
            <div className="az-dashboard-nav">
              <nav className="nav">
                <NavLink
                  className="nav-link"
                  to="/notifications/add-notifications"
                >
                  Add Notification
                </NavLink>
                <NavLink
                  className="nav-link "
                  to="/notifications/edit-notifications"
                >
                  Edit Notification
                </NavLink>
                <NavLink className="nav-link" to="#/">
                  More
                </NavLink>
              </nav>
            </div>
            <Route
              exact
              path="/notifications/add-notifications"
              component={AddNotifications}
            />
            <Route
              exact
              path="/notifications/edit-notifications"
              component={EditNotifications}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Notifications;
