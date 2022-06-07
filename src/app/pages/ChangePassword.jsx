import React from 'react'
import Joi from 'joi'
import Form from '../components/common/form'
import userService from '../../services/user/userService'
import { toast } from 'react-toastify'

export class ChangePassword extends Form {
  state = {
    data: {
      new_password: '',
      old_password: '',
      confirm_password: '',
    },
    errors: {},
  }

  schema = Joi.object({
    old_password: Joi.string().required(),
    new_password: Joi.string()
      .required()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .message('Passowrd is not strong enough'),
    confirm_password: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (value !== this.state.data.new_password) {
          return helpers.message("Password isn't match")
        }
        return value
      })
      .messages({ 'string.empty': 'Confirm password not allowed to be empty' }),
  })

  doSubmit = async () => {
    const { password } = this.state.data
    try {
      const response = await userService.changePassword(this.state.data)
      if (response.status === 200) {
        if (response.data.code === 200) {
          toast.success(response.data.message)
        } else {
          toast.error(response.data.message)
        }
      } else {
        toast.error(response.data.message)
      }
    } catch (ex) {
      toast.error('Error Occured!')
    }
  }

  render() {
    return (
      <div>
        <div>
          <div className="az-signin-wrapper " style={{ minHeight: '500px' }}>
            <div
              className="az-card-signin"
              style={{ justifyItems: 'normal', height: 'auto', width: '600px' }}
            >
              <h4>Change Password</h4>
              <form>
                <div className="form-group">
                  {this.renderInput(
                    'old_password',
                    'Old Password',
                    'Enter old password',
                    null,
                    null,
                    'password',
                    null,
                    null,
                  )}
                </div>
                <div className="form-group">
                  {this.renderInput(
                    'new_password',
                    'New Password',
                    'Enter your new password',
                    null,
                    null,
                    'password',
                    null,
                    null,
                  )}
                </div>
                <div className="form-group">
                  {this.renderInput(
                    'confirm_password',
                    'Confirm Password',
                    'Confirm your password',
                    null,
                    null,
                    'password',
                    null,
                    null,
                  )}
                </div>
                {this.renderButton(
                  'Change Password',
                  'Change Password',
                  null,
                  null,
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ChangePassword
