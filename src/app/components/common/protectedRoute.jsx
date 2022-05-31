import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Auth from '../../../services/user/authService'

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      exact
      path={path}
      {...rest}
      render={(props) => {
        if (!Auth.getCurrentUser())
          return (
            <Redirect
              to={{
                pathname: '/signin',
                state: { from: props.location },
              }}
            />
          )
          if (Auth.getForcePassword()==="FORCE_PASSWORD_CHANGE_PENDING")
          return (
            <Redirect
              to={{
                pathname: "/force-change-password",
                state: { from: props.location },
              }}
            />
          )
        return Component ? <Component {...props} /> : render(props)
      }}
    />
  )
}

export default ProtectedRoute
