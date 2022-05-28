import React from "react";
import Joi from "joi";
import Auth from "../../services/user/authService";
import Form from "../components/common/form";
import MachineService from "../../services/admin/machineService";
import AlarmService from "../../services/admin/alarmService";
import { Redirect } from "react-router-dom";

export class EditAlarm extends Form {
  state = {
    isRedirect: false,

    nearestMachine: [],

    id: 1,

    data: {
      // every input field, input name == state name
      alarm_name: "",
      slug: "",
      nearest_machine_id: "",
    },

    errors: {},
  };

  schema = Joi.object({
    alarm_name: Joi.required(), // required
    slug: Joi.required(),
    nearest_machine_id: Joi.required(),
  });

  componentDidMount = async () => {
    try {
      const id = this.props.match.params.id;
      this.setState({ id });
      const alarm_data = await AlarmService.getAlarmDetails(id);
      const response = await MachineService.getAllMachines();
      console.log("All machines response data", response.data.data);
      if (response.status === 200) {
        if (response.data.code === 200) {
          this.setState({
            nearestMachine: response.data.data,
            isRedirect: false,
          });
          console.log(response.data.data);
        } else {
          alert(response.data.data);
          this.setState({ isRedirect: true });
        }
      } else {
        this.setState({ isRedirect: true });
      }
      if (alarm_data.status === 200) {
        if (alarm_data.data.code === 200) {
          const data = { ...this.state.data };
          data.alarm_name = alarm_data.data.data.alarm_name;
          data.slug = alarm_data.data.data.slug;
          data.nearest_machine_id = alarm_data.data.data.nearest_machine.id;
          this.setState({ data, isRedirect: false });
          console.log(alarm_data.data.data);
        } else {
          alert(alarm_data.data.data);
          this.setState({ isRedirect: true });
        }
      } else {
        this.setState({ isRedirect: true });
      }
    } catch (error) {
      console.log("Error", error);
      alert("Error Occured!");
      this.setState({ isRedirect: true });
    }
  };

  doSubmit = async () => {
    try {
      const response = await AlarmService.editAlarm(
        this.state.data,
        this.state.id
      );
      console.log("succesful");
      if (response.status === 200) {
        if (response.data.code === 200) {
          alert(response.data.message);
        } else {
          alert(response.data.message);
        }
      }
    } catch (error) {
      alert("Error occured!");
      console.log("Error", error);
    }
  };

  render() {
    if (this.state.isRedirect) return <Redirect to="/alarms/all-alarms" />;
    return (
      <div>
        <div>
          <div className="az-signin-wrapper " style={{ minHeight: "600px" }}>
            <div
              className="az-card-signin"
              style={{ justifyItems: "normal", height: "450px" }}
            >
              <h4>Edit Alarm</h4>
              <form>
                <div className="form-group">
                  {this.renderInput(
                    "alarm_name",
                    "Alarm Name",
                    "Enter Alarm Name",
                    null,
                    null,
                    null,
                    null,
                    null
                  )}
                </div>
                <div className="form-group">
                  {this.renderInput(
                    "slug",
                    "Slug",
                    "Enter Slug",
                    null,
                    null,
                    null,
                    null,
                    null
                  )}
                </div>
                <div className="form-group">
                  {this.renderSelect(
                    "nearest_machine_id",
                    "Nearest Machine ID",
                    this.state.nearestMachine,
                    "name"
                  )}
                </div>
                {this.renderButton("Edit Alarm", "Edit Alarm", null, null)}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditAlarm;
