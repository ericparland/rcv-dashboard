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

function createDataConference(array) {
    var data_prepared=[]
for (var i = 0; i < array.length; i++) {
					data_prepared.push ({
					id: i+1,
          rcv_hub_id: array[i][0],
					conf_start_ts: array[i][1],
					conf_end_ts: array[i][2],
					err_receivers: array[i][3],
					err_senders: array[i][4],
          sessions: array[i][5],
					name: array[i][6],
          conf_name: array[i][7],
          partneraccountid: array[i][8],
          partnerextensionid: array[i][9],
					});
					}
          //console.log(test_data_prepared)
          return data_prepared;
        }


let test_data = []





const columnData = [
  { id: 'rcv_hub_id', numeric: false, disablePadding: true, label: 'Conference ID' },
  { id: 'conf_start_ts', numeric: false, disablePadding: true, label: 'Start' },
  { id: 'conf_end_ts', numeric: false, disablePadding: true, label: 'End' },
  { id: 'err_receivers', numeric: true, disablePadding: false, label: 'Receivers Errors' },
  { id: 'err_senders', numeric: true, disablePadding: false, label: 'Senders Errors' },
  { id: 'sessions', numeric: true, disablePadding: false, label: 'Sessions' },
  { id: 'name', numeric: false, disablePadding: true, label: 'Host' },
  { id: 'conf_name', numeric: false, disablePadding: true, label: 'Conference Name' },
  { id: 'partneraccountid', numeric: false, disablePadding: true, label: 'Host Account ID' },
  { id: 'partnerextensionid', numeric: false, disablePadding: true, label: 'Host Extension ID' },
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

class ConferenceTable extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.componentDidMount = this.componentDidMount.bind(this)
    this.state = {
      isLoading: true,
      error: null,
      order: 'asc',
      orderBy: 'conf_start_ts',
      selected: [],
      data:   createDataConference(test_data).sort((a, b) => (a.conf_start_ts < b.conf_start_ts ? -1 : 1)),
      page: 0,
      rowsPerPage: 10,
    };
  }

  componentDidMount  = () => {
    fetch('/rcv-api/public/card/33b08f09-3498-41ab-8fb9-b6098e379c5b/query')
      .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong ...');
      }
    }).then(function(json) {
      const data_new = createDataConference(json.data.rows).sort((a, b) => (a.conf_start_ts < b.conf_start_ts ? -1 : 1));
      this.setState( { data: data_new });
    }.bind(this)).catch(function(ex) {
      console.log('parsing failed', ex)
    }).then(data => this.setState({ isLoading: false }))
    .catch(error => this.setState({ error, isLoading: false }))
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
  //console.log(data[pp].rcv_hub_id);
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
    const { data, order, orderBy, selected, rowsPerPage, page, isLoading, error } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    var changeTab  =   this.props.changeTab;


    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

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
                    <TableCell padding="none">{n.name}</TableCell>
                    <TableCell padding="none">{n.conf_name}</TableCell>
                    <TableCell padding="none">{n.partneraccountid}</TableCell>
                    <TableCell padding="none">{n.partnerextensionid}</TableCell>

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

ConferenceTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConferenceTable);