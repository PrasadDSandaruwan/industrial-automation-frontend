import React from 'react'
import { Redirect } from 'react-router-dom'
import Joi from 'joi'
import Auth from "../../services/user/authService";
import Form from './common/form'
import MachineService from "../../services/admin/machineService";
import ProductionLineService from '../../services/admin/productionLineService';
import { toast } from "react-toastify";

export class AddMachine extends Form{
  state = {
    produtionline : [],
    
    machinetype : [],

    isautomated : 
      [{id : 0,
      name : 'No',
    }, {id : 1,
      name : 'Yes',
    } ],

    data : {
      //every input field name == state name
      production_line_id : 1,
      machine_type_id : 2,
      name : '',
      slug : '',
      license_number : '',  
      is_automated : 1

    },
    errors : {},
  }

  //error handling
  schema = Joi.object({
    production_line_id: Joi.number().required(),
    machine_type_id : Joi.number().required(),
    name : Joi.string().required(),
    slug : Joi.string().required(),
    license_number : Joi.string().required(),
    is_automated : Joi.number().required(),
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
      alert("Error occured!");
      console.log("Error", error);
    }
    
  };

  doSubmit = async () => {
    try {
      const response = await MachineService.addMachine(this.state.data);

      if (response.status === 200) {
        if (response.data.code === 200) {
          const data = {
            // every input field, input name == state name
            production_line_id : 1,
            machine_type_id : 2,
            name : '',
            slug : '',
            license_number : '',  
            is_automated : 1
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
 
          {this.renderSelect(
            'production_line_id',
            'Production Line',
            this.state.produtionline,
            'line_name'
            )}
        </div>

        <div className="form-group">
          {this.renderSelect(
            'machine_type_id',
            'Machine Type',
            this.state.machinetype,
            'machine_type_name'
            )}
        </div>

        <div className="form-group">
          {this.renderInput(
            'name',
            'Machine Name',
            'Enter the machine name',
            null,
            null,
            null,
            null,
            null,
          )}
        </div>

        <div className="form-group">
          {this.renderInput(
            'slug',
            'Slug',
            'Enter the slug',
            null,
            null,
            null,
            null,
            null,
          )}
        </div>

        <div className="form-group">
          {this.renderInput(
            'license_number',
            'License Number',
            'Enter the License Number',
            null,
            null,
            null,
            null,
            null,
          )}
        </div>

        <div className="form-group">
          {this.renderSelect(
              'is_automated',
              'Is Automated',
              this.state.isautomated,
              'name'
              )}
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
        </div>


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

export default AddMachine