import React, {Component} from 'react'
import ViewAllTable from '../components/common/viewAllTable'

export class ViewAllMachine extends Component{
    state = {
        columnNames : ['id','test02', 'test03','test04','test05'],
        tableData : [
            {
                id : '01',
                test02 : 'testdata02',
                test03 : 'testdata03',
                test04 : 'testdata04',
                test05 : 'testdata05',
            },
            {
                id : '02',
                test02 : 'testdata02',
                test03 : 'testdata03',
                test04 : 'testdata04',
                test05 : 'testdata05',
            },
            {
                id : '03',
                test02 : 'testdata02',
                test03 : 'testdata03',
                test04 : 'testdata04',
                test05 : 'testdata05',
            },
            {
                id : '04',
                test02 : 'testdata02',
                test03 : 'testdata03',
                test04 : 'testdata04',
                test05 : 'testdata05',
            },
            {
                id : '05',
                test02 : 'testdata02',
                test03 : 'testdata03',
                test04 : 'testdata04',
                test05 : 'testdata05',
            }
        ]

        

    }

    handleDelete = (id) => {

        console.log("testing " + id)
    }

    render(){
        return(
            <div className="allmachine">
                <h2>All Machines</h2>
                <ViewAllTable 
                    columnNames = {this.state.columnNames}
                    tableData = {this.state.tableData}
                    editURL = "EDIT URL"
                    onDelete = {this.handleDelete}
                />
            </div>
        )
    }
}
export default ViewAllMachine