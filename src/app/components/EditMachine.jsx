import React from "react";
import Joi from "joi";
import Form from "./common/form";
import MachineServices from "../../services/admin/machineService";
import ProductionLineService from "../../services/admin/productionLineService";
import { toast } from "react-toastify";

export class EditMachine extends Form {
  state = {
    isRedirect: false,
    produtionline: [],

    machinetype: [],

    id: 1,

    isautomated: [
      { id: 0, name: "No" },
      { id: 1, name: "Yes" },
    ],

    data: {
      production_line_id: 1,
      machine_type_id: 2,
      name: "",
      slug: "",
      license_number: "",
      is_automated: 1,
      rate: 0,
      temp: 0,
    },
    errors: {},
  };

  schema = Joi.object({
    production_line_id: Joi.number().required(),
    machine_type_id: Joi.number().required(),
    name: Joi.string().required(),
    slug: Joi.string().required(),
    license_number: Joi.string().required(),
    is_automated: Joi.number().required(),
    rate: Joi.number().required(),
    temp: Joi.number().required(),
  });

  handleSlug = async (slug) => {
    try {
      const response = await MachineServices.checkIsUnique(slug);
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

  componentDidMount = async () => {
    try {
      const id = this.props.match.params.id;
      this.setState({ id });
      const responseGetMachineTypes = await MachineServices.getMachineTypes();
      const responseGetProductionLine =
        await ProductionLineService.getProductionLinesID();
      const responseGetMachineDetails = await MachineServices.editMachineView(
        id
      );

      if (
        responseGetMachineTypes.status === 200 &&
        responseGetProductionLine.status === 200 &&
        responseGetMachineDetails.status === 200
      ) {
        if (
          responseGetMachineTypes.data.code === 200 &&
          responseGetProductionLine.data.code === 200 &&
          responseGetMachineDetails.data.code === 200
        ) {
          const data = { ...this.data };
          data.production_line_id =
            responseGetMachineDetails.data.data.production_line.id;
          data.machine_type_id =
            responseGetMachineDetails.data.data.machine_type.id;
          data.name = responseGetMachineDetails.data.data.name;
          data.slug = responseGetMachineDetails.data.data.slug;
          data.license_number =
            responseGetMachineDetails.data.data.license_number;
          data.is_automated = responseGetMachineDetails.data.data.is_automated;
          data.rate = responseGetMachineDetails.data.data.rate;
          data.temp = responseGetMachineDetails.data.data.temp;
          this.setState({
            produtionline: responseGetProductionLine.data.data,
            machinetype: responseGetMachineTypes.data.data,
            isRedirect: false,
            data,
          });
        } else {
          this.setState({ isRedirect: true });
          toast.error("Error Occured!");
        }
      } else {
        this.setState({ isRedirect: true });
        toast.error("Error Occured!");
      }
    } catch (error) {
      alert("Error occured!");
    }
  };

  doSubmit = async () => {
    try {
      const response = await MachineServices.saveMachineView(
        this.state.data,
        this.state.id
      );

      if (response.status === 200) {
        if (response.data.code === 200) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      alert("Error occured!");
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
              <h4>Edit Machine Details</h4>

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

                <div className="form-group ">
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

                <div className="form-group " style={{ marginTop: "10px" }}>
                  {this.renderInput(
                    "slug",
                    "Slug",
                    "Enter the slug",
                    null,
                    null,
                    null,
                    true,
                    null
                  )}
                </div>

                <div class="form-row" style={{ marginTop: "10px" }}>
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

                <div className="form-group" style={{ marginTop: "10px" }}>
                  {this.renderSelect(
                    "is_automated",
                    "Is Automated",
                    this.state.isautomated,
                    "name"
                  )}
                </div>
                <div class="form-row">
                  {this.renderButton("Save", "Save", null, null)}
                  {this.renderButton("Cancel", "Cancel", null, null)}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditMachine;
