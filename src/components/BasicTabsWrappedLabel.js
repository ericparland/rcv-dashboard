import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

import 'whatwg-fetch'

import LineChartBitrateOut from './LineChartBitrateOut';
import LineChartBitrateIn from './LineChartBitrateIn';
import ConferenceTable from './ConferenceTable'
import ColumnChart from './ColumnChart'
import TimelineChartIn from './TimelineChartIn';
import TimelineChartOut from './TimelineChartOut';
import SessionTable from './SessionTable'





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

const LineChart = {
      rows: [
      [new Date(1514277004106), 0, 0],
    ],
  }


var  hub_list = {}



function hub_data() {
    fetch('/rcv-api/public/card/33b08f09-3498-41ab-8fb9-b6098e379c5b/query')
  .then(function(response) {
    return response.json()
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
        session_id: '',
        participant_name: '',
      }
      this.changeTab = this.changeTab
      this.hub_id = this.hub_id
      this.session_id = this.session_id
      this.participant_name = this.participant_name
  }

  changeTab = (value) => {this.setState({value})}
  hub_id = (hub_id) => {this.setState({hub_id})}
  session_id = (session_id) => {this.setState({session_id})}
  participant_name = (participant_name) => {this.setState({participant_name})}


  handleChange = (event, value, hub_id, session_id, participant_name) => {
    this.setState({value: value, hub_id: hub_id, session_id: session_id, participant_name: participant_name});
  };




  handleClick = () => {
    fetch('/rcv-api/public/card/33b08f09-3498-41ab-8fb9-b6098e379c5b/query')
  .then(function(response) {
    return response.json()
  }).then(function(json) {
    hub_list = json.data.rows
  }).catch(function(ex) {
  })
  }



  render() {
    const { classes } = this.props;
    const { value, hub_id, session_id, participant_name } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">

          <Tabs
            value={value}
            hub_id={hub_id}
            session_id={session_id}
            participant_name={participant_name}
            onChange={this.handleChange}
            centered
          >
            <Tab value="one" label="Overview"  route="/overview" />
            <Tab value="two" label="Conference Details" route="/conference" disabled />
            <Tab value="three" label="Session Details" route="/session" disabled  />
          </Tabs>
        </AppBar>
        {value === 'one' && <TabContainer>
          <div>
            <ColumnChart/>
            <ConferenceTable  hub_id={this.hub_id} changeTabHub={this.changeTab} />
          </div>
        </TabContainer>}
        {value === 'two' && <TabContainer>
          <div>
            <h3>Senders</h3>
            <TimelineChartIn hub_id={hub_id} rows={dataTimelines.rows} columns={dataTimelines.columns} session_id={this.session_id} participant_name={this.participant_name}  changeTabHub={this.changeTab}/>
            <h3>Receivers</h3>
            <TimelineChartOut hub_id={hub_id} rows={dataTimelines.rows} columns={dataTimelines.columns} session_id={this.session_id}  participant_name={this.participant_name} changeTabHub={this.changeTab}/>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Sessions Table</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <SessionTable hub_id={hub_id} session_id={this.session_id} changeTabHub={this.changeTab}/>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        </TabContainer>}
        {value === 'three' && <TabContainer>
        <h3>Participant: {participant_name}, Session ID: {session_id}</h3>
        <LineChartBitrateOut session_id={session_id} rows={LineChart.rows}/>
        <LineChartBitrateIn session_id={session_id} rows={LineChart.rows}/>
        </TabContainer>}

      </div>
    );
  }
}

BasicTabsWrappedLabel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BasicTabsWrappedLabel);
