import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import JobTableRow from "../JobTableRow/JobTableRow";
import Box from "@mui/material/Box";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import { Data } from "../../models/Job";
import { Column } from "../../models/JobTableColumns";
import { GetAllJobData } from "../../services/JobService";
import { Button, styled } from "@mui/material";
import SingleSelectFilter from "./../SingleSelectFilter/SingleSelectFilter";
import JobSearchInput from "./../JobSearchInput/JobSearchInput";
import { ClearAll, Search } from "@mui/icons-material";
import { jobsData } from "./../../utils/MockData";
import { Option } from "../../models/Option";




export const locations: Option[] = [
  { key: "Banglore", value: "Banglore" },
  { key: "Chennai", value: "Chennai" },
  { key: "Mumbai", value: "Mumbai" },
  { key: "Pune", value: "Pune" },
  { key: "Delhi", value: "Delhi" },
  { key: "Hydrabad", value: "Hydrabad" },
];

export const levels: Option[] = [
  { key: "Fresher", value: "Fresher" },
  { key: "Senior", value: "Senior" },
  { key: "Expert", value: "Expert" },
];

export const dates: Option[] = [
  { key: "1", value: "by 1 Week" },
  { key: "2", value: "by 2 week" },
  { key: "3", value: "by 3 week" },
  { key: "4", value: "by Month" },
];

const columns: Column[] = [
  // { id: 'jobId', label: 'JobID', minWidth: 20  },
  {
    id: "dateOfPosting",
    label: "Date Of Posting",
    minWidth: 140,
  },
  { id: "title", label: "Title", minWidth: 300 },
  { id: "company", label: "Company", minWidth: 100 },
  // {
  //   id: 'description',
  //   label: 'Description',
  //   minWidth: 170,
  // },
  {
    id: "location",
    label: "Location",
    minWidth: 100,
  },
  // {
  //   id: 'remote',
  //   label: 'Remote',
  //   minWidth: 170,
  // },
  {
    id: "level",
    label: "Level",
    minWidth: 100,
  },
  {
    id: "hrEmail",
    label: "HR Email",
    minWidth: 120,
  },
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function filterRows(field: string, data: Data[], value: string) {}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function JobTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(500);
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("level");
  const [rows, setRows] = React.useState<Data[]>([]);
  const [filteredRows, setFilterdRows] = React.useState<Data[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [cityFilter, setCityFilter] = React.useState("");
  const [levelFilter, setLevelFilter] = React.useState("");

  React.useEffect(() => {
    setRows(jobsData);
    setFilterdRows(jobsData);
    // GetAllJobData().then((result) => {
    //   console.log("setting the rows",result)
    //   setRows(result);
    //   setFilterdRows(result);
    // });
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };

  // const handleSearchQueryFilterChange = (query: string) => {
  //   console.log("Search Query", query);
  // };

  // const onSelectedItemChange = (label: string, value: string) => {
  //   console.log("label : ", label, "ChangedValue", value);
  // };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          py: 1,
        }}
      >
        <Box sx={{ width: "20%" }}>
          {/* <JobSearchInput onSearchQueryChange={handleSearchQueryFilterChange} /> */}
          <SingleSelectFilter
            options={dates}
            label="Date" 
            name="filterByDate"
          />
        </Box>
        <Box sx={{ width: "20%", px: 1 }}>
          <SingleSelectFilter
            options={locations}
            label="Location"
            name="filterByLocation"
          />
        </Box>
        <Box sx={{ width: "20%", pr: 1 }}>
          <SingleSelectFilter
            options={levels}
            label="Level"
            name="filterByLevel"
          />
        </Box>

        <Box sx={{ width: "20%" }}>
          <Button
            sx={{ py: 1, width: "45%" }}
            variant="contained"
            size="small"
            endIcon={<Search />}
          >
            Search
          </Button>
          <Button
            sx={{ py: 1, width: "45%",ml:1 }}
            variant="outlined"
            size="small"
            endIcon={<ClearAll />}
          >
            Clear All
          </Button>
        </Box>
      </Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 1 }}>
          <Table stickyHeader aria-label="sticky table" size="small">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    sortDirection={orderBy === column.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : "asc"}
                      onClick={createSortHandler(column.id)}
                    >
                      {column.label}
                      {orderBy === column.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === "desc"
                            ? "sorted descending"
                            : "sorted ascending"}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .sort(getComparator(order, orderBy))
                .map((row) => {
                  return <JobTableRow tableColumns={columns} row={row} />;
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
