import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import keycode from 'keycode';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from 'material-ui-icons/Delete';
import FilterListIcon from 'material-ui-icons/FilterList';
import Moment from 'react-moment';



let counter = 0;
function createData(name, calories, fat, carbs, protein) {
  counter += 1;
  return { id: counter, name, calories, fat, carbs, protein };
}

function createData1(array) {
    var test_data_prepared=[]
for (var i = 0; i < array.length; i++) {
					test_data_prepared.push ({
					id: i+1,
          rcv_hub_id: array[i][0],
					conf_start_ts: array[i][1],
					conf_end_ts: array[i][2],
					err_receivers: array[i][3],
					err_senders: array[i][4],
					sessions: array[i][5]
					});
					}
          //console.log(test_data_prepared)
          return test_data_prepared;
        }


let test_data = [] //[["rnd10-t02-ndb0181a73ced1607e3c39d6113_1513946364640","2017-12-22T12:39:30.000Z","2017-12-22T15:37:56.000Z",10,3,10],["rnd10-t02-ndb01f9fdce861607d83c92410f_1513934277034","2017-12-22T09:17:58.000Z","2017-12-22T09:19:03.000Z",5,5,5],["rnd10-t02-ndb01fcc652121607e383ab5107_1513946102600","2017-12-22T12:35:05.000Z","2017-12-22T12:35:50.000Z",5,3,5],["rnd10-t02-ndb0166b596871607da25cf3e3_1513936280968","2017-12-22T09:51:23.000Z","2017-12-22T09:52:18.000Z",5,3,5],["rnd10-t02-ndb01b96be4361608ded9755113_1514209646568","2017-12-25T13:47:32.000Z","2017-12-25T13:48:57.000Z",4,4,4],["rnd10-t02-ndb01fcc652121607a323610103_1513878599327","2017-12-21T17:50:04.000Z","2017-12-21T17:50:59.000Z",4,4,5],["rnd10-t02-ndb01f9fdce861607f1622ee127_1513960645478","2017-12-22T16:37:27.000Z","2017-12-22T16:38:22.000Z",4,4,5],["rnd10-t02-ndb0166b596871607f269ef4f3_1513961725795","2017-12-22T16:55:27.000Z","2017-12-22T16:56:52.000Z",4,4,5],["rnd10-t02-ndb01fcc6521216079c894adff_1513871676762","2017-12-21T15:54:43.000Z","2017-12-21T15:55:28.000Z",4,4,5],["rnd10-t02-ndb011472acf31607515ccffd7_1513792851400","2017-12-20T18:00:55.000Z","2017-12-20T18:01:55.000Z",4,3,5],["rnd10-t02-ndb011472acf31607dd153ece7_1513939358837","2017-12-22T10:42:44.000Z","2017-12-22T10:43:39.000Z",4,3,5],["rnd10-t02-ndb0181a73ced1608dabda6c123_1514205338357","2017-12-25T12:35:42.000Z","2017-12-25T12:36:42.000Z",4,3,4],["rnd10-t02-ndb011472acf3160751aa306db_1513793168315","2017-12-20T18:06:10.000Z","2017-12-20T18:07:00.000Z",4,3,5],["rnd10-t02-ndb01f9fdce861608df00f66137_1514209808360","2017-12-25T13:50:17.000Z","2017-12-25T13:51:12.000Z",4,3,4],["rnd10-t02-ndb0194f549401608da0b86710b_1514204608753","2017-12-25T12:23:31.000Z","2017-12-25T12:24:31.000Z",4,3,4],["rnd10-t02-ndb0181a73ced1607a019d55107_1513875414503","2017-12-21T16:56:58.000Z","2017-12-21T16:57:53.000Z",4,3,5],["rnd10-t02-ndb0181a73ced1608da96ba411f_1514205178934","2017-12-25T12:33:02.000Z","2017-12-25T12:34:32.000Z",4,3,5],["rnd10-t02-ndb01f9fdce861607ef5795f11f_1513958504928","2017-12-22T16:01:46.000Z","2017-12-22T16:02:46.000Z",4,3,4],["rnd10-t02-ndb0166b596871607e5d32dbe7_1513948525432","2017-12-22T13:15:30.000Z","2017-12-22T13:16:45.000Z",4,3,5],["rnd10-t02-ndb01f9fdce861608d9e3b54133_1514204445674","2017-12-25T12:20:46.000Z","2017-12-25T12:22:16.000Z",4,3,5],["rnd10-t02-ndb01f9fdce861607f05496d123_1513959541223","2017-12-22T16:19:06.000Z","2017-12-22T16:19:46.000Z",3,3,5],["rnd10-t02-ndb0166b596871608db9d192f7_1514206253608","2017-12-25T12:50:57.000Z","2017-12-25T12:51:17.000Z",3,3,3],["rnd10-t02-ndb0181a73ced1608d3065b411b_1514197247754","2017-12-25T10:20:51.000Z","2017-12-25T10:21:11.000Z",3,3,3],["rnd10-t02-ndb01bc0f4ba616074350c8ce7_1513778122021","2017-12-20T13:55:28.000Z","2017-12-20T13:55:28.000Z",3,3,3],["rnd10-t02-ndb01b96be436160747b44baef_1513782723926","2017-12-20T15:12:09.000Z","2017-12-20T15:12:09.000Z",3,3,3],["rnd10-t02-ndb0194f549401608d354d8cff_1514197569066","2017-12-25T10:26:11.000Z","2017-12-25T10:26:31.000Z",3,3,3],["rnd10-t02-ndb011472acf3160746334d3d3_1513781146968","2017-12-20T14:45:48.000Z","2017-12-20T14:45:53.000Z",3,3,3],["rnd10-t02-ndb0194f549401607f1e5794fb_1513961183236","2017-12-22T16:46:27.000Z","2017-12-22T16:47:32.000Z",3,3,5],["rnd10-t02-ndb01bc0f4ba61607d90e9c8113_1513935137356","2017-12-22T09:32:23.000Z","2017-12-22T09:33:03.000Z",3,3,5],["rnd10-t02-ndb01f9fdce8616074d72dd7ff_1513788747397","2017-12-20T16:52:29.000Z","2017-12-20T16:52:34.000Z",1,1,2],["rnd10-t02-ndb01fcc652121607f063a9a117_1513959602953","2017-12-22T16:20:06.000Z","2017-12-22T16:20:06.000Z",1,0,2],["rnd10-t02-ndb01fcc65212160743906e5eb_1513778382696","2017-12-20T13:59:48.000Z","2017-12-20T13:59:48.000Z",1,0,2],["rnd10-t02-ndb0181a73ced160751ba5c7ff_1513793234574","2017-12-20T18:07:20.000Z","2017-12-20T18:07:35.000Z",1,0,2],["rnd10-t02-ndb01b96be4361607d904151ff_1513935094225","2017-12-22T09:31:38.000Z","2017-12-22T09:31:38.000Z",1,0,2],["rnd10-t02-ndb0194f549401607dd0769fe3_1513939302182","2017-12-22T10:41:44.000Z","2017-12-22T10:41:49.000Z",1,0,2],["rnd10-t02-ndb01fcc65212160751701a5f7_1513792930453","2017-12-20T18:02:15.000Z","2017-12-20T18:02:15.000Z",1,0,2],["rnd10-t02-ndb01fcc652121608d6fbf97123_1514201399467","2017-12-25T11:34:16.000Z","2017-12-25T11:34:16.000Z",1,0,1]];







