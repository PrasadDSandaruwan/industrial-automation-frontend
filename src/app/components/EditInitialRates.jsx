import React, { Component } from 'react'
import Joi from 'joi'
import Input from './common/input'
import MachineService from '../../services/admin/machineService'
import Select from './common/select'
import { toast } from 'react-toastify'

export class EditInitialRates extends Component {
  state = {
    data: {
      machine_id: '',
      connected_machine_id: '',
      rate: 0,
    },

    machines: [],

    connectedMachines: [],

    errors: {},
  }

  schema = Joi.object({
    machine_id: Joi.number().required(),
    connected_machine_id: Joi.number().required(),
    rate: Joi.string().required(),
  })

  componentDidMount = async () => {
    try {
      const responseGetMachineIDs = await MachineService.getAllMachines()

      if (responseGetMachineIDs.status === 200) {
        if (responseGetMachineIDs.data.code === 200) {
          const response_data = responseGetMachineIDs.data.data
          this.setState({ machines: response_data })
        } else {
          toast.error(responseGetMachineIDs.data.message)
        }
      } else {
        toast.error(responseGetMachineIDs.data.message)
      }
    } catch (error) {
      toast.error('Error Occured!')
    }
  }

  handleMachineId = async (event, name) => {
    const data = { ...this.state.data }
    data[name] = event.target.value
    try {
      const response = await MachineService.getPossibleConnectionIDs(
        event.target.value,
      )

      console.log('respose', response)
      if (response.status === 200) {
        if (response.data.code === 200) {
          if (response.data.data.data.length !== 0) {
            data.connected_machine_id = response.data.data.data[0].id
            console.log('DATATATAT', data)
          }
          this.setState({ data, connectedMachines: response.data.data.data })
        } else {
          toast.error(response.data.message)
        }
      } else {
        toast.error(response.data.message)
      }
    } catch {
      toast.error('Error Occured!')
    }
  }

  handleConnectedMachineId = async (event, name) => {
    const data = { ...this.state.data }
    data[name] = event.target.value

    console.log('respose 2 cahnged')

    try {
      const response = await MachineService.getRates(data)
      console.log('respose 2', response)
      if (response.status === 200) {
        if (response.data.code === 200) {
          data.temp = response.data.data.temp
          data.rate = response.data.data.rate
          this.setState({ data })
        } else {
          toast.error(response.data.message)
        }
      } else {
        toast.error(response.data.message)
      }
    } catch {
      toast.error('Error Occured!')
    }
  }

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data }
    data[input.name] = input.value

    this.setState({ data })
  }
  doSubmit = async (event) => {
    event.preventDefault()

    console.log('SUBMIt DATA', this.state.data)

    try {
      const response = await MachineService.addInitialRates(this.state.data)

      if (response.status === 200) {
        if (response.data.code === 200) {
          const data = {
            // every input field, input name == state name
            machine_id: 0,
            connected_machine_id: 0,
            rate: '',
          }
          this.setState({ data })

          toast.success(response.data.message)
        } else {
          toast.error(response.data.message)
        }
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error('Error Occured!')
    }
  }

  render() {
    console.log('render', this.state.data)
    return (
      <div>
        <div>
          <div className="az-signin-wrapper " style={{ minHeight: '500px' }}>
            <div
              className="az-card-signin"
              style={{ justifyItems: 'normal', height: 'auto', width: '600px' }}
            >
              <h4>Add Machine Rates</h4>

              <form>
                <div className="form-group">
                  <Select
                    name="machine_id"
                    label="Machine"
                    options={this.state.machines}
                    onChange={this.handleMachineId}
                    property="name"
                  ></Select>
                </div>

                <div className="form-group">
                  <Select
                    name="connected_machine_id"
                    label="Connected Machine"
                    options={this.state.connectedMachines}
                    onChange={this.handleConnectedMachineId}
                    property="name"
                    disabled={this.state.connectedMachines.length === 0}
                  ></Select>
                </div>

                <div className="form-group">
                  <Input
                    name="rate"
                    label="Best Working Rate"
                    onChange={this.handleChange}
                    value={this.state.data.rate}
                    disabled={this.state.connectedMachines.length === 0}
                  ></Input>
                </div>

                <button
                  className="btn btn-az-primary btn-block"
                  type="submit"
                  onClick={this.doSubmit}
                  disabled={this.state.connectedMachines.length === 0}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EditInitialRates
