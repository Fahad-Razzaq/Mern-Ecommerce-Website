import { Card, Grid, ListItemButton, ListItemText, Stack } from "@mui/material";
import React from "react";
import { RouterNavLink } from "../styles/globalStyles";
import MyTypography from "./muiElements/MyTypography";

const DashboardSideBar = ({theme}) => {
  return (
    <Grid item xs={12} sm={4} md={3} lg={3} xl={2}>
      <Card raised={true} sx={{ padding: "12px"}}>
        <Stack>
          {/* <MyTypography variant={"h6"} text={"Categories"} /> */}

          <RouterNavLink
            to={"/dashboard"}
            end
            linkcolor={theme.palette.neutral.main}
          >
            <ListItemButton>
              <ListItemText primary={"Dashboard"} />
            </ListItemButton>
          </RouterNavLink>

          <RouterNavLink
            to={"/orders"}
            end
            linkcolor={theme.palette.neutral.main}
          >
            <ListItemButton>
              <ListItemText primary={"Orders"} />
            </ListItemButton>
          </RouterNavLink>

          <RouterNavLink
            to={"/users"}
            end
            linkcolor={theme.palette.neutral.main}
          >
            <ListItemButton>
              <ListItemText primary={"Users"} />
            </ListItemButton>
          </RouterNavLink>

          <RouterNavLink
            to={"/products"}
            end
            linkcolor={theme.palette.neutral.main}
          >
            <ListItemButton>
              <ListItemText primary={"Products"} />
            </ListItemButton>
          </RouterNavLink>

        </Stack>
      </Card>
    </Grid>
  );
};

export default DashboardSideBar;
