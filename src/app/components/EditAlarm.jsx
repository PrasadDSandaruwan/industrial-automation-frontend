import React from "react";
import Joi from "joi";
import Form from "../components/common/form";
import MachineService from "../../services/admin/machineService";
import AlarmService from "../../services/admin/alarmService";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

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
      if (response.status === 200) {
        if (response.data.code === 200) {
          this.setState({
            nearestMachine: response.data.data,
            isRedirect: false,
          });
        } else {
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
        } else {
          alert(alarm_data.data.data);
          this.setState({ isRedirect: true });
        }
      } else {
        this.setState({ isRedirect: true });
      }
    } catch (error) {
      this.setState({ isRedirect: true });
      toast.error("Error Occured!");
    }
  };

  doSubmit = async () => {
    try {
      const response = await AlarmService.editAlarm(
        this.state.data,
        this.state.id
      );

      if (response.status === 200) {
        if (response.data.code === 200) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error occured!");
    }
  };

  render() {
    if (this.state.isRedirect) return <Redirect to="/alarms/all-alarms" />;
    return (
      <div>
        <div>
          <div className="az-signin-wrapper " style={{ minHeight: "500px" }}>
            <div
              className="az-card-signin"
              style={{ justifyItems: "normal", height: "auto" }}
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
