import React from 'react'
import { Redirect } from 'react-router-dom'
import Joi from 'joi'
import Form from './common/form'

export class AddInitialRates extends Form{
  state = {
    data : {
      //every input field name == state name
      machineId : 0,
      rate : '',
    },

    machines : [{id : 1,
        machineId : '01', 
      }, {id : 2,
        machineId : '02', 
      } , {id : 3,
        machineId : '03', 
      }, {id : 4,
        machineId : '04', 
      }, {id : 5,
        machineId : '05', 
      } ],
    

    errors : {},
  }

  //error handling
  schema = Joi.object({
    machineId : Joi.number().required(),
    rate : Joi.string().required(),  
  })

  doSubmit = async () => {
    const {machineId, rate} = this.state.data

  }

  render() {
    return(
      <div className="adding">
      <h2 className = "py-3" >Add Machine Rates</h2>
      
      <form action="#">

        <div className="form-group">
          {this.renderSelect(
            'machineId',
            'Machine Id',
            this.state.machines,
            'machineId'
            )}
        </div>
    
        <div className="form-group">
          {this.renderInput(
            'rate',
            'Rate',
            'Enter the Machine Rate',
            null,
            null,
            null,
            null,
            null,
          )}
        </div>


        {this.renderButton('Add Rate', 'Add Rate', null, null)}
        {/* <button>Add Machine</button>    */}

      </form>
    </div>
    )
  }
}

export default AddInitialRates