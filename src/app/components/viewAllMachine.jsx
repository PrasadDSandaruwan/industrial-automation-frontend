import React, { Component } from "react";
import ViewAllTable from "../components/common/viewAllTable";
import MachineService from "../../services/admin/machineService";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { confirm } from "react-confirm-box";

export class ViewAllMachine extends Component {
  state = {
    columnNames: [
      "id",
      "Production_Line",
      "Machine_Name",
      "Machine_Type",
      "Slug",
      "License_Number",
      "Is_Automated",
    ],
    tableData: [],
    isRedirect: false,
  };

  componentDidMount = async () => {
    try {
      const response = await MachineService.getAllMachines();

      if (response.status === 200) {
        if (response.data.code === 200) {
          const tableData = [];

          const response_data = response.data.data;

          if (response_data.length > 0) {
            for (let i = 0; i < response_data.length; i++) {
              let row = {
                id: response_data[i].id,
                Production_Line: response_data[i].production_line.line_name,
                Machine_Name: response_data[i].name,
                Machine_Type: response_data[i].machine_type.machine_type_name,
                Slug: response_data[i].slug,
                License_Number: response_data[i].license_number,
                Is_Automated: response_data[i].is_automated ? "Yes" : "No",
              };
              tableData.push(row);
            }
          }
          this.setState({ tableData, isRedirect: false });
        } else {
          this.setState({ isRedirect: true });
          toast.error(response.data.message);
        }
      } else {
        this.setState({ isRedirect: true });
        toast.error(response.data.message);
      }
    } catch (error) {
      this.setState({ isRedirect: true });
      toast.error("Error Occured");
    }
  };

  handleDelete = async (id) => {
    const result = await confirm("Are you Sure?");
    if (result) {
      try {
        const response = await MachineService.deleteMachine(id);
        toast.success(response.data.message);
        if (response.status === 200) {
          if (response.data.code === 200) {
            const data = [...this.state.tableData];
            const deleted = [];
            for (let i = 0; i < data.length; i++) {
              if (data[i].id !== id) {
                deleted.push(data[i]);
              }
            }
            this.setState({ tableData: deleted });
          }
        }
      } catch (error) {
        toast.error("Error Occured!");
      }
    }
  };

  render() {
    if (this.state.isRedirect) return <Redirect to="/dasboard" />;
    return (
      <div className="allmachines">
        <h2>All Machines</h2>
        <hr class="style2" />
        <ViewAllTable
          columnNames={this.state.columnNames}
          tableData={this.state.tableData}
          editURL="edit-machine-details/"
          onDelete={this.handleDelete}
        />
      </div>
    );
  }
}
export default ViewAllMachine;
