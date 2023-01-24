import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Stack, Card, Box, Icon } from "@mui/material";
import React from "react";
import MyTypography from "./muiElements/MyTypography";

const InfoCard = ({Title,money,difference,differenceStatus}) => {
  return (
    <Card raised="true" sx={{ padding: "18px" }}>
      <Stack spacing={1}>
        <MyTypography variant={"h6"} text={Title} />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <MyTypography variant={"h5"} text={`$ ${money}`} />

          <Box sx={{ display: "flex" }}>
            <MyTypography variant={"body1"} text={difference} />
            <Icon sx={{marginLeft:"8px"}}>
                {differenceStatus ? <ArrowUpward color="success" /> : <ArrowDownward color="error" />}
              {/* <ArrowDownward color="error" /> */}
            </Icon>
          </Box>
        </Box>

        <MyTypography variant={"body1"} text={"Compared to last month"} color={"grey"} />
      </Stack>
    </Card>
  );
};

export default InfoCard;
