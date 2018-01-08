import React, { Component }  from 'react';
import { Chart } from 'react-google-charts';

export default class TimelineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartType: 'Timeline',
      width: "100%",
      chartPackages: ['timeline'],
      rows: props.rows,
      columns: props.columns,
      options: {
      //  colors: ['#cbb69d', '#603913', '#c69c6e'],
      },
    };
  }


  render() {
    return (
      <Chart
        chartType="Timeline"
        rows={this.state.rows}
        columns={this.state.columns}
        options={this.state.options}
        graph_id="timeline"
        width={'100%'}
        height={'400px'}
        legend_toggle
      />
    );
  }
}