import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import { downloadFile, toHHMMSS } from "../actions/index";

const BACKEND_URL = "http://localhost:3001";

function createData(
  date,
  station,
  duration,
  logo,
  downFileName,
  logoFilePath,
  textFilePath
) {
  return {
    date,
    station,
    duration,
    logo,
    downFileName,
    logoFilePath,
    textFilePath,
  };
}

function downloadFILE(ad, med, channel, filename) {
  downloadFile({
    ad_type: ad,
    med_type: med,
    channel_name: channel,
    down_file: filename,
  });
}

const rows = [];

function loadMediaFileRows(data) {
  rows.length = 0;
  if (data.filelist.length > 0) {
    for (var i = 0; i < data.filelist.length; i++) {
      var strTempList = data.filelist[i].filename.split(".");
      var sDuration = toHHMMSS(data.filelist[i].duration);
      var viewfileName = "";
      var mainfilename = strTempList[0] + ".";
      for (var j = 1; j < strTempList.length - 1; j++) {
        viewfileName += strTempList[j];
        mainfilename += strTempList[j];
        if (j < strTempList.length - 1) {
          viewfileName += ".";
          mainfilename += ".";
        }
      }
      if (data.medType === "video") {
        viewfileName += "mp4";
        mainfilename += "mp4";
      } else if (data.medType === "audio") {
        viewfileName += "mp3";
        mainfilename += "mp3";
      }
      const downFilePath = BACKEND_URL + __dirname + data.filelist[i].filepath;
      const logoPath =
        data.filelist[i].logopath === undefined ||
        data.filelist[i].logopath.length === 0
          ? ""
          : BACKEND_URL + __dirname + data.filelist[i].logopath[0].path;
      const textPath =
        data.filelist[i].textpath === undefined ||
        data.filelist[i].textpath === ""
          ? ""
          : BACKEND_URL + __dirname + data.filelist[i].textpath;
      rows.push(
        createData(
          viewfileName,
          data.channelname,
          sDuration,
          data.adType,
          downFilePath,
          logoPath,
          textPath
        )
      );
    }
  }
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "date",
    numeric: false,
    disablePadding: true,
    label: "Date / Time",
  },
  {
    id: "station",
    numeric: false,
    disablePadding: false,
    label: "Station Name",
  },
  {
    id: "duration",
    numeric: false,
    disablePadding: false,
    label: "AD Duration",
  },
  {
    id: "logo",
    numeric: false,
    disablePadding: false,
    label: "Logo name ",
  },
  {
    id: "downFileName",
    numeric: false,
    disablePadding: false,
    label: "-",
  },
];

function DataGridDemoHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            // sortDirection={orderBy === headCell.id ? order : false}
          >
            {/* <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        > */}
            {headCell.label}
            {/* {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel> */}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

DataGridDemoHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  // onRequestSort: PropTypes.func.isRequired,
  // onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function DataGridDemoToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        // ...(numSelected > 0 && {
        //     bgcolor: (theme) =>
        //         alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        // }),
      }}
    >
      {/* {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : ( */}
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        MediaList
      </Typography>
      {/* )} */}

      {/* {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : ( */}
      {/* <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip> */}
      {/* )} */}
    </Toolbar>
  );
}

DataGridDemoToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function DataGridDemo(props) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(24);

  const {
    data,
    setVURL = () => {},
    setAURL = () => {},
    setLIURL = () => {},
    setTURL = () => {},
  } = props;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  loadMediaFileRows(data);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.date);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, row) => {
    // const selectedIndex = selected.indexOf(name);
    // let newSelected = [];

    // if (selectedIndex === -1) {
    //     newSelected = newSelected.concat(selected, name);
    // } else if (selectedIndex === 0) {
    //     newSelected = newSelected.concat(selected.slice(1));
    // } else if (selectedIndex === selected.length - 1) {
    //     newSelected = newSelected.concat(selected.slice(0, -1));
    // } else if (selectedIndex > 0) {
    //     newSelected = newSelected.concat(
    //         selected.slice(0, selectedIndex),
    //         selected.slice(selectedIndex + 1),
    //     );
    // }

    // setSelected(newSelected);

    var downFileName = row.downFileName;
    var logoFileName = row.logoFilePath;
    var textFileName = row.textFilePath;
    if (data.medType === "video") {
      setVURL(downFileName);
    } else if (data.medType === "audio") {
      setAURL(downFileName);
    }
    setLIURL(logoFileName);
    setTURL(textFileName);
    setSelected(row.date);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <DataGridDemoToolbar numSelected={selected.length} />
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <DataGridDemoHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.date);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.date}
                      selected={isItemSelected}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        align="center"
                        padding="none"
                      >
                        {row.date}
                      </TableCell>
                      <TableCell align="center">{row.station}</TableCell>
                      <TableCell align="center">{row.duration}</TableCell>
                      <TableCell align="center">{row.logo}</TableCell>
                      <TableCell align="center">
                        {
                          <Button
                            variant="outlined"
                            size="small"
                            color="error"
                            endIcon={<FileDownloadIcon />}
                            onClick={() => {
                              downloadFILE(
                                data.adType,
                                data.medType,
                                data.channelname,
                                row.downFileName
                              );
                            }}
                          >
                            Export
                          </Button>
                        }
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[12, 24, 36]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
