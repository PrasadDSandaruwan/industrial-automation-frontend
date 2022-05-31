import React, { Component } from "react";
import { Route,NavLink} from "react-router-dom";
import ChangePassword from "./ChangePassword";
import UserProfile from "../components/userProfile";

function Profile() {
  return (
    <div>
      <div className="container p-md-0">
        <div className="az-content-body">
          <div className="az-dashboard-nav">
            <nav className="nav">
              <NavLink className="nav-link" to="/profile/user-profile">
                User Profile
              </NavLink>
              <NavLink className="nav-link" to="/profile/change-password">
                Change Password
              </NavLink>
              
              <NavLink className="nav-link" to="#/">
                More
              </NavLink>
            </nav>
          </div>
          <Route
            exact
            path="/profile/user-profile"
            component={UserProfile}
          ></Route>
          <Route
            exact
            path="/profile/change-password"
            component={ChangePassword}
          ></Route>
          
          
        </div>
      </div>
    </div>
  );
}

export default Profile;
