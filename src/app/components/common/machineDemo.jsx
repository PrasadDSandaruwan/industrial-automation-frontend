import React from "react";
import Form from "./form";

export class MachineDemo extends Form {
  state = {
    data: {
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
    const data = this.props;
    this.setState({ data });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps });
  }

  render() {
    return (
      <div style={{ width: "auto", height: "auto" }}>
        <h2 className="row py-3 align-items-center justify-content-center">
          Machine Demo
        </h2>

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
