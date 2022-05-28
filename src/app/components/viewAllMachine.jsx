import React, {Component} from 'react'
import ViewAllTable from '../components/common/viewAllTable'
import EditMachine from '../components/EditMachine'
import { Route } from 'react-router-dom'

export class ViewAllMachine extends Component{
    state = {
        columnNames : ['id','Production_Line', 'Machine_Name','License_Number','Is_Automated'],
        tableData : [
            {
                id : '01',
                Production_Line : 'testdata02',
                Machine_Name : 'testdata03',
                License_Number : 'testdata04',
                Is_Automated : 'testdata05',
            },
            {
                id : '02',
                Production_Line : 'testdata02',
                Machine_Name : 'testdata03',
                License_Number : 'testdata04',
                Is_Automated : 'testdata05',
            },
            {
                id : '03',
                Production_Line : 'testdata02',
                Machine_Name : 'testdata03',
                License_Number : 'testdata04',
                Is_Automated : 'testdata05',
            },
            {
                id : '04',
                Production_Line : 'testdata02',
                Machine_Name : 'testdata03',
                License_Number : 'testdata04',
                Is_Automated : 'testdata05',
            },
            {
                id : '05',
                Production_Line : 'testdata02',
                Machine_Name : 'testdata03',
                License_Number : 'testdata04',
                Is_Automated : 'testdata05',
            }
        ]

        

    }

    handleDelete = (id) => {

        console.log("testing " + id)
    }

    render(){
        return(
            <div class="table-responsive">
            <div className="allmachine machine-table">
                <h2 className='py-3'>All Machines</h2>
                <ViewAllTable 
                    columnNames = {this.state.columnNames}
                    tableData = {this.state.tableData}
                    editURL = 'edit-machine-details/'
                    onDelete = {this.handleDelete}
                />
                <Route exact path="/machines/edit-machine-details/:id"><EditMachine/></Route>
            </div>
            </div>
           

        )
    }
}
export default ViewAllMachine