import styled from "styled-components";
import { Box, Paper } from "@mui/material";
import { Link, NavLink } from "react-router-dom";

export const PageContainer = styled(Box)`
  padding: 24px;
`;

export const WidgetConatiner = styled(Box)`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  justify-content: center;
  align-items: left;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.bgColor};
`;

export const CenterConatiner = styled(Box)`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.bgColor};
`;

export const hoverPaper = styled(Paper)`
height: ${(props) => props.height};
width: ${(props) => props.width};
position: ${(props) => props.position};

  &:hover {
    background: ${(props) => props.bgHoverColor};
  }
`;

export const WidthConatiner = styled(Box)`
  width: ${(props) => props.width};
`;

export const LinkButton = styled(Link)`
  text-decoration: none;
`;

export const RouterLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.linkcolor};
`;

export const RouterNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${(props) => props.linkcolor};
  background-color: transparent;
  margin-left: 10px;
  margin-right: 10px;
  /* padding: 1.1rem; */

  &:hover {
    background-color: rgba(0, 0, 0, 0.15);
  }

  &.active {
    background-color: rgba(0, 0, 0, 0.15);
  }
`;

export const Image = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  object-fit: ${(props) => props.objectFit};
  border-radius: ${(props) => props.borderRadius};
  background: ${(props) => props.background};
`;
