import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi";
import Auth from "../../services/user/authService";
import Form from "../components/common/form";

export class EditAlarm extends Form {
  state = {
    data: {
      // every input field, input name == state name
      alarmname: "",
      alarmvolumn: "",
      voicetype: "",
    },
    errors: {},
  };

  schema = Joi.object({
    alarmname: Joi.string().required(), // required
    alarmvolumn: Joi.required(),
    voicetype: Joi.required(),
  });

  render() {
    return (
      <div>
        <div>
          <div className="az-signin-wrapper">
            <div className="az-card-signin">
              <h4>Edit Alarm</h4>
              <form>
                <div className="form-group">
                  {this.renderInput(
                    "alarmname",
                    "Alarm Name",
                    "Enter Alarm Name",
                    null,
                    null,
                    null,
                    "form-control",
                    null
                  )}
                </div>
                <div className="form-group">
                  {this.renderInput(
                    "alarmvolumn",
                    "Alarm Volumn",
                    "Enter Alarm Volumn",
                    null,
                    null,
                    null,
                    "form-control",
                    null
                  )}
                </div>
                <div className="form-group">
                  {this.renderInput(
                    "voicetype",
                    "Voice Type",
                    "Enter Voice Type",
                    null,
                    null,
                    null,
                    "form-control",
                    null
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
