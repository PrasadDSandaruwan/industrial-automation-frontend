import React, { Component } from 'react'
import Chart from '../charts/Chart'
import Select from '../components/common/select'
import RateService from '../../services/admin/rateService'
import MachineService from '../../services/admin/machineService'
import { toast } from 'react-toastify'

export default class RateOfIngredients extends Component {
  state = {
    machines: [],

    data: {
      machine_id: 1,
      is_temp: 0,
    },

    dataPoints: {
      labels: [],
      datasets: [
        {
          data: [],
          borderWidth: 2,
          fill: false,
          backgroundColor: ['rgba(0, 204, 212, .2)'],
          borderColor: ['rgb(0, 204, 212)'],
        },
      ],
    },
  }

  componentDidMount = async () => {
    try {
      const response = await MachineService.getAllMachinesByType('INGRE')
      console.log('All INGRE machines response data', response)
      if (response.status === 200) {
        if (response.data.code === 200) {
          this.setState({ machines: response.data.data })
        } else {
          toast.error(response.data.data)
        }
      }
    } catch (error) {
      toast.error('Error Occured!')
    }
  }

  handleChangeSelect = async (event, name) => {
    const data = { ...this.state.data }
    data[name] = event.target.value
    try {
      const response = await RateService.getRates(data)
      console.log('machine rates data', response)
      if (response.status === 200) {
        if (response.data.code === 200) {
          const dataPoints = { ...this.state.dataPoints }
          dataPoints.labels = response.data.data.labels
          dataPoints.datasets[0].data = response.data.data.data
          this.setState({ dataPoints })
        } else {
          toast.error(response.data.data)
        }
      }
    } catch (error) {
      toast.error('Error Occured!')
    }
    this.setState({ data })
    console.log(this.state.data)
  }

  render() {
    return (
      <div>
        <h5 className="m-0 p-0">Rate of Ingredients</h5>
        <div className="form-group col-lg-4 col-md-6 m-0 p-0">
          <form action="#" className="m-0 p-0">
            <Select
              className="m-0 p-0"
              name="machine_id"
              options={this.state.machines}
              label=""
              property="name"
              onChange={this.handleChangeSelect}
            ></Select>
          </form>
        </div>
        <div className="row row-sm mg-b-20">
          <div className="col-lg-6 ht-lg-100p">
            <Chart
              title=""
              labels={this.state.dataPoints.labels}
              datasets={this.state.dataPoints.datasets}
              machineId={200}
            />
          </div>
        </div>
      </div>
    )
  }
}
