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

const test_data = {"data":{"columns":["val","start_ts","end_ts","session_id","hub_id","name","sessionid","participantid","accountid","extensionid"],"cols":[{"name":"val","display_name":"Val","base_type":"type/Float","remapped_to":null,"remapped_from":null},{"name":"start_ts","display_name":"Start Ts","base_type":"type/Integer","remapped_to":null,"remapped_from":null},{"name":"end_ts","display_name":"End Ts","base_type":"type/Integer","remapped_to":null,"remapped_from":null},{"name":"session_id","display_name":"Session ID","base_type":"type/Text","remapped_to":null,"remapped_from":null},{"name":"hub_id","display_name":"Hub ID","base_type":"type/Text","remapped_to":null,"remapped_from":null},{"name":"name","display_name":"Name","base_type":"type/Text","remapped_to":null,"remapped_from":null},{"name":"sessionid","display_name":"Sessionid","base_type":"type/Text","remapped_to":null,"remapped_from":null},{"name":"participantid","display_name":"Participantid","base_type":"type/Text","remapped_to":null,"remapped_from":null},{"name":"accountid","display_name":"Accountid","base_type":"type/Text","remapped_to":null,"remapped_from":null},{"name":"extensionid","display_name":"Extensionid","base_type":"type/Text","remapped_to":null,"remapped_from":null}],"rows":[[0.9166666666666666,1514277004106,1514277059112,"b28fa11c-6af1-4c03-b1ee-c5d3a4320007","rnd10-t01-ndb01933fd9c016091f0a647abf_1514276956163","Sergey Vengerskiy","b28fa11c-6af1-4c03-b1ee-c5d3a4320007","08481418-b63f-4256-b7ad-7e01cd22d332","400129656008","400129689008"],[1.0,1514276974104,1514276979105,"8a57ad59-ee50-4b99-ab40-9ee346375766","rnd10-t01-ndb01933fd9c016091f0a647abf_1514276956163","web","8a57ad59-ee50-4b99-ab40-9ee346375766","e21f6c05-b9a0-481e-8c33-907b6d8df84c","guest","6f6f6a13-2f3f-4411-b658-6c0089bba154"],[1.0,1514276964103,1514276999106,"145aaf22-872d-46a5-8c31-c5ac98f51102","rnd10-t01-ndb01933fd9c016091f0a647abf_1514276956163","Vivek Raje","145aaf22-872d-46a5-8c31-c5ac98f51102","3d2ad74a-f181-49dd-b9a1-dce40668609b","400129656008","400129690008"],[1.0,1514277004107,1514277004107,"d4976037-3a75-4102-b740-2914563bf414","rnd10-t01-ndb01933fd9c016091f0a647abf_1514276956163","Akashek Anchliya","d4976037-3a75-4102-b740-2914563bf414","c335b5e9-405c-4be5-9e4c-ea00845a0e6e","400129656008","400129691008"],[0.5454545454545454,1514277004107,1514277059112,"145aaf22-872d-46a5-8c31-c5ac98f51102","rnd10-t01-ndb01933fd9c016091f0a647abf_1514276956163","Vivek Raje","145aaf22-872d-46a5-8c31-c5ac98f51102","3d2ad74a-f181-49dd-b9a1-dce40668609b","400129656008","400129690008"],[1.0,1514277064112,1514277104116,"b28fa11c-6af1-4c03-b1ee-c5d3a4320007","rnd10-t01-ndb01933fd9c016091f0a647abf_1514276956163","Sergey Vengerskiy","b28fa11c-6af1-4c03-b1ee-c5d3a4320007","08481418-b63f-4256-b7ad-7e01cd22d332","400129656008","400129689008"],[1.0,1514277064112,1514277104116,"145aaf22-872d-46a5-8c31-c5ac98f51102","rnd10-t01-ndb01933fd9c016091f0a647abf_1514276956163","Vivek Raje","145aaf22-872d-46a5-8c31-c5ac98f51102","3d2ad74a-f181-49dd-b9a1-dce40668609b","400129656008","400129690008"],[1.0,1514276974104,1514276999106,"d4976037-3a75-4102-b740-2914563bf414","rnd10-t01-ndb01933fd9c016091f0a647abf_1514276956163","Akashek Anchliya","d4976037-3a75-4102-b740-2914563bf414","c335b5e9-405c-4be5-9e4c-ea00845a0e6e","400129656008","400129691008"]]},"json_query":{"parameters":[{"type":"category","target":["variable",["template-tag","rcv_hub_id"]],"value":"rnd10-t01-ndb01933fd9c016091f0a647abf_1514276956163"}]},"status":"completed"}



function createData2(array) {
    var test_data_prepared=[]
for (var i = 0; i < array.length; i++) {
          if(array[i+1]!== undefined) {
            if(array[i][3] == array[i+1][3]) {
              array[i][2] = array[i+1][1];
            }
          }
					test_data_prepared.push (
          [
            array[i][5],
            array[i][3],
            numberToColorHsl(array[i][0],0,1),
            new Date(array[i][1]),
            new Date(array[i][2])
          ]
          //{
					//id: i+1,
          //session_id: array[i][0],
					///start_ts: array[i][1],
					//end_ts: array[i][2],
					//err_in: array[i][3],
					//err_out: array[i][4],
					//rcv_hub_id: array[i][5]
					//}
        );
					}
          console.log(test_data_prepared)
          return test_data_prepared;
        }



export default class TimelineChartIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartType: 'Timeline',
      width: "100%",
      chartPackages: ['timeline'],
      rows: props.rows,
      columns: props.columns,
      options: {
        timeline: {tooltipDateFormat: 'yyyy-MM-dd HH:MM:ss.SSS' }
      //  colors: ['#cbb69d', '#603913', '#c69c6e'],
      },
      hub_id: props.hub_id,
    };
  }

  componentDidMount  = () => {
    fetch('/api/public/card/d2caf845-cc8c-457d-ac40-a0832b6c3cbd/query?parameters=%5B%7B"type"%3A"category"%2C"target"%3A%5B"variable"%2C%5B"template-tag"%2C"rcv_hub_id"%5D%5D%2C"value"%3A%22' + this.state.hub_id + '%22%7D%5D')
    .then(function(response) {
    return response.json()
    }).then(function(json) {
    console.log('parsed json', json.data.rows)
    const data_new = createData2(json.data.rows);
    this.setState( { rows: data_new });
    }.bind(this)).catch(function(ex) {
    console.log('parsing failed', ex)
  })
}

  render() {
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
      />
    );
  }
}
