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
  
    //error handling
    schema = Joi.object({
      name : Joi.string().required(),
      id: Joi.number().required(),
      init_rate : Joi.number().required(),
      init_temp : Joi.number().required(),
      rate : Joi.number().required(),
      temp : Joi.number().required(),
      command : Joi.string().required(),
      message : Joi.string().required(),

    })
  
    componentDidMount = async () => {
      try {
        const responseGetMachineTypes = await MachineService.getMachineTypes();
        const responseGetProductionLine = await ProductionLineService.getProductionLinesID();
        console.log("All machines Types", responseGetMachineTypes.data.data);
        console.log("All production Lines", responseGetProductionLine.data.data);
        if (responseGetMachineTypes.status === 200 && responseGetProductionLine.status === 200) {
          if (responseGetMachineTypes.data.code === 200 && responseGetProductionLine.data.code === 200) {
            this.setState({ produtionline : responseGetProductionLine.data.data, machinetype : responseGetMachineTypes.data.data });
          } else {
            toast.error("Error Occured!")
          } 
        }
      } catch (error) {
        toast.error("Error Occured!")
      }
      
    };
  
    doSubmit = async () => {
      try {
        const response = await MachineService.addMachine(this.state.data);
  
        if (response.status === 200) {
          if (response.data.code === 200) {
            const data = {
              // every input field, input name == state name
              name : '',
              id : 1,
              init_rate : 1,
              init_temp : 1,
              rate : 1,
              temp : 1,
              command : '',
              message : '',
        
            };
            this.setState({ data });
  
            toast.success(response.data.message);
  
          } else {
            toast.error(response.data.message);
          }
        }
      } catch (error) {
        toast.error("Error Occured!")
      }
    };
  
    render() {
      return(
        <div className="adding">
        <h2 className='py-3'>Add a New Machine</h2>
        
        <form action="#">
          {/* <label>Machine type</label>
          <select
            value={type}
            onChange = {(e) => setType(e.type.value)}
          >
            <option value="testing1">Testing1</option>
            <option value="testing2">Testing2</option>
          </select> */} 
  
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
            {/* {this.renderInput(
              'isAutomated',
              'Is Automated',
              null,
              null,
              null,
              null,
              null,
              null,
            )} */}
  
  
          {/* <label>Production line</label>
          <input
            type="text"
            required
            value={productionLine}
            onChange = {(e) => setLine(e.target.value)}
          /> */}
  
          {/* <label>Machine name</label>
          <input
            type="text"
            required
            value={name}
            onChange = {(e) => setName(e.target.value)}
          /> */}
  
          {/* <label>Machine id</label>
          <input
            type="text"  
            required
            value={id}
            onChange = {(e) => setId(e.target.value)}
          />      */}
  
          {this.renderButton('Add Machine', 'Add Machine', null, null)}
          {/* <button>Add Machine</button>    */}
  
        </form>
      </div>
      )
    }
  }
  
  export default MachineDemo