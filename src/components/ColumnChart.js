import React, { Component }  from 'react';
import { Chart } from 'react-google-charts';

export default class ColumnChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartType: "Bar",
      width: "100%",
      chartPackages: ['timeline'],
      rows: [ ["2017-12-20", 0, 0]
    ],
      columns: [
        {
          type: 'string',
          label: 'Date',
        },
        {
          type: 'number',
          label: 'Conferences - All',
        },
        {
          type: 'number',
          label: 'Conferences - Problems',
        }
      ],
      options: {
        title: 'Conferences - Total',
        hAxis: {
          title: 'Time of Day',
          format: 'h:mm a',
          viewWindow: {
            min: [7, 30, 0],
            max: [17, 30, 0]
          }
        },
        vAxis: {
          title: 'Rating (scale of 1-10)'
        }
      },
    };
  }

  componentDidMount  = () => {
    fetch('/api/public/card/d2517e9b-fb2d-4aa6-8d1e-b98ccdb18273/query')
    .then(function(response) {
    return response.json()
    }).then(function(json) {
    console.log('parsed json', json.data.rows)
    const data_new = json.data.rows;
    this.setState( { rows: data_new });
    }.bind(this)).catch(function(ex) {
    console.log('parsing failed', ex)
  })
}

  render() {
    return (
      <Chart
        chartType="Bar"
        rows={this.state.rows}
        columns={this.state.columns}
        options={this.state.options}
        graph_id="columnchart"
        width={'100%'}
        height={'400px'}
        legend_toggle
      />
    );
  }
}