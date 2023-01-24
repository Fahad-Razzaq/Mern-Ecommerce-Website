import { Close, Menu } from "@mui/icons-material";
import {
  Box,
  Drawer,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/system";
import React, { useState } from "react";
import { MENULINKS } from "../../data/GlobalData";
import { RouterNavLink } from "../../styles/globalStyles";
import MyTypography from "../muiElements/MyTypography";

const AppDrawer = () => {
  const theme = useTheme();

  const [isAppDrawerOpen, setIsAppDrawerOpen] = useState(false);
  return (
    <>
      <IconButton onClick={() => setIsAppDrawerOpen(true)}>
        <Icon>
          <Menu color="common" />
        </Icon>
      </IconButton>

      <Drawer
        p={2}
        open={isAppDrawerOpen}
        anchor="left"
        onClose={() => setIsAppDrawerOpen(false)}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={() => setIsAppDrawerOpen(false)}>
            <Close />
          </IconButton>
        </Box>

        <Stack>
        {MENULINKS.map((page) => {
          return (
                <RouterNavLink
                  key={page.id}
                  to={page.source}
                  end
                  linkcolor={theme.palette.neutral.main}
                >
                  <ListItemButton>
                    {/* <MyTypography variant={"subtitle1"} text={page.name} /> */}
                    <ListItemText primary={page.name} />
                  </ListItemButton>
                </RouterNavLink>
          );
        })}
        </Stack>
      </Drawer>
    </>
  );
};

export default AppDrawer;
