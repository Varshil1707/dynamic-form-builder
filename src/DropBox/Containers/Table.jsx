import React from 'react'
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 17,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(data) {
    return { name: data[0], Email: data[1], PhoneNo: data[2], Gender: data[3] };
  }
  
export const tableInfo = {
    columns: ["User", "Email", "PhoneNo", "Gender"],
    data: [
        ['Frozen yoghurt', 'Test@gmail.com', 1234567890, 'male'],
        ['Ice cream sandwich', 'Ecosmob@gamil.com', 1823476095, 'female']
    ]
};

const Table1 = ({ index, info }) => {
    let columns = tableInfo.columns;
    let rows = tableInfo.data.map(row => createData(row));
    if (info != null) {
        columns = info.columns;
        rows = info.data.map(row => createData(row));
    }
    console.log('rows', rows);

    // const rows = [
    //     createData('Frozen yoghurt', 'Test@gmail.com', 1234567890, 'male'),
    //     createData('Ice cream sandwich', 'Ecosmob@gamil.com', 1823476095, 'female'),
    // ];

    return (
        <div>
            <Box className="table-container" boxShadow={5} id={`table-container-${index}`} border={1} p={2} mb={2}>
                <Box >
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 50 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    {
                                        columns.map((column, index) => <StyledTableCell key={index} align="center">{column}</StyledTableCell>)
                                    }
                                    {/* <StyledTableCell align="center">User</StyledTableCell>
                                    <StyledTableCell align="center">Email</StyledTableCell>
                                    <StyledTableCell align="center">PhoneNo</StyledTableCell>
                                    <StyledTableCell align="center">Gender</StyledTableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <StyledTableRow key={row.name} >
                                        <StyledTableCell component="th" scope="row" align="center">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{row.Email}</StyledTableCell>
                                        <StyledTableCell align="center">{row.PhoneNo}</StyledTableCell>
                                        <StyledTableCell align="center">{row.Gender}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </div>
    )
}
export default Table1;
