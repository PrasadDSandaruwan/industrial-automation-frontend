import React, { Component } from 'react'

class Input extends Component {
  render() {
    const {
      name,
      label,
      classInput,
      classLabel,
      error,
      onChange,
      hideError = false,
      disabled,
      ...rest
    } = this.props

    return (
      <React.Fragment>
        <div className="form-group">
          <label htmlFor={name} className={classLabel ? classLabel : ''}>
            {label}
          </label>
        </div>

        <input
          {...rest}
          name={name}
          id={name}
          onChange={onChange}
          disabled={disabled}
          className={classInput ? classInput : 'form-control'}
        />
        {error && !hideError && (
          <div className="alert alert-danger">{error}</div>
        )}
      </React.Fragment>
    )
  }
}

export default Input
