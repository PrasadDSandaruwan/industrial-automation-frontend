import React from 'react'
import { Redirect } from 'react-router-dom'
import Joi from 'joi'
import Form from './common/form'
import ProductionLineService from '../../services/admin/productionLineService';
import { toast } from "react-toastify";

export class AddProductionline extends Form{
  state = {
    data : {
      //every input field name == state name
      production_line_name : '',
      slug : '',
    },
    errors : {},
  }

  //error handling
  schema = Joi.object({
    production_line_name : Joi.string().required(),
    slug : Joi.string().required(),  
  })

  doSubmit = async () => {
    try {
      const response = await ProductionLineService.addProductionLine(this.state.data);
      console.log("succesful");
      if (response.status === 200) {
        if (response.data.code === 200) {
          const data = {
            // every input field, input name == state name
            production_line_name : '',
            slug : '',
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
  };

  

  render() {
    return(
      <div className="adding">
      <h2 className = "py-3" >Add a New Production Line</h2>
      
      <form action="#">
    
        <div className="form-group">
          {this.renderInput(
            'production_line_name',
            'Line Name',
            'Enter the Line Name',
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

        {this.renderButton('Add Production Line', 'Add Production Line', null, null)}
        {/* <button>Add Machine</button>    */}

      </form>
    </div>
    )
  }
}

export default AddProductionline