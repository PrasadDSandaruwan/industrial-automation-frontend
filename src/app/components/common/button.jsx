import React, { Component } from 'react'

class Button extends Component {
  state = {}

  render() {
    const {
      classButton,
      classIcon,
      label,
      onClick,
      disabled = false,
    } = this.props
    return (
      <React.Fragment>
        <button
          onClick={onClick}
          type="submit"
          className={classButton ? classButton : 'btn btn-az-primary btn-block'}
          disabled={disabled}
        >
          {classIcon ? <i className={classIcon}></i> : null} {label}
        </button>
      </React.Fragment>
    )
  }
}

export default Button
