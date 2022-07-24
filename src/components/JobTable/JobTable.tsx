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
import { GetAllJobData, GetJobsDataFromAWS } from "../../services/JobService";
import { Button } from "@mui/material";
import SingleSelectFilter from "./../SingleSelectFilter/SingleSelectFilter";
import { ClearAll, Search } from "@mui/icons-material";
import { jobsData } from "./../../utils/MockData";
import { FiltersIntialState, Option } from "../../models/Option";
import { useContext } from "react";
import { FilterContext } from "../../contexts/filter.context";
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import SeeMore from './../SeeMore/SeeMore';
import useMediaQuery from '@mui/material/useMediaQuery';
import { UserContext } from "./../../contexts/user.context";




const style = {
  position: 'absolute' as 'absolute',
  width:'40%',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius:'20px'
};

const loggeoutStyle = {
  position: 'absolute' as 'absolute',
  // width:'40%',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius:'20px'
}

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
  {
    id: "postedBy",
    label: "Posted By",
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





export default function JobTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(500);
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("level");
  const [rows, setRows] = React.useState<Data[]>([]);
  const [filteredRows, setFilterdRows] = React.useState<Data[]>([]);
  const [modalData,setModalData] = React.useState<any>({});
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const isMobile = useMediaQuery('(max-width:420px)');
  const { currentUser,setCurrentUser } = useContext(UserContext);

  console.log("isMobile : ",isMobile )

  React.useEffect(() => {
    
    let alteredJobsData: any = jobsData;
    jobsData.map((data, index) => {
      alteredJobsData[index].masked = true;
    });
    ///For mock local data uncomment below code
    // setRows(alteredJobsData);
    // setFilterdRows(jobsData);
   /// =======================================
    //for firebase data uncomment below code
    GetAllJobData().then((result) => {
      console.log("setting the rows",result);
      let actualData:any = result;
      actualData.map((data:any,index:number)=>{
        actualData[index].masked = true;
      });
      setRows(actualData);
      setFilterdRows(result);   
    });

    //============================
    //From AWS api
    // GetJobsDataFromAWS().then(async (result)=>{
    //   console.log("AWS data :",result)
    //   console.log("setting the rows",result);
    //   let actualData:any = result;
    //   await actualData.map((data:any,index:number)=>{
    //     actualData[index].masked = true;
    //   });
    //   console.log("actualData",actualData)
    //   setRows(actualData);
    //   setFilterdRows(result); 
    // });

    
  }, []);

  // React.useEffect(()=>{
  //   const currentData: any = filteredRows.slice();
  //     currentData.map((value: any, index: number) => {
  //       currentData[index].masked = true;
  //     });
  //     setFilterdRows(currentData);
  // },[currentUser])


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
  const { selectedfilters, setselectedfilters } = useContext(FilterContext);

  const onSearchButtonClick = () => {
    console.log("These are selected filters : ", selectedfilters)

    const fromNumberOfDays = +selectedfilters.filterByDate * 7;
    let fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - fromNumberOfDays)

    console.log(fromDate)

    console.log("Before filter result : ", rows)
    const filteredResult: Data[] = rows.filter((item) => {
      return (selectedfilters.filterByLocation !== "" ? item.location === selectedfilters.filterByLocation : 1)
        && (selectedfilters.filterByLevel !== "" ? item.level === selectedfilters.filterByLevel : 1)
        && (selectedfilters.filterByDate !== "" ? new Date(item.dateOfPosting) >= fromDate : 1)
    })
    console.log('filteredResult :', filteredResult)
    setFilterdRows(filteredResult)

  }

  const onClearAllButtonClick = () => {
    console.log(FiltersIntialState);
    setselectedfilters({ ...FiltersIntialState })
    setFilterdRows(rows);
    console.log("POST clearThese are selected filters : ", selectedfilters)
  }

  const onUnmaskingEmail = (data: any) => {
    if(currentUser != null){
      const currentData: any = filteredRows.slice();
      currentData.map((value: any, index: number) => {
        if (data.jobId == value.jobId) {
          currentData[index].masked = false
        }
      });
      setFilterdRows(currentData);
    }else{
      handleOpen();
    }
    
  }

  const handleModal = (data:any) => {
    setModalData(data);
    setTimeout(()=>{
      handleOpen();
    },25)
  }

  console.log('ModalData----->',modalData);
  return (
    
    <Box>
      
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile? "column":"row",
          justifyContent: "space-between",
          py: 1,
        }}
      >
        <Box sx={{width: isMobile? "100%" :"20%"  }}>
          {/* <JobSearchInput onSearchQueryChange={handleSearchQueryFilterChange} /> */}
          <SingleSelectFilter
            options={dates}
            label="Date"
            name="filterByDate"
          />
        </Box>
        <Box sx={{ width: isMobile? "100%" :"20%", px: isMobile? 0: 1 }}>
          <SingleSelectFilter
            options={locations}
            label="Location"
            name="filterByLocation"
          />
        </Box>
        <Box sx={{ width: isMobile? "100%" :"20%", pr: isMobile? 0:1 }}>
          <SingleSelectFilter
            options={levels}
            label="Level"
            name="filterByLevel"
          />
        </Box>
{/* for button box desktop width will be 40% */}
        <Box sx={{ width: isMobile? "100%" :"40%" }}>
          <Button
            sx={{ py: 1, width: "48%" }}
            variant="contained"
            size="small"
            endIcon={<Search />}
            onClick={onSearchButtonClick}
          >
            Search
          </Button>
          <Button
            sx={{ py: 1, width: "48%",ml:1 }}
            variant="outlined"
            size="small"
            endIcon={<ClearAll />}
            onClick={onClearAllButtonClick}       
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
                  return <JobTableRow tableColumns={columns} row={row} onDataChange={(data) => onUnmaskingEmail(data)} handleModal={(data)=> handleModal(data)}/>;
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
       <SeeMore/>
      </Paper>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        {currentUser != null ? 
        <Box sx={style}>
          {modalData && Object.keys(modalData).map(key=>(
                key != 'masked' ?
                <>
                <Typography variant="h6" gutterBottom component="div" style={{fontWeight:'bold'}}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {modalData[key]}
                </Typography>
              </>
              :<></>))
          }
        </Box> :
        <Box sx= {loggeoutStyle}>
          <Typography variant="caption" display="block" gutterBottom>
            {"Signin to see more."}
          </Typography>
        </Box> 
        }
      </Modal>
      {/* Model for mobile input */}
      
      
    </Box>
  );
}
