import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import Joi from "joi";
import Auth from "../../services/user/authService";
import Form from "../components/common/form";

export class AddAlarm extends Form {
  state = {
    data: {
      // every input field, input name == state name
      alarmname: "",
      slug: "",
      nearestmachineid: "",
    },
    errors: {},
  };

  schema = Joi.object({
    alarmname: Joi.string().required(), // required
    slug: Joi.string().required(),
    nearestmachineid: Joi.required(),
  });

  render() {
    return (
      <div>
        <div>
          <div className="az-signin-wrapper " style={{ minHeight: "600px" }}>
            <div
              className="az-card-signin"
              style={{ justifyItems: "normal", height: "450px" }}
            >
              <h4>Add Alarm</h4>
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
                    "slug",
                    "Slug",
                    "Enter Slug",
                    null,
                    null,
                    null,
                    "form-control",
                    null
                  )}
                </div>
                <div className="form-group">
                  {this.renderInput(
                    "nearestmachineid",
                    "Nearest Machine Id",
                    "Enter Machine ID",
                    null,
                    null,
                    null,
                    "form-control",
                    null
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
