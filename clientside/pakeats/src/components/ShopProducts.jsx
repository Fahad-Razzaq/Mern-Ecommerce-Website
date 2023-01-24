import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Pagination,
} from "@mui/material";
import React, { useState } from "react";
import { CenterConatiner, RouterLink } from "../styles/globalStyles";
import MyTypography from "./muiElements/MyTypography";
// import { productsData } from "../data/productsData";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const ShopProducts = ({ cat, sortfilters }) => {
  console.log(cat, sortfilters);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat 
          ? `http://localhost:5000/api/product/findproducts?category=${cat}`
          : "http://localhost:5000/api/product/findproducts"
        );
        setProducts(res.data);
        console.log(products)
        setFilteredProducts(res.data)
        console.log(filteredProducts)
      } catch (err) {
        console.log(err)
      }
    };
    getProducts();
  }, [cat]);

  useEffect(()=>{
    console.log(sortfilters,products, filteredProducts)
    if((sortfilters==="Newest")){
      setFilteredProducts((prev)=>
      [...prev].sort((a,b)=>new Date(b.createdAt) - new Date(a.createdAt))
      );
    }
    else if((sortfilters==="Price Ascending")){
      setFilteredProducts((prev)=>
      [...prev].sort((a,b)=>a.price - b.price)
      );
    }
    else if((sortfilters==="Price Descending")){
      setFilteredProducts((prev)=>
      [...prev].sort((a,b)=>b.price - a.price)
      );
    }else if((sortfilters==="None")){
      setFilteredProducts(products);
    }
  },[sortfilters]);

  return (
    <Grid item xs={12} sm={8} md={9} lg={9} xl={10}>
      <Grid container my={2} spacing={2}>
        {products.map((productitem) => {
        // {productsData.map((productitem) => {
          return (
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
              xl={3}
              key={productitem.id}
            >
              <CenterConatiner>
                <Card sx={{ width: "450px" }} raised="true">
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

      <CenterConatiner padding={"32px"}>
        <Pagination count={10} color="primary" />
      </CenterConatiner>
    </Grid>
  );
};

export default ShopProducts;
