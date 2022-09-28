import * as React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Layout from "@theme/Layout";

export default function Home() {

  const tableHead = [
    { id: 'zero', label: '' },
    { id: 'feature', label: 'Feature' },
    { id: 'java', label: 'Java' },
    { id: 'c++', label: 'C++' },
    { id: 'go', label: 'Go' },
    { id: 'python', label: 'Python' }
  ];

  // const tableBody = [
  //   {

  //   }
  // ]
  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
    price: number,
  ) {
    return {
      name,
      calories,
      fat,
      carbs,
      protein,
      price,
      history: [
        {
          date: '2020-01-05',
          customerId: '11091700',
          amount: 3,
        },
        {
          date: '2020-01-02',
          customerId: 'Anonymous',
          amount: 1,
        },
      ],
    };
  }

  const { row } = props;
  const [open, setOpen] = React.useState(false);
  
  return (
    <Layout>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {tableHead.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
}
