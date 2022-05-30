import React from "react";
import { Redirect } from "react-router-dom";
import Joi, { date } from "joi";
import Auth from "../../services/user/authService";
import Form from "../components/common/form";

export class AddUser extends Form {
  state = {
    user_type: [
      { id: 1, name: "testing 01" },
      { id: 2, name: "testing 02" },
      { id: 3, name: "testing 03" },
      { id: 4, name: "testing 04" },
      { id: 5, name: "testing 05" },
    ],
    data: {
      // every input field, input name == state name

      first_name: "",
      last_name: "",
      email: "",
      nic: "",
      birthDay: "",
      contactNo: "",
      userTypeId: 1,
    },
    errors: {}, // is A must
  };

  // error handlling
  schema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }), // email
    firstName: Joi.string().required(), // string, required
    lasttName: Joi.string().required(),
    nic: Joi.string().required(),
    birthDay: Joi.date().required(),
    contactNo: Joi.string(),
    userTypeId: Joi.string().required(),
  });

  // must impliment this
  doSubmit = async () => {
    const {
      userId,
      email,
      firstName,
      lastName,
      nic,
      birthDay,
      contactNo,
      userTypeID,
    } = this.state.data;
    try {
      // const resposne = await Auth.login(username, password)
      //   Auth.loginWithJwt(resposne.data.access_token, resposne.data.refresh_token)
      //   window.location = '/dasboard'
    } catch (ex) {
      //   console.log('in catch')
      //   if (ex.response) {
      //     const errors = { ...this.state.errors }
      //     errors.username = ex.response.data.error_description
      //     this.setState({
      //       data: { username: '', password: '' },
      //       errors,
      //     })
      // }
    }
  };

  render() {
    //
    // if (Auth.getCurrentUser()) return <Redirect to="/dasboard" />

    return (
      <div className="adding">
        <h2>New User form</h2>
        {/* <div className="az-signin-header"> */}
        {/* <h2>Welcome</h2> */}
        {/* <h4>Please sign in to continue</h4> */}
        <form action="#">
          <div className="form-group">
            {this.renderInput(
              "userId",
              "User Id",
              "Enter user id",
              null,
              null,
              null,
              null,
              null
            )}
          </div>
          <div className="form-group">
            {this.renderInput(
              "firstName",
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
              "lastName",
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
              "birthDay",
              "Birth Day",
              "Enter birth day",
              null,
              null,
              "date",
              null,
              null
            )}
          </div>
          <div className="form-group">
            {this.renderInput(
              "contactNo",
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
              "userTypeId",
              "User Type Id",
              this.state.user_type,
              'name'
            )}
          </div>
          {this.renderButton("Add User", "Add User", null, null)}
        </form>
      </div>
      //   </div>
      // </div>
      //   </div>
    );
  }
}

export default AddUser;