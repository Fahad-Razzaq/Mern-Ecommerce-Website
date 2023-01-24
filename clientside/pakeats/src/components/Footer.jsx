
import { Box, Typography, useTheme,Grid } from "@mui/material";
import styled from "styled-components";
import MyTypography from "./muiElements/MyTypography";
import { RouterLink } from "../styles/globalStyles";
import { EmailOutlined, LocationOnOutlined, PhoneEnabledOutlined } from "@mui/icons-material";
import {COMPANY_NAME} from '../data/GlobalData'

const Container = styled(Box)`
  display: flex;
  background-color: #eeeeee;
`;

const Left = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Desc = styled(Typography)`
  margin: 20px 0px;
`;


const Center = styled(Box)`
  flex: 1;
  padding: 20px;
`;

const Title = styled(Box)`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled(Box)`
  flex: 1;
  padding: 20px;
`;



const Logo = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: left;
  margin-bottom: 20px;
`;

const LogoImg = styled(Box)`
  height: 50px;
  width: 50px;
  margin-left: 10px;
  margin-right: 10px;
`;
const ContactBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: left;
  margin-bottom: 30px;
`;

const Footer = () => {
  const theme = useTheme();
  return (
    <Container>
        <Grid container my={1} spacing={4}>
      <Grid item xs={12} sm={6} md={4} >
      <Left>
        <RouterLink to="/" linkcolor={theme.palette.neutral.main}>
          <Logo>
            <LogoImg component="img" src="./images/logo.png" />
            <MyTypography variant={"h5"} text={COMPANY_NAME} />
          </Logo>
        </RouterLink>
        <Desc color={theme.palette.neutral.main}>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.
        </Desc>
      </Left>
      </Grid>
      <Grid item xs={12} sm={6} md={4} >
      <Center>
        <Title>
        <ContactBox>
        <MyTypography variant={"h6"} text={"Useful Links"} />
        </ContactBox>
        </Title>
        <List>
          <ListItem>
            <RouterLink to="/account" linkcolor={theme.palette.neutral.main}>
              <MyTypography variant={"body1"} text={"My Account"} />
            </RouterLink>
          </ListItem>
          <ListItem>
            <RouterLink to="/track" linkcolor={theme.palette.neutral.main}>
              <MyTypography variant={"body1"} text={"Order Tracking"} />
            </RouterLink>
          </ListItem>
          <ListItem>
            <RouterLink to="/wishlist" linkcolor={theme.palette.neutral.main}>
              <MyTypography variant={"body1"} text={"Wishlist"} />
            </RouterLink>
          </ListItem>
          <ListItem>
            <RouterLink to="/terms" linkcolor={theme.palette.neutral.main}>
              <MyTypography variant={"body1"} text={"Terms & Conditions"} />
            </RouterLink>
          </ListItem>
        </List>
      </Center>
      </Grid>
      <Grid item xs={12} sm={6} md={4} >
      <Right>
        <ContactBox>
        <MyTypography variant={"h6"} text={"Contact"} />
        </ContactBox>
        <ContactBox>
            <LocationOnOutlined sx={{marginRight:"8px"}}/>
          <MyTypography variant={"body1"} text={"Karchi Pakistan"} />
        </ContactBox>
        <ContactBox>
            <PhoneEnabledOutlined sx={{marginRight:"8px"}}/>
          <MyTypography variant={"body1"} text={"+92 12345678"} />
        </ContactBox>
        <ContactBox>
        <EmailOutlined sx={{marginRight:"8px"}}/>
          <MyTypography variant={"body1"} text={"contact@deveats.com"} />
        </ContactBox>
      </Right>
      </Grid>
      </Grid>
      
      
      
    </Container>
  );
};

export default Footer;
