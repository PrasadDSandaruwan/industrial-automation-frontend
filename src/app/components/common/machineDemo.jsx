//name
//id
//init_rate
//init_temp
//rate
//temp
//command
//message

import React from "react";
import Joi from "joi";
import Form from "./form";
import machineService from "../../../services/admin/machineService";
import { toast } from "react-toastify";

export class MachineDemo extends Form {
  state = {
    data: {
      //every input field name == state name
      name: "",
      id: 1,
      init_rate: 1,
      init_temp: 1,
      rate: 1,
      temp: 1,
      command: "",
      massage: "",
      command_type: "",
    },
    errors: {},
  };

  componentDidMount = () => {
    // const data = {...this.state.data};
    const data = this.props;
    this.setState({ data });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps });
  }

  render() {
    return (
      <div style={{ width: "auto", height: "auto" }}>
        <h2 className="py-3">Machine Demo</h2>

        <form action="#">
          <div class="form-row">
            <div className="form-group col-md-4">
              {this.renderInput(
                "id",
                "Machine ID",
                "",
                null,
                null,
                null,
                true,
                null
              )}
            </div>
            <div className="form-group col-md-8">
              {this.renderInput(
                "name",
                "Machine Name",
                "",
                null,
                null,
                null,
                true,
                null
              )}
            </div>
          </div>
          <div className="row">
            <div className="row col-md-6 d-flex align-items-center justify-content-center">
              <h6>Rate</h6>
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <h6>Temperature</h6>
            </div>
          </div>
          <div class="form-row">
            <div className="form-group col-md-3">
              {this.renderInput(
                "init_rate",
                "Initial",
                "",
                null,
                null,
                null,
                true,
                null
              )}
            </div>
            <div className="form-group col-md-3">
              {this.renderInput(
                "rate",
                "Current",
                "",
                null,
                null,
                null,
                true,
                null
              )}
            </div>
            <div className="form-group col-md-3">
              {this.renderInput(
                "init_temp",
                "Initial",
                "",
                null,
                null,
                null,
                true,
                null
              )}
            </div>

            <div className="form-group col-md-3">
              {this.renderInput(
                "temp",
                "Current",
                "",
                null,
                null,
                null,
                true,
                null
              )}
            </div>
          </div>
          <div className="form-group">
            {this.renderInput(
              "command",
              "Command",
              "",
              null,
              null,
              null,
              true,
              null
            )}
          </div>
          <div className="form-group">
            {this.renderInput(
              "massage",
              "Message",
              "",
              null,
              null,
              null,
              true,
              null
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default MachineDemo;
