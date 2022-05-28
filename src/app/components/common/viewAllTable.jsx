import React, { Component } from 'react'
import { Link, useParams } from 'react-router-dom'

class ViewAllTable extends Component{
    
    render(){
        const {
            columnNames,
            tableData,
            editURL,
            onDelete
        } = this.props
    
    
        
    return(
        
        <React.Fragment>

            <table className="table table-hover table-primary">
                <thead className="thead-dark">
                    <tr>
                    {columnNames.length > 0 && columnNames.map(name => (
                        <th key={name} >
                            <h6>{name}</h6>
                        </th>
                    ))}

                    <th>
                        <h6>Edit</h6>
                    </th>

                    <th>
                        <h6>Delete</h6>
                    </th>

                    </tr>

                   

                </thead>
                <tbody>
                    {tableData.length > 0 && tableData.map(data => (
                                <tr key={data.id} >
                                     {columnNames.length > 0 && columnNames.map(name => (
                                        <td key={name + data.id} >
                                            {data[name]}
                                        </td>
                                    ))}
                                    <td>
                                        <Link to={editURL + data.id}  className = "btn btn-primary btn-sm" role="button" >Edit</Link>    
                                    </td>

                                    <td>
                                        <button type='submit' className='btn btn-danger btn-sm' onClick={() => onDelete(data.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))} 

                </tbody>
            </table>

            
        </React.Fragment>
    )
}

}
export default ViewAllTable