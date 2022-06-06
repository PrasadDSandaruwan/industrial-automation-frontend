//alarm_name, id, command, message, type

import React from "react";
import Joi from "joi";
import Form from "./form";
import machineService from "../../../services/admin/machineService";
import { toast } from "react-toastify";

export class AlarmDemo extends Form {
  state = {
    data: {
      //every input field name == state name
      alarm_name: "",
      id: 1,
      massage: "",
      type: "",
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
        <h2 className="py-3">Alarm Demo</h2>

        <form action="#">
          <div class="form-row">
            <div className="form-group col-md-8">
              {this.renderInput(
                "alarm_name",
                "Alarm Name",
                "",
                null,
                null,
                null,
                true,
                null
              )}
            </div>

            <div className="form-group col-md-4">
              {this.renderInput(
                "id",
                "Alarm ID",
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

export default AlarmDemo;
