"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { User } from "../../types/user";

export default function BasicTable({ user }: { user: User }) {
  const dollarUSLocale = Intl.NumberFormat("en-US");

  if (user.statements.length === 0)
    return (
      <h3 className="text-center font-semibold mb-4">No Transaction Yet</h3>
    );

  return (
    <TableContainer
      sx={{
        mb: 6,
        maxHeight: 600,
      }}
    >
      <Table sx={{ minWidth: 850 }} aria-label="simple table">
        <TableHead
          sx={{
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Account Name</TableCell>
            <TableCell align="right">Account Number</TableCell>
            <TableCell align="right">Bank Name</TableCell>
            <TableCell align="right">Transaction Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.statements?.map((transaction, index) => (
            <TableRow
              key={transaction._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {new Date(transaction?.transactionDate).toLocaleDateString(
                  "en-US"
                )}
              </TableCell>

              <TableCell align="right">
                {`${transaction?.currency}${dollarUSLocale.format(
                  parseInt(transaction?.amount)
                )}`}
              </TableCell>
              <TableCell align="right">
                {transaction?.beneficiaryName}
              </TableCell>
              <TableCell align="right">{transaction?.accountNumber}</TableCell>
              <TableCell align="right">{transaction?.bankName}</TableCell>

              <TableCell align="right">
                <span
                  className={
                    transaction?.transactionType === "debit"
                      ? "text-red-500"
                      : "text-green-500"
                  }
                >
                  {transaction?.transactionType}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
