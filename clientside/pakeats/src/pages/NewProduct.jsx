import { Card, Grid } from "@mui/material";
import { useTheme } from "@mui/system";
import React from "react";
import CreateProduct from "../components/CreateProduct";
import DashboardSideBar from "../components/DashboardSideBar";
import MyTypography from "../components/muiElements/MyTypography";
import { PageContainer } from "../styles/globalStyles";

const NewProduct = () => {
  const theme = useTheme();
  return (
    <PageContainer>
      <Grid container my={1} spacing={2}>
        <DashboardSideBar theme={theme} />

        <Grid item xs={12} sm={8} md={9} lg={9} xl={10}>

        <Card raised="true" sx={{ padding: "18px" }}>
        <MyTypography variant={"h5"} text={"Create New Product"} />
        <CreateProduct />
        </Card>

        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default NewProduct;
