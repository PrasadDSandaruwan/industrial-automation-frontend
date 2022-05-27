import React, {lazy} from 'react'
import { Route, NavLink } from 'react-router-dom'


// const AddMachine = lazy(() => import('../components/AddMachine'))
import AddMachine from '../components/AddMachine'
import AddProductionline from '../components/AddProductionline'
import { ViewAllMachine } from '../components/viewAllMachine'


function Machines() {
  return (
    
    <div>
      <div className="container p-md-0">
        <div className="az-content-body">

          <div className="az-dashboard-nav">
            <nav className="nav">
              <NavLink className="nav-link" to="/machines/view-all-machines">View All Machines</NavLink>
              <NavLink  className="nav-link" to="/machines/add-machine">Add a Machine</NavLink>
              <NavLink  className="nav-link"  to="/machines/add-production-line">Add a Production Line</NavLink>
              <NavLink  className="nav-link"  to="#/">More</NavLink>
            </nav>
          </div>
          <Route exact path="/machines/view-all-machines" component={ViewAllMachine}></Route>
          <Route exact path="/machines/add-machine" component={AddMachine}></Route>
          <Route exact path="/machines/add-production-line" component={AddProductionline}></Route>
        </div>
      </div>
      
    </div>

  )
}

export default Machines