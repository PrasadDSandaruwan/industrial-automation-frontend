import React from "react";
import Form from "./form";

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
        <h2 className="row py-3 align-items-center justify-content-center">
          Alarm Demo
        </h2>

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
