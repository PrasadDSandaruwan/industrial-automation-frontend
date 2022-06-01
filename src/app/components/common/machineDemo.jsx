//name
//id
//init_rate
//init_temp
//rate
//temp
//command
//message


import React from 'react'
import Joi from 'joi'
import Form from './form'
import machineService from '../../../services/admin/machineService'
import { toast } from "react-toastify";

export class MachineDemo extends Form{
    state = {
      
  
      data : {
        //every input field name == state name
        name : '',
        id : 1,
        init_rate : 1,
        init_temp : 1,
        rate : 1,
        temp : 1,
        command : '',
        message : '',
  
      },
      errors : {},
    }
  
    // //error handling
    // schema = Joi.object({
    //   name : Joi.string().required(),
    //   id: Joi.number().required(),
    //   init_rate : Joi.number().required(),
    //   init_temp : Joi.number().required(),
    //   rate : Joi.number().required(),
    //   temp : Joi.number().required(),
    //   command : Joi.string().required(),
    //   message : Joi.string().required(),

    // })
  
    componentDidMount =  () => {
      // const data = {...this.state.data};
      const data = this.props
      this.setState({data})
    };
  
  
  
    render() {
      return(
        <div style={{width : "200px", height : "auto"}}>
        <h2 className='py-3'>Machine Demo</h2>
        
        <form action="#">

  
          <div className="form-group">
            {this.renderInput(
              'name',
              'Machine Name',
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
              'Machine ID',
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
              'init_rate',
              'Initial Rate',
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
              'init_temp',
              'Initial Temperature',
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
              'rate',
              'Current Rate',
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
              'temp',
              'Current Temperature',
              '',
              null,
              null,
              null,
              true,
              null,
            )}
          </div>

          command

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

  

        </form>
      </div>
      )
    }
  }
  
  export default MachineDemo