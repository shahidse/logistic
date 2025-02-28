"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import CustomizeCheckBox from "./CustomizeCheckBox";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "var(--secondary)",
        color: theme.palette.common.white,
        fontWeight: "bold",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

interface DynamicTableProps {
    data: any[];
}

export default function DynamicTable({ data }: DynamicTableProps) {
    if (data.length === 0) return <p>No data available</p>;

    const columns = Object.keys(data[0]);
    const [selected, setSelected] = React.useState<number[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelected(data.map((row) => row.id)); // Select all IDs
        } else {
            setSelected([]);
        }
    };

    const handleSelectRow = (id: number) => {
        setSelected((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((selectedId) => selectedId !== id)
                : [...prevSelected, id]
        );
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: "500px", overflow: "auto" }}>
                <Table stickyHeader aria-label="dynamic table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>
                                <CustomizeCheckBox
                                    indeterminate={selected.length > 0 && selected.length < data.length}
                                    checked={selected.length === data.length}
                                    onChange={handleSelectAll}
                                />
                            </StyledTableCell>
                            {columns.map((col) => (
                                <StyledTableCell key={col}>{col.toUpperCase()}</StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell>
                                        <CustomizeCheckBox
                                            checked={selected.includes(row.id)}
                                            onChange={() => handleSelectRow(row.id)}
                                            sx={{
                                                "&.Mui-checked": {
                                                    borderColor: "var(--info)", // Border color when checked
                                                    backgroundColor: "var(--info)", // Background when checked
                                                    color: "#fff",
                                                },
                                            }}
                                        />
                                    </StyledTableCell>
                                    {columns.map((col) => (
                                        <StyledTableCell key={col}>
                                            {typeof row[col] === "object" ? JSON.stringify(row[col]) : row[col]}
                                        </StyledTableCell>
                                    ))}
                                </StyledTableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
