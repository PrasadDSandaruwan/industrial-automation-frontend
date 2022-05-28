import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi";
import Auth from "../../services/user/authService";
import Form from "../components/common/form";

export class Notifications extends Form {
  state = {
    soundTrack: [
      { id: 1, name: "Sound 01" },
      { id: 2, name: "Sound 02" },
      { id: 3, name: "Sound 03" },
      { id: 4, name: "Sound 04" },
      { id: 5, name: "Sound 05" },
    ],

    data: {
      // every input field, input name == state name
      notification_name: "",
      slug: "",
      sound_track: "",
    },

    errors: {},
  };

  schema = Joi.object({
    notification_name: Joi.string().required(), // required
    slug: Joi.string().required(),
    sound_track: Joi.required(),
  });

  doSubmit = async () => {
    const { notification_name, slug, sound_track } = this.state.data;
  };

  render() {
    return (
      <div>
        <div>
          <div className="az-signin-wrapper" style={{ minHeight: "600px" }}>
            <div
              className="az-card-signin"
              style={{ justifyItems: "normal", height: "450px" }}
            >
              <h4>Add Notifications</h4>
              <form>
                <div className="form-group">
                  {this.renderInput(
                    "notification_name",
                    "Notification Name",
                    "Enter Notification Name",
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
                    "sound_track",
                    "Sound Track",
                    this.state.soundTrack,
                    "name"
                  )}
                </div>
                {this.renderButton(
                  "Add Notification",
                  "Add Notification",
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

export default Notifications;
