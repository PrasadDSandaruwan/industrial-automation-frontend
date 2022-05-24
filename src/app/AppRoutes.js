import React, { Component, Suspense, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import ProtectedRoute from './components/common/protectedRoute'
import ProtectedRouteAdmin from './components/common/protectedRouteAdmin'
const Dashboard = lazy(() => import('./dashboard/Dashboard'))
const Machines = lazy(() => import('./pages/Machines'))
const Alarms = lazy(() => import('./pages/Alarms'))
const UserManagement = lazy(() => import('./pages/UserManagement'))
const Profile = lazy(() => import('./pages/Profile'))
const Signin = lazy(() => import('./pages/Signin'))
const ChangePassword = lazy(() => import('./pages/ChangePassword'))
const Logout = lazy(() => import('../app/components/common/logout'))

export class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback="">
        <Switch>
          <ProtectedRouteAdmin path="/machines" component={Machines} />
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

          <Route path="/">
            <Redirect to="/signin"></Redirect>
          </Route>
        </Switch>
      </Suspense>
    )
  }
}

export default AppRoutes
