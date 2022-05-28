// import React from "react";

// function Profile() {
//   return <div>Profile</div>;
// }

// export default Profile;
import React from 'react'
import { Redirect } from 'react-router-dom'
import Joi, { date } from 'joi'
import Auth from '../../services/user/authService'
import Form from '../components/common/form'

export class Profile extends Form {
  state = {
    data: {
      // every input field, input name == state name
      userId: '',
      firstName: '',
      lastName:'',
      email:'',
      nic:'',
      birthDay:'',
      contactNo:'',
      userTypeId:'',
    },
    errors: {}, // is A must
  }

  // error handlling
  schema = Joi.object({
    userId: Joi.string() // string
      .required(), // required
    email:  Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }), // email
    firstName: Joi.string().required(), // string, required
    lasttName: Joi.string().required(),
    nic: Joi.string().required(),
    birthDay: Joi.date().required(),
    contactNo: Joi.string(),
    userTypeId:Joi.string().required(),
  })

  // must impliment this
  doSubmit = async () => {
    const { userId,email,firstName,lastName,nic,birthDay,contactNo, userTypeID } = this.state.data
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
  }

  render() {
    //
    // if (Auth.getCurrentUser()) return <Redirect to="/dasboard" />

    return (
      <div>
        <div className="az-signin-wrapper">
          <div className="az-card-signin">
            <h1 className="az-logo">
              New User form
            </h1>
            <div className="az-signin-header">
              {/* <h2>Welcome</h2> */}
              {/* <h4>Please sign in to continue</h4> */}
              <form>
                <div className="form-group">
                  {this.renderInput(
                    'userId',
                    'User Id',
                    'Enter user id',
                    null,
                    null,
                    null,
                    null,
                    null,
                  )}
                </div>
                <div className="form-group">
                  {this.renderInput(
                    'firstName',
                    'First Name',
                    'Enter first name',
                    null,
                    null,
                    null,
                    null,
                    null,
                  )}
                </div>
                <div className="form-group">
                  {this.renderInput(
                    'lastName',
                    'Last Name',
                    'Enter last name',
                    null,
                    null,
                    null,
                    null,
                    null,
                  )}
                </div>
                <div className="form-group">
                  {this.renderInput(
                    'email',
                    'Email',
                    'Enter email',
                    null,
                    null,
                    null,
                    null,
                    null,
                  )}
                </div>
                <div className="form-group">
                  {this.renderInput(
                    'nic',
                    'NIC',
                    'Enter NIC',
                    null,
                    null,
                    null,
                    null,
                    null,
                  )}
                </div>
                <div className="form-group">
                  {this.renderInput(
                    'birthDay',
                    'Birth Day',
                    'Enter birth day',
                    null,
                    null,
                    'date',
                    null,
                    null,
                  )}
                </div>
                <div className="form-group">
                  {this.renderInput(
                    'contactNo',
                    'Contact No',
                    'Enter contact no',
                    null,
                    null,
                    'tel',
                    null,
                    null,
                  )}
                </div>
                <div className="form-group">
                  {this.renderInput(
                    'userTypeId',
                    'User Type Id',
                    'Enter user type id',
                    null,
                    null,
                    null,
                    null,
                    null,
                  )}
                </div>
                {this.renderButton('Add User', 'Add User', null, null)}
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
