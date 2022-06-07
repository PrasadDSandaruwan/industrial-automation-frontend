import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'

const properties = {
  scales: {
    yAxes: [
      {
        display: true,
        gridLines: {
          drawBorder: true,
          display: true,
          drawTicks: true,
          color: '#eef0fa',
          zeroLineColor: 'rgba(90, 113, 208, 0)',
        },
        ticks: {
          display: true,
          beginAtZero: true,
          min: 0,
          max: 100,
          stepSize: 22,
          padding: 10,
        },
      },
    ],
    xAxes: [
      {
        display: true,
        position: 'bottom',
        gridLines: {
          drawBorder: true,
          display: true,
          drawTicks: true,
        },
        ticks: {
          beginAtZero: true,
          stepSize: 10,
          fontColor: '#a7afb7',
          padding: 10,
        },
      },
    ],
  },
  legend: {
    display: true,
  },
  elements: {
    point: {
      radius: 0,
    },
    line: {
      tension: 0,
    },
  },
  tooltips: {
    backgroundColor: 'rgba(2, 171, 254, 1)',
  },
}

class Chart extends Component {
  state = {
    title: '',
    machineId: 1,
    rate: {
      labels: [],
      datasets: [],
    },
  }

  componentDidMount() {
    const { title, machineId, labels, datasets } = this.props
    const rate = { labels: labels, datasets: datasets }
    this.setState({
      title,
      rate,
      machineId,
    })
  }

  componentWillReceiveProps(nextProps) {
    const { title, machineId, labels, datasets } = nextProps
    const rate = { labels: labels, datasets: datasets }
    this.setState({
      title,
      rate,
      machineId,
    })
  }

  render() {
    return (
      <div className="card card-dashboard-one">
        <div className="card-header d-flex justify-content-center">
          <h5>{this.state.title}</h5>
        </div>
        <div className="card-body">
          <div className="page-view-chart-wrapper">
            <Line data={this.state.rate} options={properties} />
          </div>
        </div>
      </div>
    )
  }
}

export default Chart
