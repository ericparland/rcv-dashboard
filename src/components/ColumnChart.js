import React, { Component }  from 'react';
import { Chart } from 'react-google-charts';

export default class ColumnChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: null,
      chartType: "Bar",
      width: "100%",
      chartPackages: ['timeline'],
      rows: [ ["0000-00-00", 0, 0]
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
          title: 'Count'
        }
      },
    };
  }

  componentDidMount  = () => {
    fetch('/rcv-api/public/card/091a31d1-9a95-4584-97da-9d25409bbe94/query')
      .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong ...');
      }
    })
    .then(function(json) {
      const data_new = json.data.rows;
      this.setState( { rows: data_new });
      }.bind(this)).catch(function(ex) {
      console.log('parsing failed', ex)
    }).then(data => this.setState({ isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }))
}

  render() {
    const { isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

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