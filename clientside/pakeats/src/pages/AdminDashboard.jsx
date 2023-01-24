import { Grid, Stack } from "@mui/material";
import React from "react";
import DashboardSideBar from "../components/DashboardSideBar";
import MyTypography from "../components/muiElements/MyTypography";
import { PageContainer } from "../styles/globalStyles";
import { useTheme } from "@mui/system";
import DashboardMainPage from "../components/DashboardMainPage";

const AdminDashboard = () => {
    const theme = useTheme();
  return (
    <PageContainer>
      <Grid container my={2} spacing={2}>
        <DashboardSideBar theme={theme} />
        <DashboardMainPage />
      </Grid>
    </PageContainer>
  );
};

export default AdminDashboard;
