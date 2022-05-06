import React, { Component, Suspense, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

const Dashboard = lazy(() => import('./dashboard/Dashboard'))
const Machines = lazy(() => import('./pages/Machines'))
const Alarms = lazy(() => import('./pages/Alarms'))
const UserManagement = lazy(() => import('./pages/UserManagement'))
const Profile = lazy(() => import('./pages/Profile'))
const Signin = lazy(() => import('./pages/Signin'))
const ChangePassword = lazy(() => import('./pages/ChangePassword'))

export class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback=''>
        <Switch>
          <Route exact path="/">
            <Redirect to="/signin"></Redirect>
          </Route>
          <Route exact path="/dashboard" component={ Dashboard } />
          <Route exact path="/machines" component={ Machines } />
          <Route exact path="/alarms" component={ Alarms } />
          <Route exact path="/usermanagement" component={ UserManagement } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/signin" component={ Signin } />
          <Route exact path="/changepassword" component={ ChangePassword } />

        </Switch>
      </Suspense>
    )
  }
}

export default AppRoutes
