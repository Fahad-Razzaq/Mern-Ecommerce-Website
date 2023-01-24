import React from "react";
import MyTypography from "./muiElements/MyTypography";
import {
  Box,
  Card,
  Divider,
  Grid,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/system";
import { categoriesData } from "../data/categoriesData";
import { RouterNavLink } from "../styles/globalStyles";
import { useState } from "react";
import MySelect from "./muiElements/MySelect";

const ShopSideBar = () => {
  const theme = useTheme();

  //   const [selectedSizeFilter, setSelectSizeFilter] = useState("");
  //   const handleSizeFilter = (e) => {
  //     setSelectSizeFilter(e.target.value);
  //     console.log(selectedSizeFilter)
  //   };

  const sortoptions = [
    {
        id:1,
        value:"None"
    },
    {
        id:2,
        value:"Newest"
    },
    {
        id:3,
        value:"Price Ascending"
    },
    {
        id:4,
        value:"Price Descending"
    },
  ]
  const [sortfilters, setSortFilters] = useState("");
  const handleSortFilter = (e) => {
      console.log(e.target.value)
    setSortFilters(e.target.value);
    console.log(sortfilters)
  };

  return (
    <Grid item xs={12} sm={4} md={3} lg={3} xl={2}>
      <Card raised="true" sx={{ padding: "12px",marginTop:"30px" }}>
        <Stack>
          <MyTypography variant={"h6"} text={"Categories"} />
          {categoriesData.map((categoryItem) => {
            return (
              <RouterNavLink
                key={categoryItem.id}
                to={`category/${categoryItem.src}`}
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
      
      <Card raised="true" sx={{ padding: "12px", marginTop: "16px" }}>
        <MyTypography variant={"h6"} text={"Filters"} />
        <MySelect id={"selectCountry"} label={"Sort"} labelId={"labelId"} variant={"outlined"} selectoptions={sortoptions}  size={"small"} value={sortfilters} onchange={(e)=>handleSortFilter(e)} />
      </Card>

    </Grid>
  );
};

export default ShopSideBar;
