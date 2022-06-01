import React, { Component } from "react";
import ViewAllTable from "../components/common/viewAllTable";
import AlarmService from "../../services/admin/alarmService";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { confirm } from "react-confirm-box";

export class allalarms extends Component {
  state = {
    isRedirect: false,
    columnNames: ["id", "Alarm Name", "Slug", "Nearest Machine"],
    tableData: [],
  };

  componentDidMount = async () => {
    const tableData = [];
    try {
      const response = await AlarmService.getAllAlarm();

      if (response.status === 200) {
        if (response.data.code === 200) {
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
            this.setState({ tableData, isRedirect: false });
          }
        } else {
          this.setState({ isRedirect: true });
          toast.error("Error occured!");
        }
      } else {
        this.setState({ isRedirect: true });
        toast.error("Error occured!");
      }
    } catch (error) {
      this.setState({ isRedirect: true });
      toast.error("Error occured!");
    }
  };

  handleDelete = async (id) => {
    const result = await confirm("Are you sure ?");
    if (result) {
      try {
        const response = await AlarmService.deleteAlarm(id);
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
          } else {
            toast.error("Error occured!");
          }
        } else {
          toast.error("Error occured!");
        }
      } catch (error) {
        toast.error("Error occured!");
      }
    }
  };

  render() {
    if (this.state.isRedirect) return <Redirect to="/dasboard" />;
    return (
      <div className="allalarm">
        <h2>All Alarms</h2>
        <hr class="style2" />
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
