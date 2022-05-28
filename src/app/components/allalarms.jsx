import React, { Component } from "react";
import ViewAllTable from "../components/common/viewAllTable";
import AlarmService from "../../services/admin/alarmService";

export class allalarms extends Component {
  state = {
    columnNames: ["id", "Alarm Name", "Slug", "Nearest Machine"],
    tableData: [],
  };

  componentDidMount = async () => {
    const response = await AlarmService.getAllAlarm();
    const tableData = [];
    console.log(response.data.data);
    const response_data = response.data.data;

    if (response_data.length > 0) {
      for (let i = 0; i < response_data.length; i++) {
        let row = {
          id: response_data[i].id,
          "Alarm Name": response_data[i].alarm_name,
          Slug: response_data[i].slug,
          "Nearest Machine": response_data[i].nearest_machine.name,
        };
        tableData.push(row);
      }
    }
    this.setState({ tableData });

    console.log("res_data", response_data);
  };

  handleDelete = async (id) => {
    alert("Are you sure ?");
    const response = AlarmService.deleteAlarm(id);
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

  render() {
    return (
      <div className="allalarm">
        <h2>All Alarms</h2>
        <ViewAllTable
          columnNames={this.state.columnNames}
          tableData={this.state.tableData}
          editURL="edit-alarm/"
          onDelete={this.handleDelete}
        />
      </div>
    );
  }
}
export default allalarms;
