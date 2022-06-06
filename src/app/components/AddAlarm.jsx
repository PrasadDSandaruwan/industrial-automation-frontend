import React from "react";
import Joi from "joi";
import Form from "../components/common/form";
import AlarmService from "../../services/admin/alarmService";
import MachineService from "../../services/admin/machineService";
import { toast } from "react-toastify";

export class AddAlarm extends Form {
  state = {
    nearestMachine: [],

    data: {
      // every input field, input name == state name
      alarm_name: "",
      slug: "",
      nearest_machine_id: 1,
    },

    errors: {},
  };

  schema = Joi.object({
    alarm_name: Joi.string().required(), // required
    slug: Joi.string().required(),
    nearest_machine_id: Joi.required(),
  });

  handleSlug = async (slug) => {
    try {
      const response = await AlarmService.checkIsUnique(slug);
      if (response.status === 200) {
        if (response.data.code === 200) {
          console.log("return true");
          return true;
        }
        return false;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  componentDidMount = async () => {
    try {
      const response = await MachineService.getAllMachines();
      console.log("All machines response data", response.data.data);
      if (response.status === 200) {
        if (response.data.code === 200) {
          this.setState({ nearestMachine: response.data.data });
        } else {
          toast.error(response.data.data);
        }
      }
    } catch (error) {
      toast.error("Error Occured!");
    }
  };

  doSubmit = async () => {
    try {
      const response = await AlarmService.addAlarm(this.state.data);

      if (response.status === 200) {
        if (response.data.code === 200) {
          const data = {
            // every input field, input name == state name
            alarm_name: "",
            slug: "",
            nearest_machine_id: 0,
          };
          this.setState({ data });

          toast.success(response.data.message);
        } else {
          //alert(response.data.message);
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error("Error Occured!");
    }
  };

  render() {
    return (
      <div>
        <div>
          <div className="az-signin-wrapper " style={{ minHeight: "500px" }}>
            <div
              className="az-card-signin"
              style={{ justifyItems: "normal", height: "auto", width: "600px" }}
            >
              <h4>Add Alarm</h4>
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
                {this.renderButton("Add Alarm", "Add Alarm", null, null)}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddAlarm;
