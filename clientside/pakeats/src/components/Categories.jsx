import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import React from "react";
import { CenterConatiner, RouterLink } from "../styles/globalStyles";
import MyTypography from "./muiElements/MyTypography";
import { categoriesData } from "../data/categoriesData";

const Categories = () => {
  return (
    <CenterConatiner
      flexDirection={"column"}
      bgcolor={"#f7f7f7"}
      padding={"24px"}
    >
      <MyTypography variant={"h4"} text={"Categories"} />
      <Grid container my={2} spacing={2}>
        {categoriesData.map((categoryitem) => {
          return (
            <Grid item xs={6} sm={4} md={4} lg={2} key={categoryitem.id}>
              <CenterConatiner>
                <Card sx={{ maxWidth: "250px" }}>
                  <RouterLink to={`shop/category/${categoryitem.src}`}>
                    <CardActionArea>
                    <CenterConatiner>
                      <CardMedia
                        component="img"
                        height="80%"
                        image={categoryitem.img}
                        alt={categoryitem.title}
                        sx={{ width: "250px", height: "200px" }}
                      />
                      </CenterConatiner>
                      <CardContent
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          verticalAlign: "center",
                        }}
                      >
                        <MyTypography
                          variant={"h6"}
                          text={categoryitem.title}
                          color={"neutral.main"}
                        />
                      </CardContent>
                    </CardActionArea>
                  </RouterLink>
                </Card>
              </CenterConatiner>
            </Grid>
          );
        })}
      </Grid>
    </CenterConatiner>
  );
};

export default Categories;
