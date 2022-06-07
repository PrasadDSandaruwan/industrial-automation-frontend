import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Auth from '../../../services/user/authService'

const ProtectedRouteLogoutUser = ({ path, component: Component, render, ...rest }) => {
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
         
        return Component ? <Component {...props} /> : render(props)
      }}
    />
  )
}

export default ProtectedRouteLogoutUser
