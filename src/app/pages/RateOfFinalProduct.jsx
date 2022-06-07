import React, { Component } from 'react'
import { toast } from 'react-toastify'
import machineService from '../../services/admin/machineService'
import rateService from '../../services/admin/rateService'
import Chart from '../charts/Chart'

export default class RateOfFinalProduct extends Component {
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
          backgroundColor: ['#2b9348'],
          borderColor: ['#2b9348'],
        },
      ],
    },
  }

  componentDidMount = async () => {
    try {
      const response = await machineService.getAllMachines('PACK')
      console.log(' response data', response)
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
      const response = await rateService.getRates(data)
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
        <h5 className="m-0 p-0">Final production</h5>
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
