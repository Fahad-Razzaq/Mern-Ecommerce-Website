import { Backdrop, Box, CircularProgress, Grid } from "@mui/material";
import { useTheme } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import DashboardSideBar from "../components/DashboardSideBar";
import MyButton from "../components/muiElements/MyButton";
import MyTypography from "../components/muiElements/MyTypography";
import { userRequest } from "../requestMethods";
import { PageContainer } from "../styles/globalStyles";

const Orders = () => {
  const theme = useTheme();
  const [ordersData, setOrdersData] = useState(null);
  useEffect(() => {
    console.log("Requesting Orders Data");
    const getOrders = async () => {
      const res = await userRequest.get("/order");
      setOrdersData(res.data);
    };
    getOrders();
  }, []);
  console.log(ordersData);

  const columns = [
    { field: "_id", headerName: "ID", width: 150 },
    { field: "userId", headerName: "User Id", width: 150 },
    // { field: "user", headerName: "User", width: 150 },
    { field: "productId", headerName: "Product Id", width: 150 },
    { field: "quantity", headerName: "Quantity", width: 70 },
    { field: "amount",headerName: "Amount",width: 70,},
    { field: "address", headerName: "Address", width: 220 },
    // { field: "vendorId", headerName: "Vendor Id", width: 150 },
    { field: "status", headerName: "Delivery Status", width: 150 },
    { field: "stripeToken_id", headerName: "Stripe Token Id", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <>
                <MyButton
                  variant={"contained"}
                  text={"View"}
                  size={"small"}
                  fullWidth={false}
                  color={"primary"}
                />
          </>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <Grid container my={2} spacing={2}>
        <DashboardSideBar theme={theme} />

        <Grid item xs={12} sm={8} md={9} lg={9} xl={10}>
          <MyTypography variant={"h5"} text={"Orders Details"} />
          {ordersData ? (
            <DataGrid
              rows={ordersData}
              columns={columns}
              getRowId={(row) => row._id}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              disableSelectionOnClick
              sx={{ height: "371px" }}
            />
          ) : (
            <Backdrop open={true}>
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Orders;
