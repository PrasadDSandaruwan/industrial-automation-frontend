import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi";
import Auth from "../../services/user/authService";
import Form from "../components/common/form";

export class EditAlarm extends Form {
  state = {
    nearestMachine: [
      { id: 1, name: "testing 01" },
      { id: 2, name: "testing 02" },
      { id: 3, name: "testing 03" },
      { id: 4, name: "testing 04" },
      { id: 5, name: "testing 05" },
    ],

    alarmName: [
      { id: 1, name: "Alarm 01" },
      { id: 2, name: "Alarm 02" },
      { id: 3, name: "Alarm 03" },
      { id: 4, name: "Alarm 04" },
      { id: 5, name: "Alarm 05" },
    ],

    slug: [
      { id: 1, name: "Slug 01" },
      { id: 2, name: "Slug 02" },
      { id: 3, name: "Slug 03" },
      { id: 4, name: "Slug 04" },
      { id: 5, name: "Slug 05" },
    ],

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

  doSubmit = async () => {
    const { alarm_name, slug, nearest_machine_id } = this.state.data;
  };

  render() {
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
                  {this.renderSelect(
                    "alarm_name",
                    "Alarm Name",
                    this.state.alarmName,
                    "name"
                  )}
                </div>
                <div className="form-group">
                  {this.renderSelect("slug", "Slug", this.state.slug, "name")}
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
