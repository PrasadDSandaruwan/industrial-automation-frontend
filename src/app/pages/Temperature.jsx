import React, { Component } from 'react'
import Chart from '../charts/Chart';

export default class Temperature extends Component {
    Machine1 = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51'],
        datasets: [{
            data: [27.2, 29.9, 29.6, 25.7, 25.9, 29.3, 31.1, 27.9, 28.4, 25.4, 23.2, 18.2, 14, 12.7, 11, 13.7, 9.7, 12.6, 10.9, 12.7, 13.8, 12.9, 13.8, 10.2, 5.8, 7.6, 8.8, 5.6, 5.6, 6.3, 4.2, 3.6, 5.4, 6.5, 8.1, 10.9, 7.6, 9.7, 10.9, 9.5, 5.4, 4.9, .7, 2.3, 5.5, 10, 10.6, 8.3, 8.4, 8.5, 5.8],
            borderWidth: 2,
            fill: false,
            backgroundColor: ['rgba(0, 204, 212, .2)'],
            borderColor: ['#ef233c']
        }]
    };
    Machine2 = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51'],
        datasets: [{
            data: [27.2, 29.9, 29.6, 25.7, 25.9, 29.3, 31.1, 27.9, 28.4, 25.4, 23.2, 18.2, 14, 12.7, 11, 13.7, 9.7, 12.6, 10.9, 12.7, 13.8, 12.9, 13.8, 10.2, 5.8, 7.6, 8.8, 5.6, 5.6, 6.3, 4.2, 3.6, 5.4, 6.5, 8.1, 10.9, 7.6, 9.7, 10.9, 9.5, 5.4, 4.9, .7, 2.3, 5.5, 10, 10.6, 8.3, 8.4, 8.5, 5.8],
            borderWidth: 2,
            fill: false,
            backgroundColor: ['rgba(0, 204, 212, .2)'],
            borderColor: ['#ef233c']
        }]
    };
  render() {
    return (
        <div className="row row-sm mg-b-20">
        <div className="col-lg-6 ht-lg-100p">
            <Chart title="Machine 1" labels={this.Machine1.labels} datasets={this.Machine1.datasets} machineId={1} />
        </div>
        <div className="col-lg-6 ht-lg-100p">
            <Chart title="Machine 2" labels={this.Machine2.labels} datasets={this.Machine2.datasets} machineId={2} />
        </div>
    </div>
    )
  }
}