const columnData = [
  { id: 'rcv_hub_id', numeric: false, disablePadding: true, label: 'rcv_hub_id' },
  { id: 'conf_start_ts', numeric: false, disablePadding: true, label: 'conf_start_ts' },
  { id: 'conf_end_ts', numeric: false, disablePadding: true, label: 'conf_end_ts' },
  { id: 'err_receivers', numeric: true, disablePadding: true, label: 'err_receivers' },
  { id: 'err_senders', numeric: true, disablePadding: true, label: 'err_senders' },
  { id: 'sessions', numeric: true, disablePadding: true, label: 'sessions' },
];

class EnhancedTableHead extends React.Component {
  static propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };


  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">

          </TableCell>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

const toolbarStyles = theme => ({
  root: {
    paddingRight: 2,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.A700,
          backgroundColor: theme.palette.secondary.A100,
        }
      : {
          color: theme.palette.secondary.A100,
          backgroundColor: theme.palette.secondary.A700,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography type="subheading">{numSelected} selected</Typography>
        ) : (
          <Typography type="title">RCV Hubs</Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip>
            <IconButton>
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 800,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EnhancedTable extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.componentDidMount = this.componentDidMount.bind(this)
    this.state = {
      order: 'asc',
      orderBy: 'conf_start_ts',
      selected: [],
      data:   createData1(test_data).sort((a, b) => (a.conf_start_ts < b.conf_start_ts ? -1 : 1)),
      page: 0,
      rowsPerPage: 10,
    };
  //  console.log(this.state.data)
  }

  componentDidMount  = () => {
    fetch('/api/public/card/b5e706d3-0b04-48b7-8854-00d780d39c68/query')
    .then(function(response) {
    return response.json()
    }).then(function(json) {
    console.log('parsed json', json.data.rows)
    const data_new = createData1(json.data.rows).sort((a, b) => (a.conf_start_ts < b.conf_start_ts ? -1 : 1));
    this.setState( { data: data_new });
    }.bind(this)).catch(function(ex) {
    console.log('parsing failed', ex)
  })
}



  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleKeyDown = (event, id) => {
    if (keycode(event) === 'space') {
      this.handleClick(event, id);
    }
  };

  handleClick = (event, id) => {
    const { selected, data } = this.state;
    //console.log(data[id-1].rcv_hub_id);
    var pp = data.map(function (img) { return img.id; }).indexOf(id);
    console.log(data[pp].rcv_hub_id);
    this.props.changeTabHub('two')
    this.props.hub_id(data[pp].rcv_hub_id)
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    var changeTab  =   this.props.changeTab;

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                const isSelected = this.isSelected(n.id);
                return (
                  <TableRow
                    hover
                    onClick={event => this.handleClick(event, n.id)}
                    onKeyDown={event => this.handleKeyDown(event, n.id)}
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                    </TableCell>
                    <TableCell padding="none" href={n.rcv_hub_id}>{n.rcv_hub_id}</TableCell>
                    <TableCell><Moment format="YYYY-MM-DD HH:mm:ss">{n.conf_start_ts}</Moment></TableCell>
                    <TableCell><Moment format="YYYY-MM-DD HH:mm:ss">{n.conf_end_ts}</Moment></TableCell>
                    <TableCell numeric>{n.err_receivers}</TableCell>
                    <TableCell numeric>{n.err_senders}</TableCell>
                    <TableCell numeric>{n.sessions}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);