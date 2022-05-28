import React from 'react'
import { Redirect } from 'react-router-dom'
import Joi from 'joi'
import Form from './common/form'

export class AddProductionline extends Form{
  state = {
    data : {
      //every input field name == state name
      lineName : '',
      slug : '',
    },
    errors : {},
  }

  //error handling
  schema = Joi.object({
    lineName : Joi.string().required(),
    slug : Joi.string().required(),  
  })

  doSubmit = async () => {
    const {lineName, slug} = this.state.data

  }

  render() {
    return(
      <div className="adding">
      <h2>Add a New Production Line</h2>
      
      <form action="#">
    
        <div className="form-group">
          {this.renderInput(
            'lineName',
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