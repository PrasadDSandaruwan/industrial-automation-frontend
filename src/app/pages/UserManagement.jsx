// import React from 'react'

// function UserManagement() {
//   return (
//     <div>UserManagement</div>
//   )
// }

// export default UserManagement
import React, {lazy} from 'react'
import { Route, NavLink } from 'react-router-dom'


// const AddMachine = lazy(() => import('../components/AddMachine'))
import AddUser from '../components/AddUser'
// import AddProductionline from '../components/AddProductionline'
import { ViewAllUsers } from '../components/viewAllUsers'


function UserManagement() {
  return (
    
    <div>
      <div className="container p-md-0">
        <div className="az-content-body">

          <div className="az-dashboard-nav">
            <nav className="nav">
              <NavLink className="nav-link" to="/usermanagement/view-all-users">View All Users</NavLink>
              <NavLink  className="nav-link" to="/usermanagement/add-user">Add a User</NavLink>
              {/* <NavLink  className="nav-link"  to="/users/add-production-line">Add a Production Line</NavLink> */}
              <NavLink  className="nav-link"  to="#/">More</NavLink>
            </nav>
          </div>
          <Route exact path="/usermanagement/view-all-users" component={ViewAllUsers}></Route>
          <Route exact path="/usermanagement/add-user" component={AddUser}></Route>
          {/* <Route exact path="/users/add-production-line" component={AddProductionline}></Route> */}
        </div>
      </div>
      
    </div>

  )
}

export default UserManagement