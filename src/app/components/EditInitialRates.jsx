import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import Joi from 'joi'
import Form from './common/form'
import Input from './common/input'
import MachineService from '../../services/admin/machineService'
import Select from './common/select'
import Button from './common/button'
import { toast } from "react-toastify";

export class EditInitialRates extends Component{
  state = {
    data : {
      //every input field name == state name
      machine_id : 0,
      connected_machine_id : 0,
      rate : 0,
      temp : 0,
    },

    machines : [],

    connectedMachines : [],

    errors : {},
  }

  //error handling
  schema = Joi.object({
    machine_id : Joi.number().required(),
    connected_machine_id : Joi.number().required(),
    rate : Joi.string().required(),  
  })

  componentDidMount = async () => {
    try {

      const responseGetMachineIDs = await MachineService.getAllMachines();
      
      const response_data =responseGetMachineIDs.data.data;
      if (responseGetMachineIDs.status === 200) {
        if (responseGetMachineIDs.data.code === 200) {
          this.setState({ machines : response_data});  
        } else {
          toast.error(responseGetMachineIDs.data.message);
        } 
      }
      else{
        toast.error(responseGetMachineIDs.data.message);
      }
      

    } catch (error) {
      toast.error("Error Occured!")
    }
    
  };

  handleMachineId = async(event, name) => {
    const data = { ...this.state.data };
    data[name] = event.target.value;
    try{
      const response = await MachineService.getPossibleConnectionIDs(event.target.value);

      if (response.status === 200) {
        if (response.data.code === 200) {
          this.setState({ data, connectedMachines : response.data.data });
        } else {
          toast.error(response.data.message);
        } 
      }
      else{
        toast.error(response.data.message);
      }

    }catch{
      toast.error("Error Occured!")
    }
   

  };

  handleConnectedMachineId = async(event, name) => {
    const data = { ...this.state.data };
    data[name] = event.target.value;

    try{
      const response = await MachineService.getRates(data);

      if (response.status === 200) {
        if (response.data.code === 200) {
          data.temp = response.data.data.temp;
          data.rate = response.data.data.rate;
          this.setState({ data});
        } else {
          toast.error(response.data.message);
        } 
      }
      else{
        toast.error(response.data.message);
      }

    }catch{
      toast.error("Error Occured!")
    }

  };

  handleChange = ({ currentTarget: input }) => {
 
    console.log(input);

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data });
  };
  doSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await MachineService.addInitialRates(this.state.data);

      if (response.status === 200) {
        if (response.data.code === 200) {
          const data = {
            // every input field, input name == state name
            machine_id : 0,
            connected_machine_id : 0,
            rate : '',
          };
          this.setState({ data });

          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error Occured!")
    }
  
  }
  

  render() {
    return(
      <div className="adding">
      <h2 className = "py-3" >Add Machine Rates</h2>
      
      <form>



        <div className="form-group">
            <Select 
                name = 'machine_id' 
                label = 'Machine' 
                options = {this.state.machines}
                onChange = {this.handleMachineId} 
                property = 'name'
                >

            </Select>
        </div>

        <div className="form-group">
            <Select 
                name = 'connected_machine_id' 
                label = 'Connected Machine' 
                options = {this.state.connectedMachines}
                onChange = {this.handleConnectedMachineId} 
                property = 'name'
                disabled = {this.state.connectedMachines === []}
                >
                
            </Select>
        </div>
    
        <div className="form-group">
            <Input name = 'rate' label = "Best Working Rate" onChange = {this.handleChange} value = {this.state.data.rate} ></Input>
        </div>

        <div className="form-group">
            <Input name = 'temp' label = "Best Working Temperature" onChange = {this.handleChange} value = {this.state.data.temp} ></Input>
        </div>

        <button  type='submit' onClick = {this.doSubmit}>Submit</button>


      </form>
    </div>
    )
  }
}

export default EditInitialRates