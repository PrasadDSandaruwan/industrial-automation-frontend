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
      machine_id: '',
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

      if (response.status === 200) {
        if (response.data.code === 200) {
          this.setState({ machines: response.data.data })
        } else {
          toast.error(response.data.data)
        }
      }

      let inerval
      clearInterval(inerval)

      inerval = setInterval(async () => {
        if (this.state.data.machine_id) {
          var data_send = { ...this.state.data }

          data_send.rate = Math.floor(Math.random() * (100 - 1 + 1)) + 1

          const new_response = await MachineService.addRates(data_send)
          if (new_response.status === 200) {
            if (new_response.data.code === 200) {
            } else {
              clearInterval(inerval)
              toast.error(new_response.data.data)
            }
          } else {
            clearInterval(inerval)
            toast.error(new_response.data.data)
          }

          const res_1 = await RateService.getRates(data_send)
          if (res_1.status === 200) {
            if (res_1.data.code === 200) {
              const dataPoints = { ...this.state.dataPoints }
              dataPoints.labels = res_1.data.data.labels
              dataPoints.datasets[0].data = res_1.data.data.data

              if (this.state.data.machine_id) this.setState({ dataPoints })
            } else {
              clearInterval(inerval)

              toast.error(res_1.data.data)
            }
          } else {
            toast.error('Error Occured!')
            clearInterval(inerval)
          }
        }
      }, 5000)
    } catch (error) {
      toast.error('Error Occured!')
    }
  }

  handleChangeSelect = async (event, name) => {
    const data = { ...this.state.data }
    data[name] = event.target.value
    try {
      if (event.target.value) {
        const response = await RateService.getRates(data)

        if (response.status === 200) {
          if (response.data.code === 200) {
            const dataPoints = { ...this.state.dataPoints }
            dataPoints.labels = response.data.data.labels
            dataPoints.datasets[0].data = response.data.data.data

            this.setState({ dataPoints, data })
          } else {
            toast.error(response.data.data)
          }
        }
      } else {
        const dataPoints = { ...this.state.dataPoints }
        dataPoints.labels = []
        dataPoints.datasets[0].data = []

        const data = { ...this.state.data }
        data.machine_id = ''
        this.setState({ dataPoints, data })
      }
    } catch (error) {
      toast.error('Error Occured!')
    }
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
