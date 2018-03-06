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

function createDataLineOut(array) {
    var data_prepared=[]
for (var i = 0; i < array.length; i++) {
					data_prepared.push (
          [
            new Date(array[i][0]),
            array[i][1],
            array[i][2],
          ]
        );
					}
          return data_prepared;
        }



export default class LineChartBitrateOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: null,
      chartType: 'LineChart',
      width: "100%",
      chartPackages: ['linechart'],
      rows: props.rows,
      columns:[
        { label:"time","type":"datetime"},
        { label:"out_required_bitrate","type":"number"},
        { label:"out_limit_bitrate","type":"number"}
      ],
      options: {
        legend: true,
        hAxis: {
          title:"Time"
        },
        vAxis: {
          title:"Out Bitrate"
        }
      //  colors: ['#cbb69d', '#603913', '#c69c6e'],
      },
      hub_id: props.hub_id,
      session_id: props.session_id,
    };
  }

  componentDidMount  = () => {
    fetch('/rcv-api/public/card/4e94bf64-8891-4aa4-bb8e-5bd19c3c3e40/query?parameters=%5B%7B"type"%3A"category"%2C"target"%3A%5B"variable"%2C%5B"template-tag"%2C"session_id"%5D%5D%2C"value"%3A%22' + this.state.session_id + '%22%7D%5D')
    .then(function(response) {
    return response.json()
    }).then(function(json) {
    //console.log('parsed json', json.data.rows)
    const data_new = createDataLineOut(json.data.rows);
    this.setState( { rows: data_new });
    }.bind(this)).catch(function(ex) {
    console.log('parsing failed', ex)
    .then(data => this.setState({ isLoading: false }))
    .catch(error => this.setState({ error, isLoading: false }))
  })
}



  render() {
    const { isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (this.state.rows.length == 0)
    {
     return <p>No data</p>;
   }

    if (isLoading) {
      return <p>Loading ...</p>;
    }
    return (
      <Chart
        chartType="LineChart"
        rows={this.state.rows}
        columns={this.state.columns}
        options={this.state.options}
        width={'100%'}
        height={'400px'}
        legend_toggle
      />
    );
  }
}
