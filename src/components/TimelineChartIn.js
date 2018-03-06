import React, { Component }  from 'react';
import { Chart } from 'react-google-charts';


function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

const shade = 0.9166666666666666

//bs
function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
}
//bs
function numberToColorHsl(i, min, max) {
    var ratio = i;
    if (min> 0 || max < 1) {
        if (i < min) {
            ratio = 0;
        } else if (i > max) {
            ratio = 1;
        } else {
            var range = max - min;
            ratio = (i-min) / range;
        }
    }

    // as the function expects a value between 0 and 1, and red = 0° and green = 120°
    // we convert the input to the appropriate hue value
    var hue = ratio * 1.2 / 3.60;
    //if (minMaxFactor!=1) hue /= minMaxFactor;
    //console.log(hue);

    // we convert hsl to rgb (saturation 100%, lightness 50%)
    var rgb = hslToRgb(hue, 1, .5);
    // we format to css value and return
    //return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
    return "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);
}



function createDataTimelineChartIn(array) {
    var data_prepared=[]
for (var i = 0; i < array.length; i++) {
          if(array[i+1]!== undefined) {
            if(array[i][3] == array[i+1][3]) {
              array[i][2] = array[i+1][1];
            }
          }
          //Google Charts cannot handle timeline less than 1 second
          if(array[i][2]-array[i][1] < 1000) {
              array[i][2] = array[i][2] + 1000;
          }
					data_prepared.push (
          [
            array[i][5],
            array[i][3],
            numberToColorHsl(array[i][0],0,1),
            new Date(array[i][1]),
            new Date(array[i][2])
          ]
        );
					}
          return data_prepared;
        }

export default class TimelineChartIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading2: false,
      error: null,
      chartType: 'Timeline',
      width: "100%",
      chartPackages: ['timeline'],
      rows: props.rows,
      columns: props.columns,
      options: {
        timeline: {tooltipDateFormat: 'yyyy-MM-dd HH:mm:ss.SSS', showBarLabels: false }
      //  colors: ['#cbb69d', '#603913', '#c69c6e'],
      },
      hub_id: props.hub_id,
      session_id: props.session_id,
      participant_name: props.participant_name
    };
    this.handleSelectCallback = this.handleSelectCallback.bind(this);
  }

  componentDidMount  = () => {
    fetch('/rcv-api/public/card/42b82298-aab2-4768-b89d-9ad4ea9fa605/query?parameters=%5B%7B"type"%3A"category"%2C"target"%3A%5B"variable"%2C%5B"template-tag"%2C"rcv_hub_id"%5D%5D%2C"value"%3A%22' + this.state.hub_id + '%22%7D%5D')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
        })
    .then(function(json) {
    const data_new = createDataTimelineChartIn(json.data.rows);
    this.setState( { rows: data_new });
    }.bind(this)).catch(function(ex) {
    console.log('parsing failed', ex)
    .then(data => this.setState({ isLoading2: false }))
    .catch(error => this.setState({ error, isLoading: false }))
  })
}



handleSelectCallback(chart) {
  var i = chart.chart.getSelection()[0].row;
  console.log('Selected ', chart.props.rows[i]);

  this.setState({
    session_id : chart.props.rows[i][1],
    participant_name: chart.props.rows[i][0]
  });
  this.props.session_id(this.state.session_id);
  this.props.participant_name(this.state.participant_name)
  this.props.changeTabHub('three')
}

  render() {
    const { classes } = this.props;
    const { isLoading2, error } = this.state;
    var changeTab  =   this.props.changeTab;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading2) {
      return <p>Loading ...</p>;
    }

    return (
      <Chart
        chartType="Timeline"
        rows={this.state.rows}
        columns={this.state.columns}
        options={this.state.options}
        graph_id="timelinein"
        width={'100%'}
        height={'400px'}
        legend_toggle
        chartEvents={[{
          eventName: 'select',
          callback: this.handleSelectCallback
        }]}
      />
    );
  }
}
