import React, { Component } from "react";
import ViewAllTable from "../components/common/viewAllTable";
import userService from "../../services/user/userService";
import { toast } from "react-toastify";
import { confirm } from "react-confirm-box";
import { Redirect } from "react-router-dom";

export class ViewAllUsers extends Component {
  state = {
    columnNames: ["id", "first_name", "last_name", "email", "nic", "user_type"],
    tableData: [],
    isRedirect: false,
  };

  componentDidMount = async () => {
    const tableData = [];
    try {
      const response = await userService.getAllUsers();

      if (response.status === 200) {
        if (response.data.code === 200) {
          const response_data = response.data.data;

          if (response_data.length > 0) {
            for (let i = 0; i < response_data.length; i++) {
              let row = {
                id: response_data[i].id,
                first_name: response_data[i].first_name,
                last_name: response_data[i].last_name,
                email: response_data[i].email,
                nic: response_data[i].nic,
                user_type: response_data[i].user_type,
              };
              tableData.push(row);
            }
            this.setState({ tableData, isRedirect: false });
          }
        } else {
          this.setState({ isRedirect: true });
          toast.error(response.data.message);
        }
      } else {
        this.setState({ isRedirect: true });
        toast.error(response.data.message);
      }
    } catch (ex) {
      this.setState({ isRedirect: true });
      toast.error("Error Occured!");
    }
  };

  handleDelete = async (id) => {
    const result = await confirm("Are you sure ?");
    if (result) {
      try {
        const response = await userService.deleteUser(id);
        
        if (response.status === 200) {
          if (response.data.code === 200) {
            const data = [...this.state.tableData];
            const deleted = [];
            for (let i = 0; i < data.length; i++) {
              if (data[i].id !== id) {
                deleted.push(data[i]);
              }
            }
            this.setState({ tableData: deleted});
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Error Occured !");
      }
    }
  };

  render() {
    if(this.state.isRedirect) return <Redirect to="/dasboard"/>
    return (
      <div className="allmachine">
        <h2>All Machines</h2>
        <ViewAllTable
          hide={true}
          columnNames={this.state.columnNames}
          tableData={this.state.tableData}
          editURL="EDIT URL"
          onDelete={this.handleDelete}
        />
      </div>
    );
  }
}
export default ViewAllUsers;
