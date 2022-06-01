//alarm_name, id, command, message, type


import React from 'react'
import Joi from 'joi'
import Form from './form'
import machineService from '../../../services/admin/machineService'
import { toast } from "react-toastify";

export class AlarmDemo extends Form{
    state = {
      
  
      data : {
        //every input field name == state name
        alarm_name : '',
        id : 1,
        command : '',
        message : '',
        type : '',
  
      },
      errors : {},
    }
  
    // //error handling
    // schema = Joi.object({
    //   alarm_name : Joi.string().required(),
    //   id: Joi.number().required(),
    //   command : Joi.string().required(),
    //   message : Joi.string().required(),
    //   type : Joi.number().required(),
    // })
  
    componentDidMount = () => {
      // const data = {...this.state.data};
      const data = this.props
      this.setState({data})
    };
  
   
  
    render() {
      return(
        <div style={{width : "200px", height : "auto"}}>
        <h2 className='py-3'>Alarm Demo</h2>
        
        <form action="#">

          <div className="form-group">
            {this.renderInput(
              'alarm_name',
              'Alarm Name',
              '',
              null,
              null,
              null,
              true,
              null,
            )}
          </div>
  
          <div className="form-group">
            {this.renderInput(
              'id',
              'Alarm ID',
              '',
              null,
              null,
              null,
              true,
              null,
            )}
          </div>
  
          <div className="form-group">
            {this.renderInput(
              'command',
              'Command',
              '',
              null,
              null,
              null,
              true,
              null,
            )}
          </div>
  
          <div className="form-group">
            {this.renderInput(
              'message',
              'Message',
              '',
              null,
              null,
              null,
              true,
              null,
            )}
          </div>
          {/* <div className="form-group">
            {this.renderInput(
              'type',
              'Alarm Type',
              '',
              null,
              null,
              null,
              true,
              null,
            )} */}
          {/* </div> */}
        </form>
      </div>
      )
    }
  }
  
  export default AlarmDemo