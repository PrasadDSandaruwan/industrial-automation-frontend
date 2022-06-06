import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi";
import Auth from "../../services/user/authService";
import Form from "./common/form";
import MachineService from "../../services/admin/machineService";
import ProductionLineService from "../../services/admin/productionLineService";
import { toast } from "react-toastify";
import machineService from "../../services/admin/machineService";

export class AddMachine extends Form {
  state = {
    produtionline: [],

    machinetype: [],

    isautomated: [
      { id: 0, name: "No" },
      { id: 1, name: "Yes" },
    ],

    data: {
      //every input field name == state name
      production_line_id: 1,
      machine_type_id: 2,
      name: "",
      slug: "",
      license_number: "",
      is_automated: 1,
      temp: 0,
      rate: 0,
    },
    errors: {},
  };

  //error handling
  schema = Joi.object({
    production_line_id: Joi.number().required(),
    machine_type_id: Joi.number().required(),
    name: Joi.string().required(),
    slug: Joi.string().required(),
    license_number: Joi.string().required(),
    is_automated: Joi.number().required(),
    temp: Joi.number().required(),
    rate: Joi.number().required(),
  });

  componentDidMount = async () => {
    try {
      const responseGetMachineTypes = await MachineService.getMachineTypes();
      const responseGetProductionLine =
        await ProductionLineService.getProductionLinesID();
      console.log("All machines Types", responseGetMachineTypes.data.data);
      console.log("All production Lines", responseGetProductionLine.data.data);
      if (
        responseGetMachineTypes.status === 200 &&
        responseGetProductionLine.status === 200
      ) {
        if (
          responseGetMachineTypes.data.code === 200 &&
          responseGetProductionLine.data.code === 200
        ) {
          this.setState({
            produtionline: responseGetProductionLine.data.data,
            machinetype: responseGetMachineTypes.data.data,
          });
        } else {
          toast.error("Error Occured!");
        }
      }
    } catch (error) {
      toast.error("Error Occured!");
    }
  };

  handleSlug = async (slug) => {
    try {
      const response = await machineService.checkIsUnique(slug);
      if (response.status === 200) {
        if (response.data.code === 200) {
          console.log("return true");
          return true;
        }
        return false;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  doSubmit = async () => {
    try {
      const response = await MachineService.addMachine(this.state.data);

      if (response.status === 200) {
        if (response.data.code === 200) {
          const data = {
            // every input field, input name == state name
            production_line_id: 1,
            machine_type_id: 2,
            name: "",
            slug: "",
            license_number: "",
            is_automated: 1,
            temp: 0,
            rate: 0,
          };
          this.setState({ data });

          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error("Error Occured!");
    }
  };

  render() {
    return (
      <div>
        <div>
          <div className="az-signin-wrapper " style={{ minHeight: "500px" }}>
            <div
              className="az-card-signin"
              style={{ justifyItems: "normal", height: "auto", width: "600px" }}
            >
              <h4>Add a New Machine</h4>

              <form>
                <div
                  class="form-row"
                  style={{ marginTop: "10px", marginBottom: "-10px" }}
                >
                  <div className="form-group col-md-6">
                    {this.renderSelect(
                      "production_line_id",
                      "Production Line",
                      this.state.produtionline,
                      "line_name"
                    )}
                  </div>

                  <div className="form-group col-md-6">
                    {this.renderSelect(
                      "machine_type_id",
                      "Machine Type",
                      this.state.machinetype,
                      "machine_type_name"
                    )}
                  </div>
                </div>

                <div className="form-group">
                  {this.renderInput(
                    "name",
                    "Machine Name",
                    "Enter the machine name",
                    null,
                    null,
                    null,
                    null,
                    null
                  )}
                </div>

                <div className="form-group">
                  {this.renderInput(
                    "slug",
                    "Slug",
                    "Enter the slug",
                    null,
                    null,
                    null,
                    null,
                    null
                  )}
                </div>
                <div class="form-row">
                  <div className="form-group col-md-4">
                    {this.renderInput(
                      "license_number",
                      "License Number",
                      "Enter the License Number",
                      null,
                      null,
                      null,
                      null,
                      null
                    )}
                  </div>

                  <div className="form-group col-md-4">
                    {this.renderInput(
                      "temp",
                      "Temp",
                      "Enter the Temp",
                      null,
                      null,
                      null,
                      null,
                      null
                    )}
                  </div>

                  <div className="form-group col-md-4">
                    {this.renderInput(
                      "rate",
                      "Rate",
                      "Enter the Rate",
                      null,
                      null,
                      null,
                      null,
                      null
                    )}
                  </div>
                </div>
                <div className="form-group">
                  {this.renderSelect(
                    "is_automated",
                    "Is Automated",
                    this.state.isautomated,
                    "name"
                  )}
                </div>

                {this.renderButton("Add Machine", "Add Machine", null, null)}
                {/* <button>Add Machine</button>    */}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddMachine;
