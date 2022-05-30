import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import Joi from 'joi'
import Form from './common/form'
import Input from './common/input'
import MachineService from '../../services/admin/machineService'
import Select from './common/select'
import Button from './common/button'

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
    //   const responseConnectedMAchineIDs = await MachineService.getPossibleConnectionIDs(id);
      // console.log("All machines Types", responseGetMachineTypes.data.data);
      // console.log("All production Lines", responseGetProductionLine.data.data);
      // if (responseGetMachineTypes.status === 200 && responseGetProductionLine.status === 200) {
      //   if (responseGetMachineTypes.data.code === 200 && responseGetProductionLine.data.code === 200) {
        
        const response_data =responseGetMachineIDs.data.data;
        // const machines = [];
        // if (response_data.length > 0) {
        //   for (let i = 0; i < response_data.length; i++) {
        //     let row = {
        //       id : response_data[i].id,
  
        //     };
        //     machines.push(row);
        //   }
        // }
        this.setState({ machines : response_data});  

        // } else {
        //   alert(responseGetMachineTypes.data.message);
        //   alert(responseGetProductionLine.data.message);
        // } 
      // }
    } catch (error) {
      alert("Error occured!");
      console.log("Error", error);
    }
    
  };

  handleMachineId = async(event, name) => {
    const data = { ...this.state.data };
    data[name] = event.target.value;
    console.log(name, event.target.value);
    const response = await MachineService.getPossibleConnectionIDs(event.target.value);
    this.setState({ data, connectedMachines : response.data.data });
    console.log(this.state.data);

  };

  handleConnectedMachineId = async(event, name) => {
    const data = { ...this.state.data };
    data[name] = event.target.value;
    console.log(name, event.target.value);
    const response = await MachineService.getRates(data);
    data.temp = response.data.data.temp;
    data.rate = response.data.data.rate;
    this.setState({ data});
    console.log(this.state.data);

  };

  handleChange = ({ currentTarget: input }) => {
 
    console.log(input);

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data });
    console.log("handle change", this.state.data);
  };
  doSubmit = async (event) => {
    event.preventDefault();
    console.log("in the do submit");
    
    try {
      const response = await MachineService.addInitialRates(this.state.data);
      console.log("succesful");
      if (response.status === 200) {
        if (response.data.code === 200) {
          const data = {
            // every input field, input name == state name
            machine_id : 0,
            connected_machine_id : 0,
            rate : '',
          };
          this.setState({ data });

          alert(response.data.message);
        } else {
          alert(response.data.message);
        }
      }
    } catch (error) {
      alert("Error occured!");
      console.log("Error", error);
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
            <Input name = 'rate' label = "Best Working Rate" onChange = {this.handleChange} ></Input>
        </div>

        <div className="form-group">
            <Input name = 'temp' label = "Best Working Temperature" onChange = {this.handleChange} ></Input>
        </div>

        <button  type='submit' onClick = {this.doSubmit}>Submit</button>


      </form>
    </div>
    )
  }
}

export default EditInitialRates