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
          session_id: array[i][0],
					start_ts: array[i][1],
					end_ts: array[i][2],
					err_in: array[i][3],
					err_out: array[i][4],
					rcv_hub_id: array[i][5]
					});
					}
          console.log(test_data_prepared)
          return test_data_prepared;
        }


let test_data = [["5746ca6c-9645-46ee-9824-6c106ed445af","2017-12-22T12:42:15.000Z","2017-12-22T12:50:15.000Z",0,97,"rnd10-t02-ndb0181a73ced1607e3c39d6113_1513946364640"],["eb1a8e98-1840-4786-8955-ad361a92b9a5","2017-12-22T12:42:00.000Z","2017-12-22T12:42:00.000Z",0,1,"rnd10-t02-ndb0181a73ced1607e3c39d6113_1513946364640"],["7e8faf76-08bf-4477-9181-0407f0f3a646","2017-12-22T12:40:35.000Z","2017-12-22T12:40:50.000Z",0,4,"rnd10-t02-ndb0181a73ced1607e3c39d6113_1513946364640"],["7a33dba5-66f4-49df-94e6-93bcf46938f9","2017-12-22T12:39:40.000Z","2017-12-22T15:38:41.000Z",12,5,"rnd10-t02-ndb0181a73ced1607e3c39d6113_1513946364640"],["53daf8fb-b00c-4afb-94b8-0a4380c8f9c4","2017-12-22T12:50:30.000Z","2017-12-22T15:37:36.000Z",2,673,"rnd10-t02-ndb0181a73ced1607e3c39d6113_1513946364640"],["6deab9c7-2b0d-4c98-8a92-ed951cfe4678","2017-12-22T15:37:56.000Z","2017-12-22T15:38:31.000Z",0,8,"rnd10-t02-ndb0181a73ced1607e3c39d6113_1513946364640"],["7ce0860c-9885-4b52-9538-9d6da03dca76","2017-12-22T12:40:00.000Z","2017-12-22T12:40:20.000Z",0,5,"rnd10-t02-ndb0181a73ced1607e3c39d6113_1513946364640"],["bf518afa-d8b3-48bb-9488-2cf51a5e3e00","2017-12-22T12:39:30.000Z","2017-12-22T12:39:55.000Z",1,3,"rnd10-t02-ndb0181a73ced1607e3c39d6113_1513946364640"],["e02de0b6-1d40-4de0-8c6b-27b5e031fa79","2017-12-22T12:40:55.000Z","2017-12-22T12:41:55.000Z",0,3,"rnd10-t02-ndb0181a73ced1607e3c39d6113_1513946364640"],["629a2ed7-d08d-4006-8099-3c3443c868b3","2017-12-22T15:37:46.000Z","2017-12-22T15:37:51.000Z",0,2,"rnd10-t02-ndb0181a73ced1607e3c39d6113_1513946364640"]]



const columnData = [
  { id: 'session_id', numeric: false, disablePadding: true, label: 'session_id' },
  { id: 'start_ts', numeric: false, disablePadding: true, label: 'start_ts' },
  { id: 'end_ts', numeric: false, disablePadding: true, label: 'end_ts' },
  { id: 'err_in', numeric: false, disablePadding: false, label: 'err_in' },
  { id: 'err_out', numeric: false, disablePadding: false, label: 'err_out' },
  { id: 'rcv_hub_id', numeric: false, disablePadding: true, label: 'rcv_hub_id' },
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
          <Typography type="title">RCV Sessions</Typography>
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

class SessionTable extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      order: 'asc',
      orderBy: 'conf_start_ts',
      selected: [],
      data:   createData1(test_data).sort((a, b) => (a.conf_start_ts < b.conf_start_ts ? -1 : 1)),
      page: 0,
      rowsPerPage: 5,
      hub_id: props.hub_id,
    };
    console.log(this.state.hub_id)
  }

  componentDidMount  = () => {
    fetch('/api/public/card/ed0141ce-857d-4972-8967-1a57206719d3/query?parameters=%5B%7B%22type%22%3A%22category%22%2C%22target%22%3A%5B%22variable%22%2C%5B%22template-tag%22%2C%22rcv_hub_id%22%5D%5D%2C%22value%22%3A%22' + this.state.hub_id + '%22%7D%5D')
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
    const { selected } = this.state;
    console.log(createData1(test_data)[id-1]);
    this.props.changeTabHub('three')
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
                    <TableCell padding="none" href={n.session_id}>{n.session_id}</TableCell>
                    <TableCell><Moment format="YYYY-MM-DD HH:mm:ss">{n.start_ts}</Moment></TableCell>
                    <TableCell><Moment format="YYYY-MM-DD HH:mm:ss">{n.end_ts}</Moment></TableCell>
                    <TableCell numeric>{n.err_in}</TableCell>
                    <TableCell numeric>{n.err_out}</TableCell>
                    <TableCell numeric>{n.rcv_hub_id}</TableCell>
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

SessionTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SessionTable);