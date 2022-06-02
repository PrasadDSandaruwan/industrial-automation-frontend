import React from "react";
import Joi from "joi";
import Form from "./common/form";
import UserService from "../../services/user/userService";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import Auth from "../../services/user/authService";

export class ForcePasswordChange extends Form {
  state = {
    data: {
      new_password: "",
      confirm_password: "",
    },
    errors: {}, // is A must
    isRedirect: false,
  };

  // error handlling
  schema = Joi.object({
    new_password: Joi.string().required(), // string, required
    confirm_password: Joi.string().required(),
  });

  // must impliment this
  doSubmit = async () => {
    // const { password } = this.state.data;
    console.log("inside do submit");
    try {
      const response = await UserService.forceChangePassword(this.state.data);
      console.log("response", response);
      if (response.status === 200) {
        if (response.data.code === 200) {
          // this.setState({isRedirect:true})
          toast.success(response.data.message);
          Auth.setForcePassword("VERIFIED_USER");
          window.location = "/dasboard";
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
    if (Auth.getForcePassword() === "VERIFIED_USER")
      return <Redirect to="/dasboard" />;
    return (
      <div>
        <div>
          <div className="az-signin-wrapper " style={{ minHeight: "500px" }}>
            <div
              className="az-card-signin"
              style={{ justifyItems: "normal", height: "auto", width: "600px" }}
            >
              <h4>Force Change Password</h4>
              <form>
                <div className="form-group">
                  {this.renderInput(
                    "new_password",
                    "New Password",
                    "Enter your password",
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
                    "Enter confirm password",
                    null,
                    null,
                    "password",
                    null,
                    null
                  )}
                </div>
                {this.renderButton(
                  "Change Password",
                  "Change Password",
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

export default ForcePasswordChange;
