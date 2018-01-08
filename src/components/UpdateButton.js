import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import 'whatwg-fetch'
import Button from 'material-ui/Button';

function updateState(text){

    this.setState({text})
}

function updateText(json) {
    this.setState({json})
}

function handleClick() {
    fetch('/api/public/card/b5e706d3-0b04-48b7-8854-00d780d39c68/query')
  .then(function(response) {
    return response.json()
  }).then(function(json) {
    updateText(json)
    console.log('parsed json', json)
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  })
}

class UpdateButton extends Component {
  constructor(props) {
      super(props)
      this.state = {
          json: {"data":{"columns":["rcv_hub_id","conf_start_ts","conf_end_ts","err_receivers","err_senders","sessions"],"cols":[{"name":"rcv_hub_id","display_name":"Rcv Hub ID","base_type":"type/Text","remapped_to":null,"remapped_from":null},{"name":"conf_start_ts","display_name":"Conf Start Ts","base_type":"type/DateTime","remapped_to":null,"remapped_from":null},{"name":"conf_end_ts","display_name":"Conf End Ts","base_type":"type/DateTime","remapped_to":null,"remapped_from":null},{"name":"err_receivers","display_name":"Err Receivers","base_type":"type/Integer","remapped_to":null,"remapped_from":null},{"name":"err_senders","display_name":"Err Senders","base_type":"type/Integer","remapped_to":null,"remapped_from":null},{"name":"sessions","display_name":"Sessions","base_type":"type/Integer","remapped_to":null,"remapped_from":null}],"rows":[["rnd10-t02-ndb0181a73ced1607e3c39d6113_1513946364640","2017-12-22T12:39:30.000Z","2017-12-22T15:37:56.000Z",10,3,10],["rnd10-t02-ndb01f9fdce861607d83c92410f_1513934277034","2017-12-22T09:17:58.000Z","2017-12-22T09:19:03.000Z",5,5,5],["rnd10-t02-ndb01fcc652121607e383ab5107_1513946102600","2017-12-22T12:35:05.000Z","2017-12-22T12:35:50.000Z",5,3,5],["rnd10-t02-ndb0166b596871607da25cf3e3_1513936280968","2017-12-22T09:51:23.000Z","2017-12-22T09:52:18.000Z",5,3,5],["rnd10-t02-ndb01b96be4361608ded9755113_1514209646568","2017-12-25T13:47:32.000Z","2017-12-25T13:48:57.000Z",4,4,4],["rnd10-t02-ndb01fcc652121607a323610103_1513878599327","2017-12-21T17:50:04.000Z","2017-12-21T17:50:59.000Z",4,4,5],["rnd10-t02-ndb01f9fdce861607f1622ee127_1513960645478","2017-12-22T16:37:27.000Z","2017-12-22T16:38:22.000Z",4,4,5],["rnd10-t02-ndb0166b596871607f269ef4f3_1513961725795","2017-12-22T16:55:27.000Z","2017-12-22T16:56:52.000Z",4,4,5],["rnd10-t02-ndb01fcc6521216079c894adff_1513871676762","2017-12-21T15:54:43.000Z","2017-12-21T15:55:28.000Z",4,4,5],["rnd10-t02-ndb011472acf31607515ccffd7_1513792851400","2017-12-20T18:00:55.000Z","2017-12-20T18:01:55.000Z",4,3,5],["rnd10-t02-ndb011472acf31607dd153ece7_1513939358837","2017-12-22T10:42:44.000Z","2017-12-22T10:43:39.000Z",4,3,5],["rnd10-t02-ndb0181a73ced1608dabda6c123_1514205338357","2017-12-25T12:35:42.000Z","2017-12-25T12:36:42.000Z",4,3,4],["rnd10-t02-ndb011472acf3160751aa306db_1513793168315","2017-12-20T18:06:10.000Z","2017-12-20T18:07:00.000Z",4,3,5],["rnd10-t02-ndb01f9fdce861608df00f66137_1514209808360","2017-12-25T13:50:17.000Z","2017-12-25T13:51:12.000Z",4,3,4],["rnd10-t02-ndb0194f549401608da0b86710b_1514204608753","2017-12-25T12:23:31.000Z","2017-12-25T12:24:31.000Z",4,3,4],["rnd10-t02-ndb0181a73ced1607a019d55107_1513875414503","2017-12-21T16:56:58.000Z","2017-12-21T16:57:53.000Z",4,3,5],["rnd10-t02-ndb0181a73ced1608da96ba411f_1514205178934","2017-12-25T12:33:02.000Z","2017-12-25T12:34:32.000Z",4,3,5],["rnd10-t02-ndb01f9fdce861607ef5795f11f_1513958504928","2017-12-22T16:01:46.000Z","2017-12-22T16:02:46.000Z",4,3,4],["rnd10-t02-ndb0166b596871607e5d32dbe7_1513948525432","2017-12-22T13:15:30.000Z","2017-12-22T13:16:45.000Z",4,3,5],["rnd10-t02-ndb01f9fdce861608d9e3b54133_1514204445674","2017-12-25T12:20:46.000Z","2017-12-25T12:22:16.000Z",4,3,5],["rnd10-t02-ndb01f9fdce861607f05496d123_1513959541223","2017-12-22T16:19:06.000Z","2017-12-22T16:19:46.000Z",3,3,5],["rnd10-t02-ndb0166b596871608db9d192f7_1514206253608","2017-12-25T12:50:57.000Z","2017-12-25T12:51:17.000Z",3,3,3],["rnd10-t02-ndb0181a73ced1608d3065b411b_1514197247754","2017-12-25T10:20:51.000Z","2017-12-25T10:21:11.000Z",3,3,3],["rnd10-t02-ndb01bc0f4ba616074350c8ce7_1513778122021","2017-12-20T13:55:28.000Z","2017-12-20T13:55:28.000Z",3,3,3],["rnd10-t02-ndb01b96be436160747b44baef_1513782723926","2017-12-20T15:12:09.000Z","2017-12-20T15:12:09.000Z",3,3,3],["rnd10-t02-ndb0194f549401608d354d8cff_1514197569066","2017-12-25T10:26:11.000Z","2017-12-25T10:26:31.000Z",3,3,3],["rnd10-t02-ndb011472acf3160746334d3d3_1513781146968","2017-12-20T14:45:48.000Z","2017-12-20T14:45:53.000Z",3,3,3],["rnd10-t02-ndb0194f549401607f1e5794fb_1513961183236","2017-12-22T16:46:27.000Z","2017-12-22T16:47:32.000Z",3,3,5],["rnd10-t02-ndb01bc0f4ba61607d90e9c8113_1513935137356","2017-12-22T09:32:23.000Z","2017-12-22T09:33:03.000Z",3,3,5],["rnd10-t02-ndb01f9fdce8616074d72dd7ff_1513788747397","2017-12-20T16:52:29.000Z","2017-12-20T16:52:34.000Z",1,1,2],["rnd10-t02-ndb01fcc652121607f063a9a117_1513959602953","2017-12-22T16:20:06.000Z","2017-12-22T16:20:06.000Z",1,0,2],["rnd10-t02-ndb01fcc65212160743906e5eb_1513778382696","2017-12-20T13:59:48.000Z","2017-12-20T13:59:48.000Z",1,0,2],["rnd10-t02-ndb0181a73ced160751ba5c7ff_1513793234574","2017-12-20T18:07:20.000Z","2017-12-20T18:07:35.000Z",1,0,2],["rnd10-t02-ndb01b96be4361607d904151ff_1513935094225","2017-12-22T09:31:38.000Z","2017-12-22T09:31:38.000Z",1,0,2],["rnd10-t02-ndb0194f549401607dd0769fe3_1513939302182","2017-12-22T10:41:44.000Z","2017-12-22T10:41:49.000Z",1,0,2],["rnd10-t02-ndb01fcc65212160751701a5f7_1513792930453","2017-12-20T18:02:15.000Z","2017-12-20T18:02:15.000Z",1,0,2],["rnd10-t02-ndb01fcc652121608d6fbf97123_1514201399467","2017-12-25T11:34:16.000Z","2017-12-25T11:34:16.000Z",1,0,1]]},"json_query":{"parameters":null},"status":"completed"}
      }
      updateText = updateText.bind(this)
  }


    render() {
        return (
            <div>
            <Button onClick={handleClick}>Test</Button>
            <div>{JSON.stringify(this.state.json.data.rows)}</div>

            </div>
        )
    }
}

export default UpdateButton;