import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi";
import Form from "./common/form";
import ProductionLineService from "../../services/admin/productionLineService";
import { toast } from "react-toastify";

export class AddProductionline extends Form {
  state = {
    data: {
      //every input field name == state name
      production_line_name: "",
      slug: "",
    },
    errors: {},
  };

  //error handling
  schema = Joi.object({
    production_line_name: Joi.string().required(),
    slug: Joi.string().required(),
  });

  handleSlug = async (slug) => {
    try {
      const response = await ProductionLineService.checkIsUnique(slug);
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
      const response = await ProductionLineService.addProductionLine(
        this.state.data
      );
      console.log("succesful");
      if (response.status === 200) {
        if (response.data.code === 200) {
          const data = {
            // every input field, input name == state name
            production_line_name: "",
            slug: "",
          };
          this.setState({ data });

          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } else {
        toast.error(response.data.message);
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
              style={{
                justifyItems: "normal",
                height: "auto",
                width: "600px",
              }}
            >
              <h4>Add a New Production Line</h4>

              <form action="#">
                <div className="form-group">
                  {this.renderInput(
                    "production_line_name",
                    "Line Name",
                    "Enter the Line Name",
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

                {this.renderButton(
                  "Add Production Line",
                  "Add Production Line",
                  null,
                  null
                )}
                {/* <button>Add Machine</button>    */}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddProductionline;
