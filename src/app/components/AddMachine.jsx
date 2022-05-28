import React from 'react'
import { Redirect } from 'react-router-dom'
import Joi from 'joi'
import Form from './common/form'

export class AddMachine extends Form{
  state = {
    produtionline : 
      [{id : 1,
      name : 'testing 01', 
    }, {id : 2,
      name : 'testing 02', 
    } , {id : 3,
      name : 'testing 03', 
    }, {id : 4,
      name : 'testing 04', 
    }, {id : 5,
      name : 'testing 05', 
    } ],

    isautomated : 
      [{id : 0,
      name : 'No',
    }, {id : 1,
      name : 'Yes',
    } ],

    data : {
      //every input field name == state name
      productionLine : 1,
      machineType : 2,
      machineName : '',
      slug : '',
      licenseNumber : '',  
      isAutomated : 1

    },
    errors : {},
  }

  //error handling
  schema = Joi.object({
    productionLine: Joi.number().required(),
    machineType : Joi.number().required(),
    machineName : Joi.string().required(),
    slug : Joi.string().required(),
    licenseNumber : Joi.string().required(),
    isAutomated : Joi.number().required(),
  })

  doSubmit = async () => {
    const {productionLine, machineType, machineName, slug, licenseNumber, isAutomated } = this.state.data

  }

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
            'productionLine',
            'Production Line',
            'Enter the Production Line',
            null,
            null,
            null,
            null,

          )}
        </div>

        <div className="form-group">
          {this.renderSelect(
            'machineType',
            'Machine Type',
            this.state.produtionline,
            'name'
            )}
        </div>

        <div className="form-group">
          {this.renderInput(
            'machineName',
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
            'licenseNumber',
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
              'isAutomated',
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