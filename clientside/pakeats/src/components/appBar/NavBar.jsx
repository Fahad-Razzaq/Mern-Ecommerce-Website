import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  ListItemButton,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import {
  FavoriteBorderOutlined,
  LockOpenOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { useTheme } from "@mui/system";
import React from "react";
import styled from "styled-components";
import { RouterLink, RouterNavLink } from "../../styles/globalStyles";
import MyTypography from "../muiElements/MyTypography";
import AppDrawer from "./AppDrawer";
import { COMPANY_NAME, MENULINKS } from "../../data/GlobalData";
import { useSelector } from "react-redux";

// Styled-Components

const NavToolbar = styled(Toolbar)`
  display: flex;
`;

const LeftNav = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: left;
  flex-grow: 1;
`;

const MiddleNav = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 2;
`;

const RightNav = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: right;
  flex-grow: 1;
`;

const LogoBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: left;
`;

const LogoImg = styled(Box)`
  height: 50px;
  width: 50px;
  margin-left: 10px;
  margin-right: 10px;
`;

const NavBar = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const quantity = useSelector(state=>state.cart.quantity);

  let isLogedIn = true;

  return (
    <AppBar position="sticky">
      <NavToolbar>
        <LeftNav>
          {matches ? <AppDrawer /> : ""}
          <RouterLink to={"/"} linkcolor={theme.palette.primary.contrastText}>
            <LogoBox>
              <LogoImg component={"img"} src={"./images/logo.png"} />
              <MyTypography variant={"h5"} text={COMPANY_NAME} />
            </LogoBox>
          </RouterLink>
        </LeftNav>

        <MiddleNav>
          {matches
            ? ""
            : MENULINKS.map((page) => {
                return (
                  <RouterNavLink
                    to={page.source}
                    key={page.id}
                    end
                    linkcolor={theme.palette.primary.contrastText}
                  >
                    <ListItemButton>
                      <MyTypography variant={"subtitle1"} text={page.name} />
                    </ListItemButton>
                  </RouterNavLink>
                );
              })}
              {/* <MyTypography variant={"subtitle1"} text={"page.name"} /> */}
        </MiddleNav>

        <RightNav>

          {/* <RouterLink to={"/wishlist"} >
            <IconButton>
            <FavoriteBorderOutlined color="common" />
            </IconButton>
          </RouterLink> */}

          <RouterLink to={"/cart"} >
            <IconButton>
              <Badge color="secondary" badgeContent={quantity} showZero >
              <ShoppingCartOutlined color="common" />
              </Badge>
            </IconButton>
          </RouterLink>

          {
            isLogedIn ? (
              <RouterLink to={"/dashboard"} >
                <IconButton>
                  <Avatar src="" />
                </IconButton>
              </RouterLink>
            )
            : (
              <RouterLink to={"/login"} >
                <IconButton>
                  <LockOpenOutlined color="common" />
                </IconButton>
              </RouterLink>
            )
          }

        </RightNav>
      </NavToolbar>
    </AppBar>
  );
};

export default NavBar;
