import React, { Component } from "react";
import { toast } from "react-toastify";
import machineService from "../../services/admin/machineService";
import rateService from "../../services/admin/rateService";
import Chart from "../charts/Chart";
import Select from "../components/common/select";

export default class Temperature extends Component {
  state = {
    machines: [],

    data: {
      machine_id: 1,
      is_temp: 1,
    },

    dataPoints: {
      labels: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
        "32",
        "33",
        "34",
        "35",
        "36",
        "37",
        "38",
        "39",
        "40",
        "41",
        "42",
        "43",
        "44",
        "45",
        "46",
        "47",
        "48",
        "49",
        "50",
        "51",
      ],
      datasets: [
        {
          data: [
            27.2, 29.9, 29.6, 25.7, 25.9, 29.3, 31.1, 27.9, 28.4, 25.4, 23.2,
            18.2, 14, 12.7, 11, 13.7, 9.7, 12.6, 10.9, 12.7, 13.8, 12.9, 13.8,
            10.2, 5.8, 7.6, 8.8, 5.6, 5.6, 6.3, 4.2, 3.6, 5.4, 6.5, 8.1, 10.9,
            7.6, 9.7, 10.9, 9.5, 5.4, 4.9, 0.7, 2.3, 5.5, 10, 10.6, 8.3, 8.4,
            8.5, 5.8,
          ],
          borderWidth: 2,
          fill: false,
          backgroundColor: ["#d62828"],
          borderColor: ["#d62828"],
        },
      ],
    },
  };

  componentDidMount = async () => {
    try {
      const response = await machineService.getAllMachines();

      if (response.status === 200) {
        if (response.data.code === 200) {
          this.setState({ machines: response.data.data });
        } else {
          toast.error(response.data.data);
        }
      }

      let inerval;
      clearInterval(inerval);

      inerval = setInterval(async () => {
        if (this.state.data.machine_id) {
          var data_send = { ...this.state.data };

          data_send.rate = Math.floor(Math.random() * (100 - 1 + 1)) + 1;

          const new_response = await machineService.addRates(data_send);

          if (new_response.status === 200) {
            if (new_response.data.code === 200) {
            } else {
              clearInterval(inerval);
              toast.error(new_response.data.data);
            }
          } else {
            clearInterval(inerval);
            toast.error(new_response.data.data);
          }

          const res_1 = await rateService.getRates(data_send);
          if (res_1.status === 200) {
            if (res_1.data.code === 200) {
              const dataPoints = { ...this.state.dataPoints };
              dataPoints.labels = res_1.data.data.labels;
              dataPoints.datasets[0].data = res_1.data.data.data;

              this.setState({ dataPoints });
            } else {
              clearInterval(inerval);

              toast.error(res_1.data.data);
            }
          } else {
            toast.error("Error Occured!");
            clearInterval(inerval);
          }
        }
      }, 5000);
    } catch (error) {
      toast.error("Error Occured!");
    }
  };

  handleChangeSelect = async (event, name) => {
    const data = { ...this.state.data };
    data[name] = event.target.value;
    try {
      const response = await rateService.getRates(data);

      if (response.status === 200) {
        if (response.data.code === 200) {
          const dataPoints = { ...this.state.dataPoints };
          dataPoints.labels = response.data.data.labels;
          dataPoints.datasets[0].data = response.data.data.data;
          this.setState({ dataPoints });
        } else {
          toast.error(response.data.data);
        }
      }
    } catch (error) {
      toast.error("Error Occured!");
    }
    this.setState({ data });
  };

  render() {
    return (
      <div>
        <h5 className="m-0 p-0">Temperature</h5>
        <div className="form-group col-lg-4 col-md-6 m-0 p-0">
          <form action="#" className="m-0 p-0">
            <Select
              className="m-0 p-0"
              name="machine_id"
              options={this.state.machines}
              label=""
              property="name"
              onChange={this.handleChangeSelect}
            ></Select>
          </form>
        </div>
        <div className="row row-sm mg-b-20">
          <div className="col-lg-6 ht-lg-100p">
            <Chart
              title=""
              labels={this.state.dataPoints.labels}
              datasets={this.state.dataPoints.datasets}
              machineId={200}
            />
          </div>
        </div>
      </div>
    );
  }
}
