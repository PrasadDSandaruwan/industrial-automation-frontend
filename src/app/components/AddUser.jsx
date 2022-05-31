import React from "react";
import Joi, { date, x } from "joi";
import Form from "../components/common/form";
import UserService from "../../services/user/userService";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

export class AddUser extends Form {
  state = {
    user_type: [
      { id: 1, user_type_name: "Admin" },
      { id: 2, user_type_name: "User" },
    ],
    data: {
      first_name: "",
      last_name: "",
      email: "",
      nic: "",

      contact_no: "",
      type_id: 1,
    },
    errors: {}, // is A must
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
    type_id: Joi.number().required(),
  });

  // must impliment this
  doSubmit = async () => {
    try {
      const response = await UserService.addUser(this.state.data);

      if (response.status === 200) {
        if (response.data.code === 200) {
          const data = {
            first_name: "",
            last_name: "",
            email: "",
            nic: "",
            contact_no: "",
            type_id: 1,
          };
          this.setState({ data });
          toast.success(response.data.message);
        } else {
          this.setState({ isRedirect: false });
          toast.error(response.data.message);
        }
      } else {
        this.setState({ isRedirect: false });
        toast.error(response.data.message);
      }
    } catch (ex) {
      this.setState({ isRedirect: false });
      toast.error("Error Occured!");
    }
  };

  render() {
    if(this.state.isRedirect) return <Redirect to="/dasboard"/>
    return (
      <div className="adding">
        <h2>New User form</h2>
        <form action="#">
          <div className="form-group">
            {this.renderInput(
              "first_name",
              "First Name",
              "Enter first name",
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
              "Enter last name",
              null,
              null,
              null,
              null,
              null
            )}
          </div>
          <div className="form-group">
            {this.renderInput(
              "email",
              "Email",
              "Enter email",
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
              "Enter NIC",
              null,
              null,
              null,
              null,
              null
            )}
          </div>

          <div className="form-group">
            {this.renderInput(
              "contact_no",
              "Contact No",
              "Enter contact no",
              null,
              null,
              "tel",
              null,
              null
            )}
          </div>
          <div className="form-group">
            {this.renderSelect(
              "type_id",
              "Type Id",
              this.state.user_type,
              "user_type_name"
            )}
          </div>
          {this.renderButton("Add User", "Add User", null, null)}
        </form>
      </div>
    );
  }
}

export default AddUser;
