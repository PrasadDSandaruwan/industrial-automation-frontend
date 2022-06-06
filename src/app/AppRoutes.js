import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ProtectedRoute from "./components/common/protectedRoute";
import ProtectedRouteAdmin from "./components/common/protectedRouteAdmin";
import ProtectedRouteForcePassword from "./components/common/protectedRouteForcePassword";
import AddProductionline from "./components/AddProductionline";
import ForcePasswordChange from "./components/forcePasswordChange";
import ProtectedRouteLogoutUser from "./components/common/protectedRouteLogoutUser";
const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const Machines = lazy(() => import("./pages/Machines"));
const Alarms = lazy(() => import("./pages/Alarms"));
const Notifications = lazy(() => import("./pages/Notifications"));
const UserManagement = lazy(() => import("./pages/UserManagement"));
const Profile = lazy(() => import("./pages/Profile"));
const Signin = lazy(() => import("./pages/Signin"));
const ChangePassword = lazy(() => import("./pages/ChangePassword"));
const Logout = lazy(() => import("../app/components/common/logout"));
const AddMachine = lazy(() => import("../app/components/AddMachine"));
const DemoPage =  lazy(() => import("../app/pages/DemoPage"));

export class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback="">
        <Switch>
          <Route path="/machines" component={Machines} />
          <Route path="/addMachine" component={AddMachine} />
          <Route
            path="/addProductionline"
            component={AddProductionline}
          />
          <ProtectedRouteAdmin path="/alarms" component={Alarms} />
 
          <ProtectedRouteAdmin
            path="/usermanagement"
            component={UserManagement}
          />
          <Route path="/profile" component={Profile} />
          <Route exact path="/signin" component={Signin} />


          <ProtectedRouteForcePassword path="/force-change-password" component={ForcePasswordChange} />
          <ProtectedRoute path="/dasboard" component={Dashboard} />
          <ProtectedRouteLogoutUser path="/logout" component={Logout} />
 
          <ProtectedRouteAdmin

            path="/notifications"
            component={Notifications}
          />

          <Route path="/demo" component={DemoPage}>

          </Route>


          <Route path="/">
            <Redirect to="/signin"></Redirect>
          </Route>
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;