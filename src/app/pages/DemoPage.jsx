import React, { Component } from 'react'
import MachineService from '../../services/admin/machineService'
import MachineDemo from '../components/common/machineDemo'
import AlarmDemo from '../components/common/alarmDemo'
import { toast } from 'react-toastify'

class DemoPage extends Component {
  state = {
    isRedirect: false,
    data: [],
    id_list: [],
  }

  componentDidMount = async () => {
    try {
      const response = await MachineService.getDemoDetails()

      if (response.status === 200) {
        if (response.data.code === 200) {
          const data = response.data.data
          this.setState({ data })
        } else {
          this.setState({ isRedirect: true })
          toast.error('Error Occured!')
        }
      } else {
        this.setState({ isRedirect: true })
        toast.error('Error Occured!')
      }

      const response_id = await MachineService.getIdList()

      if (response_id.status === 200) {
        if (response_id.data.code === 200) {
          const id_list = response_id.data.data
          this.setState({ id_list })
        } else {
          this.setState({ isRedirect: true })
          toast.error('Error Occured!')
        }
      } else {
        this.setState({ isRedirect: true })
        toast.error('Error Occured!')
      }
    } catch (error) {
      toast.error('Error occured!')
    }

    var inerval = setInterval(async () => {
      const id_list = this.state.id_list

      if (id_list.length == 0) clearInterval(inerval)

      var data_send = {
        machine_id: 1,
        is_temp: 0,
        rate: 20,
      }

      data_send.is_temp = Math.floor(Math.random() * 2)
      data_send.machine_id = id_list[Math.floor(Math.random() * id_list.length)]

      data_send.rate = Math.floor(Math.random() * 80) + 1

      try {
        const new_response = await MachineService.addRates(data_send)
        if (new_response.status === 200) {
          if (new_response.data.code === 200) {
            const data_alarm = new_response.data.data.data.alarms
            const data_machine = new_response.data.data.data.machines

            const new_state = this.state.data

            for (let i = 0; i < data_alarm.length; i++) {
              for (let j = 0; j < new_state.length; j++) {
                for (let k = 0; k < new_state[j].length; k++) {
                  if (Object.keys(new_state[j][k].alarm).length !== 0) {
                    if (new_state[j][k].alarm.id === data_alarm[i].id) {
                      new_state[j][k].alarm.massage = data_alarm[i].massage
                      new_state[j][k].alarm.type = data_alarm[i].type
                    }
                  }
                }
              }
            }

            for (let i = 0; i < data_machine.length; i++) {
              for (let j = 0; j < new_state.length; j++) {
                for (let k = 0; k < new_state[j].length; k++) {
                  if (Object.keys(new_state[j][k].machine).length !== 0) {
                    if (new_state[j][k].machine.id === data_machine[i].id) {
                      new_state[j][k].machine.massage = data_machine[i].massage
                      new_state[j][k].machine.command = data_machine[i].command
                      new_state[j][k].machine.command_type =
                        data_machine[i].command_type
                      new_state[j][k].machine.rate = data_machine[i].rate
                      new_state[j][k].machine.temp = data_machine[i].temp
                    }
                  }
                }
              }
            }

            this.setState({ data: new_state })
          } else {
            toast.error('Error Occured!')
            clearInterval(inerval)
          }
        } else {
          toast.error('Error Occured!')
          clearInterval(inerval)
        }
      } catch (error) {
        toast.error('Error Occured!')
        clearInterval(inerval)
      }
    }, 5000)
  }

  render() {
    const style_class = 'col-3 m-1 d-flex'

    return (
      <React.Fragment>
        {this.state.data.length > 0 &&
          this.state.data.map((lines) => (
            <div>
              <div
                className="row d-flex justify-content-center"
                style={{ marginTop: '10px', marginBottom: '10px' }}
              >
                <h1>Production Line</h1>
              </div>
              <div className="row d-flex justify-content-center">
                {lines.map((line) => (
                  <React.Fragment>
                    {line.machine && line.machine.command_type === 'WARNING' && (
                      <div
                        className={style_class}
                        style={{
                          borderWidth: '5px',
                          border: 'solid',
                          borderColor: 'yellow',
                        }}
                      >
                        <div>
                          {line.machine && (
                            <div>
                              <MachineDemo {...line.machine}></MachineDemo>
                            </div>
                          )}

                          {line.alarm && Object.keys(line.alarm).length !== 0 && (
                            <div>
                              <AlarmDemo {...line.alarm}></AlarmDemo>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {line.machine &&
                      line.machine.command_type !== 'WARNING' &&
                      line.machine.command_type !== 'STOP' &&
                      line.machine.command_type !== 'SUCCESS' && (
                        <div
                          className={style_class}
                          style={{
                            border: 'solid 0.5px',
                            borderColor: 'black',
                          }}
                        >
                          <div>
                            {line.machine && (
                              <div>
                                <MachineDemo {...line.machine}></MachineDemo>
                              </div>
                            )}

                            {line.alarm &&
                              Object.keys(line.alarm).length !== 0 && (
                                <div>
                                  <AlarmDemo {...line.alarm}></AlarmDemo>
                                </div>
                              )}
                          </div>
                        </div>
                      )}

                    {line.machine && line.machine.command_type === 'STOP' && (
                      <div
                        className={style_class}
                        style={{
                          borderWidth: '5px',
                          border: 'solid',
                          borderColor: 'red',
                        }}
                      >
                        <div>
                          {line.machine && (
                            <div>
                              <MachineDemo {...line.machine}></MachineDemo>
                            </div>
                          )}

                          {line.alarm && Object.keys(line.alarm).length !== 0 && (
                            <div>
                              <AlarmDemo {...line.alarm}></AlarmDemo>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {line.machine && line.machine.command_type === 'SUCCESS' && (
                      <div
                        className={style_class}
                        style={{
                          borderWidth: '5px',
                          border: 'solid',
                          borderColor: 'green',
                        }}
                      >
                        <div>
                          {line.machine && (
                            <div>
                              <MachineDemo {...line.machine}></MachineDemo>
                            </div>
                          )}

                          {line.alarm && Object.keys(line.alarm).length !== 0 && (
                            <div>
                              <AlarmDemo {...line.alarm}></AlarmDemo>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
      </React.Fragment>
    )
  }
}
export default DemoPage
