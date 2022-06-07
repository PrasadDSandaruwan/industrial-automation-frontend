import React from "react";
import { NavLink, Route } from "react-router-dom";
import AddAlarm from "../components/AddAlarm";
import EditAlarm from "../components/EditAlarm";
import AllAlarm from "../components/allalarms";

function Alarms() {
  return (
    <div>
      <div className="container p-md-0">
        <div className="az-content-body">
          <div className="az-dashboard-nav">
            <nav className="nav">
              <NavLink className="nav-link" to="/alarms/all-alarms">
                All Alarms
              </NavLink>
              <NavLink className="nav-link " to="/alarms/add-alarm">
                Add Alarm
              </NavLink>
            </nav>
          </div>
          <Route exact path="/alarms/all-alarms" component={AllAlarm} />
          <Route exact path="/alarms/add-alarm" component={AddAlarm} />
          <Route exact path="/alarms/edit-alarm/:id" component={EditAlarm} />
        </div>
      </div>
    </div>
  );
}

export default Alarms;
