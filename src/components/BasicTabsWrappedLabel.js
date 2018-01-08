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


const dataTimelines = {
      rows: [
      [ 'John',  'Desktop Apppp', '#32CD32',   new Date(0,0,0,16,30,0),  new Date(0,0,0,19,0,0) ],
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
            <TimelineChart rows={dataTimelines.rows} columns={dataTimelines.columns}/>
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
