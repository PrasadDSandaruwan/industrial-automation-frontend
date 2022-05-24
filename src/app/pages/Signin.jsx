import React from 'react'
import { Redirect } from 'react-router-dom'
import Joi from 'joi'
import Auth from '../../services/user/authService'
import Form from '../components/common/form'

export class Signin extends Form {
  state = {
    data: {
      // every input field, input name == state name
      username: '',
      password: '',
    },
    errors: {}, // is A must
  }

  // error handlling
  schema = Joi.object({
    username: Joi.string() // string
      .required() // required
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }), // email
    password: Joi.string().required(), // string, required
  })

  // must impliment this
  doSubmit = async () => {
    const { username, password } = this.state.data
    try {
      const resposne = await Auth.login(username, password)
      Auth.loginWithJwt(resposne.data.access_token, resposne.data.refresh_token)
      window.location = '/dasboard'
    } catch (ex) {
      console.log('in catch')
      if (ex.response) {
        const errors = { ...this.state.errors }
        errors.username = ex.response.data.error_description
        this.setState({
          data: { username: '', password: '' },
          errors,
        })
      }
    }
  }

  render() {
    //
    if (Auth.getCurrentUser()) return <Redirect to="/dasboard" />

    return (
      <div>
        <div className="az-signin-wrapper">
          <div className="az-card-signin">
            <h1 className="az-logo">
              In<span>Auto</span>
            </h1>
            <div className="az-signin-header">
              <h2>Welcome</h2>
              <h4>Please sign in to continue</h4>
              <form>
                <div className="form-group">
                  {this.renderInput(
                    'username',
                    'Username',
                    'Enter your email',
                    null,
                    null,
                    null,
                    null,
                    null,
                  )}
                </div>
                <div className="form-group">
                  {this.renderInput(
                    'password',
                    'Paasword',
                    'Enter your password',
                    null,
                    null,
                    'password',
                    null,
                    null,
                  )}
                </div>
                {this.renderButton('Sign In', 'Sign In', null, null)}
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Signin
