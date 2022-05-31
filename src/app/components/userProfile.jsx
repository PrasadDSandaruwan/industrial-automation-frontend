import React, { Component } from "react";
import { Route } from "react-router-dom";
import Joi, { date } from "joi";
import UserService from "../../services/user/userService";
import Form from "../components/common/form";
import userService from "../../services/user/userService";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

export class UserProfile extends Form {
  state = {
    user_type: [
      { id: 1, user_type_name: "Admin" },
      { id: 2, user_type_name: "User" },
    ],
    data: {
      first_name: "",
      last_name: "",
      birthday: "2022-12-12",
      email: "",
      nic: "",
      contact_no: "",
    },
    errors: {}, // is A must
    editable: false,
    user_data: [],
    isRedirect: false,
  };

  // error handlling
  schema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }), // email
    first_name: Joi.string().required(), // string, required
    last_name: Joi.string().required(),
    nic: Joi.string().required(),

    contact_no: Joi.string(),
    // type_id: Joi.number().required(),
  });

  componentDidMount = async () => {
    try {
      const response = await userService.getUserDetails();

      if (response.status === 200) {
        if (response.data.code === 200) {
          const data = {
            first_name: response.data.data.first_name,
            last_name: response.data.data.last_name,
            email: response.data.data.email,
            nic: response.data.data.nic,
            contact_no: response.data.data.contact_no,
          };
          this.setState({ data });
        } else {
          this.setState({ isRedirect: true });
          toast.error(response.data.message);
        }
      } else {
        this.setState({ isRedirect: true });
        toast.error(response.data.message);
      }
    } catch (ex) {
      this.setState({ isRedirect: true });
      toast.error("Error Occured!");
    }
  };

  // must impliment this
  doSubmit = async () => {
    try {
      const response = await UserService.updateUserProfile(this.state.data);

      if (response.status === 200) {
        if (response.data.code === 200) {
          this.setState({ editable: false });
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

  myFunction = (event) => {
    event.preventDefault();
    this.setState({ editable: true });
  };

  render() {
    if (this.state.isRedirect) return <Redirect to="/dasboard" />;
    return (
      <div>
        <div className="adding">
          <form action="#">
            <fieldset disabled={!this.state.editable}>
              <div className="form-group">
                {this.renderInput(
                  "first_name",
                  "First Name",
                  this.state.data.first_name,
                  null,
                  null,
                  null,
                  null,
                  null
                )}
              </div>
              <div className="form-group">
                {this.renderInput(
                  "last_name",
                  "Last Name",
                  this.state.data.last_name,
                  null,
                  null,
                  null,
                  null,
                  null
                )}
              </div>
              <fieldset disabled={true}>
                <div className="form-group" s>
                  {this.renderInput(
                    "email",
                    "Email",
                    this.state.data.email,
                    null,
                    null,
                    null,
                    null,
                    null
                  )}
                </div>

                <div className="form-group">
                  {this.renderInput(
                    "nic",
                    "NIC",
                    this.state.data.nic,
                    null,
                    null,
                    null,
                    null,
                    null
                  )}
                </div>
              </fieldset>
              <div className="form-group">
                {this.renderInput(
                  "contact_no",
                  "Contact No",
                  this.state.data.contact_no,
                  null,
                  null,
                  "tel",
                  null,
                  null
                )}
              </div>
            </fieldset>
            <div hidden={!this.state.editable}>
              {this.renderButton(
                "Update Details",
                "Update Details",
                null,
                null
              )}
            </div>
            <div hidden={this.state.editable}>
              <button onClick={this.myFunction}>Edit Details</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default UserProfile;
