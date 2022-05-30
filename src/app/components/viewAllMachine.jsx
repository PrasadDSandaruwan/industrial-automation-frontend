import React, {Component} from 'react'
import ViewAllTable from '../components/common/viewAllTable'
import EditMachine from '../components/EditMachine'
import { Route } from 'react-router-dom'
import MachineService from '../../services/admin/machineService'

export class ViewAllMachine extends Component{
    state = {
        columnNames : ['id','Production_Line', 'Machine_Name', 'Machine_Type', 'Slug', 'License_Number','Is_Automated'],
        tableData : [],
    }

    componentDidMount = async () => {
        const response = await MachineService.getAllMachines() ;
        const tableData = [];
        console.log(response.data.data);
        const response_data = response.data.data;
    
        if (response_data.length > 0) {
          for (let i = 0; i < response_data.length; i++) {
            let row = {
                id : response_data[i].id,
                Production_Line: response_data[i].production_line.line_name,
                "Machine_Name": response_data[i].name,
                Machine_Type : response_data[i].machine_type.machine_type_name,
                Slug: response_data[i].slug,
                License_Number : response_data[i].license_number,
                Is_Automated : response_data[i].is_automated ? 'Yes' : 'No',                
            };
            tableData.push(row);
          }
        }
        this.setState({ tableData });
    
        console.log("res_data", response_data);
      };

      handleDelete = async (id) => {
        alert("Are you sure ?");
        const response = MachineService.deleteMachine(id);
        const data = [...this.state.tableData];
        const deleted = [];
        for (let i = 0; i < data.length; i++) {
          console.log(data[i].id);
          console.log(id);
          console.log(data[i].id !== id);
          if (data[i].id !== id) {
            deleted.push(data[i]);
          }
        }
        this.setState({ tableData: deleted });
        console.log("testing " + id);
      };

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
               
            </div>
            </div>
           

        )
    }
}
export default ViewAllMachine