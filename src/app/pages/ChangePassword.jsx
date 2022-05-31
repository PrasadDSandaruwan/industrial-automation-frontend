import React from "react";
import Joi from "joi";
import Form from "../components/common/form";
import userService from "../../services/user/userService";
import { toast } from "react-toastify";


export class ChangePassword extends Form {
  state = {
    data: {
      new_password: "",
      old_password: "",
      confirm_password: "",
    },
    errors: {}, // is A must

  };

  // error handlling
  schema = Joi.object({
    new_password: Joi.string().required(), // string, required
    old_password: Joi.string().required(),
    confirm_password: Joi.string().required(),
  });

  // must impliment this
  doSubmit = async () => {
    const { password } = this.state.data;
    try {
      const response = await userService.changePassword(this.state.data);
      if (response.status === 200) {
        if (response.data.code === 200) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } else {
        toast.error(response.data.message);
      }
      
    } catch (ex) {
      toast.error("Error Occured!");
    }
  };

  render() {
    return (
      <div class="adding">
        <h2>Enter New Password Here</h2>
        <form>
          <div className="form-group">
            {this.renderInput(
              "old_password",
              "Old Password",
              "Enter old password",
              null,
              null,
              "password",
              null,
              null
            )}
          </div>
          <div className="form-group">
            {this.renderInput(
              "new_password",
              "New Password",
              "Enter your new password",
              null,
              null,
              "password",
              null,
              null
            )}
          </div>
          <div className="form-group">
            {this.renderInput(
              "confirm_password",
              "Confirm Password",
              "Confirm your password",
              null,
              null,
              "password",
              null,
              null
            )}
          </div>
          {this.renderButton("Change Password", "Change Password", null, null)}
        </form>
      </div>
      // </div>
      // </div>
      // </div>
    );
  }
}

export default ChangePassword;
