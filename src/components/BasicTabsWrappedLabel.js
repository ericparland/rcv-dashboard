import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import EnhancedTable from './EnhancedTable'
import ColumnChart from './ColumnChart'
import TimelineChart from '../components/TimelineChart';
import 'whatwg-fetch'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

import SessionTable from './SessionTable'


import UpdateButton from './UpdateButton'

//http://bda01-t01-hsd02.lab.nordigy.ru:3000/public/question/15a3a3b0-b5e3-4cb9-97bf-888c977959aa
const test_data_timelines = {

}

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

//alert(numberToColorHsl(shade,0,1))



const dataTimelines = {
      rows: [
      [ 'Loading',  'Loading', numberToColorHsl(0.9166666666666666,0,1),   new Date(1514277004106),  new Date(1514277064112) ],
    ],
    columns: [
      {
        "id": "Name",
        "type": "string"
      },
      {
        "id": "Session ID",
        "type": "string"
      },
      {
        type: 'string',
        role: 'style'
      },
      {
        "id":"Start",
        "type":"date"
      },
      {
        "id":"End",
        "type":"date"
      }
    ]};


const dataTimelines2 = {
      rows: [
      [ 'John',  'Desktop Apppp',  numberToColorHsl(shade,0,1) ,   new Date(0,0,0,16,30,0),  new Date(0,0,0,19,0,0) ],
      [ 'John',  'Desktop App', '#FF3E33',   new Date(0,0,0,19,0,0),  new Date(0,0,0,23,0,0) ],
      [ 'John1',  'Mobile App - iOS','#32CD32', new Date(0,0,0,16,30,0), new Date(0,0,0,19,0,0) ],
      [ 'Claire', 'Desktop App', '#FF3E33',  new Date(0,0,0,13,30,0), new Date(0,0,0,14,3,0) ],
      [ 'Claire', 'Mobile App - Android',   '#32CD32',    new Date(0,0,0,14,30,0), new Date(0,0,0,19,0,0) ],
      [ 'Billy Bob',   'Mobile App - iOS', '#32CD32',      new Date(0,0,0,12,30,0), new Date(0,0,0,14,0,0) ],
      [ 'Billy Bob',   'Mobile App - iOS',       '#FF3E33',      new Date(0,0,0,14,30,0), new Date(0,0,0,16,0,30) ],
      [ 'Billy Bob',   'Mobile App - iOS',   '#32CD32',       new Date(0,0,0,16,30,0), new Date(0,0,0,18,30,0) ],
      [ 'Billy Bob1',   'Mobile App - iOS', '#32CD32',      new Date(0,0,0,12,30,0), new Date(0,0,0,14,0,0) ],
      [ 'Billy Bob1',   'Mobile App - iOS',       '#FF3E33',      new Date(0,0,0,14,30,0), new Date(0,0,0,16,0,30) ],
      [ 'Billy Bob1',   'Mobile App - iOS',   '#32CD32',       new Date(0,0,0,16,30,0), new Date(0,0,0,18,30,0) ],
      [ 'Billy Bob2',   'Mobile App - iOS', '#32CD32',      new Date(0,0,0,12,30,0), new Date(0,0,0,14,0,0) ],
      [ 'Billy Bob3',   'Mobile App - iOS',       '#FF3E33',      new Date(0,0,0,14,30,0), new Date(0,0,0,16,0,30) ],
      [ 'Billy Bob',   'Mobile App - iOS',   '#32CD32',       new Date(0,0,0,16,30,0), new Date(0,0,0,18,30,0) ],
      [ 'Billy Bob',   'Mobile App - iOS', '#32CD32',      new Date(0,0,0,12,30,0), new Date(0,0,0,14,0,0) ],
      [ 'Billy Bob',   'Mobile App - iOS',       '#FF3E33',      new Date(0,0,0,14,30,0), new Date(0,0,0,16,0,30) ],
      [ 'Billy Bob',   'Mobile App - iOS',   '#32CD32',       new Date(0,0,0,16,30,0), new Date(0,0,0,18,30,0) ],
      [ 'Billy Bob',   'Mobile App - iOS', '#32CD32',      new Date(0,0,0,12,30,0), new Date(0,0,0,14,0,0) ],
      [ 'Billy Bob',   'Mobile App - iOS',       '#FF3E33',      new Date(0,0,0,14,30,0), new Date(0,0,0,16,0,30) ],
      [ 'Billy Bob',   'Mobile App - iOS',   '#32CD32',       new Date(0,0,0,16,30,0), new Date(0,0,0,23,30,0) ]
    ],
    columns: [
      {
        "id": "Room",
        "type": "string"
      },
      {
        "id": "Name",
        "type": "string"
      },
      {
        type: 'string',
        role: 'style'
      },
      {
        "id":"Start",
        "type":"date"
      },
      {
        "id":"End",
        "type":"date"
      }
    ]};

var  hub_list = {}



function hub_data() {
    fetch('/api/public/card/b5e706d3-0b04-48b7-8854-00d780d39c68/query')
  .then(function(response) {
    return response.json()
  }).then(function(json) {
    console.log('parsed json', json)
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  })
}

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper,
  },
  headline: {
  fontSize: 24,
  paddingTop: 16,
  marginBottom: 12,
  fontWeight: 400,
},
});

class BasicTabsWrappedLabel extends React.Component {

  constructor(props) {
      super(props)
      this.state = {
        value: 'one',
        hub_id: '',
      }
      this.changeTab = this.changeTab
      this.hub_id = this.hub_id
  }

  changeTab = (value) => {this.setState({value})}
  hub_id = (hub_id) => {this.setState({hub_id})}

  handleChange = (event, value, hub_id) => {
    this.setState({value: value, hub_id: hub_id});
  };




  handleClick = () => {
    fetch('/api/public/card/b5e706d3-0b04-48b7-8854-00d780d39c68/query')
  .then(function(response) {
    showLoading()
    hideLoading()
    return response.json()
  }).then(function(json) {
    hub_list = json.data.rows
    console.log('parsed json', hub_list)
  }).catch(function(ex) {
    showLoading()
    hideLoading()
    console.log('parsing failed', ex)
  })
  }



  render() {
    const { classes } = this.props;
    const { value, hub_id } = this.state;

    return (
      <div className={classes.root}>

        <AppBar position="static">

          <Tabs
            value={value}
            hub_id={hub_id}
            onChange={this.handleChange}
            centered
          >
            <Tab value="one" label="Overview" />
            <Tab value="two" label="Conference Details" />
            <Tab value="three" label="Session Details" />
          </Tabs>
        </AppBar>
        {value === 'one' && <TabContainer>
          <div>
            <ColumnChart/>
            <EnhancedTable  hub_id={this.hub_id} changeTabHub={this.changeTab} />
          </div>
        </TabContainer>}
        {value === 'two' && <TabContainer>
          <div>
            <TimelineChart hub_id={hub_id} rows={dataTimelines.rows} columns={dataTimelines.columns}/>
            <SessionTable hub_id={hub_id} changeTabHub={this.changeTab}/>
          </div>
        </TabContainer>}
        {value === 'three' && <TabContainer>Item Three</TabContainer>}
      </div>
    );
  }
}

BasicTabsWrappedLabel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BasicTabsWrappedLabel);
