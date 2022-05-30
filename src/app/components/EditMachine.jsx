import React from 'react'
import { Redirect } from 'react-router-dom'
import Joi from 'joi'
import Form from './common/form'
import MachineServices from '../../services/admin/machineService'
import ProductionLineService from '../../services/admin/productionLineService';


export class EditMachine extends Form{
  state = {
    isRedirect : false,
    produtionline : [],
    
    machinetype : [],

    id : 1,

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
    const id = this.props.match.params.id;
    this.setState({ id });
    const responseGetMachineTypes = await MachineServices.getMachineTypes();
    const responseGetProductionLine = await ProductionLineService.getProductionLinesID();
    const responseGetMachineDetails = await MachineServices.editMachineView(id); 
    console.log("All machines details",responseGetMachineDetails.data.data);
    
    if (responseGetMachineTypes.status === 200 && responseGetProductionLine.status === 200 && responseGetMachineDetails.status === 200 ) {
      if (responseGetMachineTypes.data.code === 200 && responseGetProductionLine.data.code === 200 && responseGetMachineDetails.data.code === 200) {
        const data = {...this.data}
        data.production_line_id = responseGetMachineDetails.data.data.production_line.id;
        data.machine_type_id = responseGetMachineDetails.data.data.machine_type.id;
        data.name = responseGetMachineDetails.data.data.name;
        data.slug = responseGetMachineDetails.data.data.slug;
        data.license_number = responseGetMachineDetails.data.data.license_number;
        data.is_automated = responseGetMachineDetails.data.data.is_automated;
        this.setState({ produtionline : responseGetProductionLine.data.data, machinetype : responseGetMachineTypes.data.data, isRedirect : false, data});
      
      } else {
      this.setState({ isRedirect: true });
      }
    } else {
      this.setState({ isRedirect: true });
    }
    
    
    
   
  };

  doSubmit = async () => {
    try {
      const response = await MachineServices.saveMachineView(this.state.data, this.state.id);
      console.log("succesful");
      if (response.status === 200) {
        if (response.data.code === 200) {

          alert(response.data.message);
        } else {
          alert(response.data.message);
        }
      }
    } catch (error) {
      alert("Error occured!");
      console.log("Error", error);
    }
  };

  render() {
    return(
      <div className="adding">
      <h2 className='py-3'>Edit Machine Details</h2>
      
      <form action="#">


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

        </div>

        {this.renderButton('Save', 'Save', null, null)}
        {this.renderButton('Cancel', 'Cancel', null, null)}


      </form>
    </div>
    )
  }
}

export default EditMachine