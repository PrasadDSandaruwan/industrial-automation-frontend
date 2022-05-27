import React, { Component } from 'react'
import Joi, { errors } from 'joi'
import Input from './input'
import Button from './button'
import Select from './select'

class Form extends Component {
  state = {
    data: {},
    errors: {},
  }

  handleSubmit = async (event) => {
    console.log('handleSubmit', this.state.data)
    event.preventDefault()
    const errors = this.validate()
    this.setState({ errors: errors || {} })
    console.log('eros in handleSubmit', errors)
    if (errors) return
    await this.doSubmit()
  }

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors }
    const errorMessage = this.validateProperty(input)
    if (errorMessage) errors[input.name] = errorMessage
    else delete errors[input.name]
    console.log(input)

    const data = { ...this.state.data }
    data[input.name] = input.value

    this.setState({ data, errors })
    console.log(this.state.data)
  }

  handleChangeSelect = (event, name) => {
    const data = { ...this.state.data }
    data[name] = event.target.value

    this.setState({ data })
    console.log(this.state.data)
    
  }

  validate = () => {
    const result = this.schema.validate(this.state.data, {
      abortEarly: false,
    })

    if (!result.error) return null

    const errors = {}
    for (let item of result.error.details) errors[item.path[0]] = item.message

    console.log(errors)
    return errors
  }

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value }

    const rule = this.schema.extract(name)
    const schema = Joi.object({ [name]: rule })

    const { error } = schema.validate(obj)

    return error ? error.details[0].message : null
  }

  renderInput = (
    name, // name
    label, // lable name
    placeHolder,
    classInput,
    classLabel,
    type = 'text',
    disabled = false,
    hideError = false,
  ) => {
    const { data, errors } = this.state
    return (
      <Input
        name={name}
        label={label}
        value={data[name]}
        error={errors[name]}
        placeholder={placeHolder}
        type={type}
        onChange={this.handleChange}
        disabled={disabled}
        hideError={hideError}
        classInput={classInput}
        classLabel={classLabel}
      />
    )
  }

  renderButton = (name, label, classButton, classIcon) => {
    return (
      <Button
        name={name}
        label={label}
        classButton={classButton}
        classIcon={classIcon}
        onClick={this.handleSubmit}
        disabled={this.validate()}
      />
    )
  }

  renderSelect = (name, label, options, property) => {
    const {data} = this.state
    return(
      <Select
        name = {name}
        label = {label}
        options = {options}
        property = {property}
        onChange = {this.handleChangeSelect}
        value = {data[name]}
      />

    )
  }

  // renderSelect(valueProperty, name, className, options, disabled = false) {
  //     const {data, errors} = this.state;
  //     //console.log("options", options);
  //     //console.log("render select", name, data)

  //     return (
  //         <Select
  //             valueProperty={valueProperty}
  //             name={name}
  //             className={className}
  //             value={data[name]}
  //             options={options}
  //             onChange={(e) => {
  //                 this.handleChange(e)
  //             }}
  //             error={errors[name]}
  //             disabled={disabled}
  //         />
  //     );
  // }

  // renderSelect = (valueProperty, name, className, options, disabled = false) => {
  //   const {data, errors} = this.state;
  //   //console.log("options", options);
  //   //console.log("render select", name, data)

  //    return (
  //       <Select
  //           valueProperty={valueProperty}
  //           name={name}
  //           className={className}
  //           value={data[name]}
  //           options={options}
  //           onChange={(e) => {
  //             this.handleChange(e)
  //           }}
  //           error={errors[name]}
  //           disabled={disabled}
  //       />
  //   );
  // }
}

export default Form
