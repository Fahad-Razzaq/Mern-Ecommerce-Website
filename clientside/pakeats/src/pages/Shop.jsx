import {
  Box,
  Card,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import MyTypography from "../components/muiElements/MyTypography";
import ShopProducts from "../components/ShopProducts";
import ShopSideBar from "../components/ShopSideBar";
import { categoriesData } from "../data/categoriesData";
import {
  CenterConatiner,
  PageContainer,
  RouterNavLink,
  WidgetConatiner,
} from "../styles/globalStyles";
import { useTheme } from "@mui/system";
import MySelect from "../components/muiElements/MySelect";

const Shop = () => {
  const theme = useTheme();
  const sortoptions = [
    {
      id: 1,
      value: "None",
    },
    {
      id: 2,
      value: "Price Ascending",
    },
    {
      id: 3,
      value: "Price Descending",
    },
    {
      id: 4,
      value: "Newest",
    },
  ];
  const [sortfilters, setSortFilters] = useState("");
  const handleSortFilter = (e) => {
    setSortFilters(e.target.value);
  };

  const location = useLocation();
  const cat = location.pathname.split("/")[3];

  return (
    <PageContainer>
      <CenterConatiner>
        <MyTypography variant={"h4"} text={"SHOP"} />
      </CenterConatiner>
      <Grid container my={2} spacing={2}>
        <Grid item xs={12} sm={4} md={3} lg={3} xl={2}>
          <Card raised="true" sx={{ padding: "12px", marginTop: "30px" }}>
            <Stack>
              <MyTypography variant={"h6"} text={"Categories"} />
              {categoriesData.map((categoryItem) => {
                return (
                  <RouterNavLink
                    key={categoryItem.id}
                    to={`/shop/category/${categoryItem.src}`}
                    end
                    linkcolor={theme.palette.neutral.main}
                  >
                    <ListItemButton>
                      <ListItemText primary={categoryItem.title} />
                    </ListItemButton>
                  </RouterNavLink>
                );
              })}
            </Stack>
          </Card>

          {/* <Card raised="true" sx={{ padding: "12px", marginTop: "16px" }}>
            <MyTypography variant={"h6"} text={"Filters"} />
            {/* <MySelect
              id={"selectCountry"}
              label={"Sort"}
              labelId={"labelId"}
              variant={"outlined"}
              selectoptions={sortoptions}
              size={"small"}
              value={sortfilters}
              onchange={(e) => handleSortFilter(e)}
            /> 
             <FormControl
              sx={{ width: "100%" }}
            >
              <InputLabel
                id="sort-select"
                sx={{ marginTop: "10px" }}
              >
                Sort
              </InputLabel>
              <Select
                labelId="sort-select"
                id="single-sort-select"
                label={"Sort"}
                sx={{ marginTop: "10px" }}
                value={sortfilters}
                onChange={(e) => handleSortFilter(e)}
              >
                {sortoptions.map((sortoptionsValue) => {
                  return (
                    <MenuItem key={sortoptionsValue.id} value={sortoptionsValue.value}>
                      {sortoptionsValue.value}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Card> */} 
        </Grid>

        <ShopProducts cat={cat} sortfilters={sortfilters} />
      </Grid>
    </PageContainer>
  );
};

export default Shop;
