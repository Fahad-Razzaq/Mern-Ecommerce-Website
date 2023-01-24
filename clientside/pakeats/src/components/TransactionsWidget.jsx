import {
  Alert,
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import React from "react";
import { Image } from "../styles/globalStyles";
import MyTypography from "./muiElements/MyTypography";

const TransactionsWidget = ({ title, productsData }) => {
  return (
    <Card raised="true" sx={{ padding: "18px", marginTop: "24px" }}>
      <MyTypography variant={"h6"} text={title} gutterBottom={true} />
      <TableContainer component={Paper} elevation={1}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {productsData.map((product) => {
              return (
                <TableRow>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",
                      }}
                    >
                      <Box sx={{ marginRight: "15px" }}>
                        <Image src={product.image} width="40px" />
                      </Box>
                      <MyTypography variant={"body1"} text={product.name} />
                    </Box>
                  </TableCell>
                  <TableCell>{product.date}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>
                    {product.status ? (
                      <Alert icon={false} variant="filled" severity={"success"}>
                        Approved
                      </Alert>
                    ) : (
                      <Alert icon={false} variant="filled" severity={"error"}>
                        Declined
                      </Alert>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default TransactionsWidget;
