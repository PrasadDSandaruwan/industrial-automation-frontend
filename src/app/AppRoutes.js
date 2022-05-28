import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ProtectedRoute from "./components/common/protectedRoute";
import ProtectedRouteAdmin from "./components/common/protectedRouteAdmin";
import AddProductionline from './components/AddProductionline'
const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const Machines = lazy(() => import("./pages/Machines"));
const AddAlarm = lazy(() => import("./pages/AddAlarm"));
const EditAlarm = lazy(() => import("./pages/EditAlarm"));
const Alarms = lazy(() => import("./pages/Alarms"));
const Notifications = lazy(() => import("./pages/Notifications"));
const EditNotifications = lazy(() => import("./pages/EditNotifications"));
const UserManagement = lazy(() => import("./pages/UserManagement"));
const Profile = lazy(() => import("./pages/Profile"));
const Signin = lazy(() => import("./pages/Signin"));
const ChangePassword = lazy(() => import("./pages/ChangePassword"));
const Logout = lazy(() => import("../app/components/common/logout"));
const AddMachine = lazy(() => import('../app/components/AddMachine'))

export class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback="">
        <Switch>
          <ProtectedRouteAdmin path="/machines" component={Machines} />
          <ProtectedRouteAdmin path="/addMachine" component={AddMachine} />
          <ProtectedRouteAdmin path="/addProductionline" component={AddProductionline} />
          <ProtectedRouteAdmin path="/alarms" component={Alarms} />

          <ProtectedRouteAdmin
            path="/usermanagement"
            component={UserManagement}
          />
          <ProtectedRoute path="/profile" component={Profile} />
          <Route exact path="/signin" component={Signin} />

          <ProtectedRoute path="/changepassword" component={ChangePassword} />
          <ProtectedRoute path="/dasboard" component={Dashboard} />
          <ProtectedRoute path="/logout" component={Logout} />

          <ProtectedRouteAdmin
            path="/notifications"
            component={Notifications}
          />
          <ProtectedRouteAdmin
            path="/editnotifications"
            component={EditNotifications}
          />

          <Route path="/">
            <Redirect to="/signin"></Redirect>
          </Route>
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;
