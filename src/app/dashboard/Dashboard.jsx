import React, { Component } from 'react'
import { NavLink, Route } from 'react-router-dom'
import { Line, Bar, Pie } from 'react-chartjs-2';
import Chart from '../charts/Chart';

import RateOfProduction from '../pages/RateOfProduction';
import RateOfIngredients from '../pages/RateOfIngredients';
import RateOfFinalProduct from '../pages/RateOfFinalProduct';
import Temperature from '../pages/Temperature';
import RemainingIngredientAmount from '../pages/RemainingIngredientAmount';

export class Dashboard extends Component {


  render() {
    return (
      <div>
        <div className="container p-md-0">
          <div className="az-content-body">

            <div className="az-dashboard-nav">
              <nav className="nav">
                <NavLink className="nav-link" to="/dashboard/rate-of-production">Rate of Production</NavLink>
                <NavLink className="nav-link" to="/dashboard/rate-of-ingredients">Rate of Ingredients</NavLink>
                <NavLink className="nav-link" to="/dashboard/rate-of-final-product">Final Production</NavLink>
                <NavLink className="nav-link" to="/dashboard/temperature">Temperature</NavLink>
                <NavLink className="nav-link" to="/dashboard/remaining-ingredient-amount">Remaining Ingredients</NavLink>

              </nav>
            </div>
            <Route exact path="/dashboard/rate-of-production" component={RateOfProduction}></Route>
            <Route exact path="/dashboard/rate-of-ingredients" component={RateOfIngredients}></Route>
            <Route exact path="/dashboard/rate-of-final-product" component={RateOfFinalProduct}></Route>
            <Route exact path="/dashboard/temperature" component={Temperature}></Route>
            <Route exact path="/dashboard/remaining-ingredient-amount" component={RemainingIngredientAmount}></Route>

          </div>{/* az-content-body */}
        </div>
      </div>
    )
  }
}

export default Dashboard
