import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { CenterConatiner, RouterLink } from "../styles/globalStyles";
import MyTypography from "./muiElements/MyTypography";
// import { productsData } from "../data/productsData";
import axios from "axios";

const NewestProducts = ({ bgcolor }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/product/findproducts"
        );
        setProducts(res.data);
        setProducts((prev) =>
          [...prev].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);


  return (
    <CenterConatiner
      flexDirection={"column"}
      bgcolor={bgcolor}
      padding={"24px"}
    >
      <MyTypography variant={"h4"} text={"New Products"} />
      <Grid container my={2} spacing={2}>
        {products.slice(0, 8).map((productitem) => {
        // {productsData.slice(0, 8).map((productitem) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={productitem.id}>
              <CenterConatiner>
                <Card sx={{ width: "450px" }} raised="true">
                  {/* <RouterLink to={`/shop/product/${productitem.id}`}> */}
                  <RouterLink to={`/shop/product/${productitem._id}`}>
                    <CardActionArea>
                      <CenterConatiner>
                        <CardMedia
                          component="img"
                          height="80%"
                          // image={productitem.image}
                          image={`http://localhost:5000/static/${productitem.productImg}`}
                          alt={productitem.name}
                          sx={{ width: "450px", height: "300px" }}
                        />
                      </CenterConatiner>
                      <CardContent>
                        <CenterConatiner flexDirection={"column"}>
                          <MyTypography
                            variant={"h6"}
                            text={productitem.title}
                            color={"neutral.main"}
                          />
                          <MyTypography
                            variant={"subtitle1"}
                            text={`Rs: ${productitem.price}`}
                            color={"neutral.main"}
                          />
                        </CenterConatiner>
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

export default NewestProducts;
