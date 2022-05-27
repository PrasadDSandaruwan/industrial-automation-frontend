import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi";
import Auth from "../../services/user/authService";
import Form from "../components/common/form";

export class EditNotifications extends Form {
  state = {
    data: {
      // every input field, input name == state name
      notificationname: "",
      soundtrack: "",
    },
    errors: {},
  };

  schema = Joi.object({
    notificationname: Joi.required(), // required
    slug: Joi.required(),
  });

  render() {
    return (
      <div>
        <div className="container p-md-0">
          <div className="az-content-body">
            <div className="az-dashboard-nav">
              <nav className="nav">
                <a
                  className="nav-link "
                  data-toggle="tab"
                  href="../Notifications"
                >
                  Add Notification
                </a>
                <a
                  className="nav-link active "
                  data-toggle="tab"
                  href="../EditNotifications"
                >
                  Edit Notification
                </a>

                <a className="nav-link" data-toggle="tab" href="#/">
                  More
                </a>
              </nav>
            </div>
          </div>
        </div>
        <div>
          <div className="az-signin-wrapper">
            <div className="az-card-signin">
              <h4>Edit Notifications</h4>
              <form>
                <div className="form-group">
                  {this.renderInput(
                    "notificationname",
                    "Notification Name",
                    "Enter Notification Name",
                    null,
                    null,
                    null,
                    "form-control",
                    null
                  )}
                </div>
                <div className="form-group">
                  {this.renderInput(
                    "soundtrack",
                    "Sound Track",
                    "Enter Sound Track",
                    null,
                    null,
                    null,
                    "form-control",
                    null
                  )}
                </div>
                {this.renderButton(
                  "Edit Notification",
                  "Edit Notification",
                  null,
                  null
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditNotifications;
