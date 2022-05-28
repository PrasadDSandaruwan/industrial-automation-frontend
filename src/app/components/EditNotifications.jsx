import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi";
import Auth from "../../services/user/authService";
import Form from "../components/common/form";

export class EditNotifications extends Form {
  state = {
    soundTrack: [
      { id: 1, name: "Sound 01" },
      { id: 2, name: "Sound 02" },
      { id: 3, name: "Sound 03" },
      { id: 4, name: "Sound 04" },
      { id: 5, name: "Sound 05" },
    ],

    notificationName: [
      { id: 1, name: "Notification 01" },
      { id: 2, name: "Notification 02" },
      { id: 3, name: "Notification 03" },
      { id: 4, name: "Notification 04" },
      { id: 5, name: "Notification 05" },
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
      notification_name: "",
      slug: "",
      sound_track: "",
    },

    errors: {},
  };

  schema = Joi.object({
    notification_name: Joi.required(), // required
    slug: Joi.required(),
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
              <h4>Edit Notifications</h4>
              <form>
                <div className="form-group">
                  {this.renderSelect(
                    "notification_name",
                    "Notification Name",
                    this.state.notificationName,
                    "name"
                  )}
                </div>
                <div className="form-group">
                  {this.renderSelect("slug", "Slug", this.state.slug, "name")}
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
