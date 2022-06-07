import React, { Component } from 'react'

class Select extends Component {
  render() {
    const {
      name,
      label,
      options,
      property,
      onChange,
      value,
      disabled = false,
    } = this.props
    var data = {}
    data.id = ''
    data[property] = 'None'
    var is_find = false

    if (options.length > 0) {
      if (options[0].id === '' && options[0][property] === 'None') {
        is_find = true
      }
    }
    if (!is_find) {
      options.unshift(data)
    }

    return (
      <React.Fragment>
        <div className="form-group">
          <label htmlFor={name}>{label}</label>
          <select
            className="form-control"
            id={name}
            onChange={(event) => onChange(event, name)}
            disabled={disabled}
          >
            {options.length > 0 &&
              options.map((option) => (
                <option
                  key={option.id}
                  value={option.id}
                  selected={option.id === value}
                >
                  {option[property]}
                </option>
              ))}
          </select>
        </div>
      </React.Fragment>
    )
  }
}
export default Select
