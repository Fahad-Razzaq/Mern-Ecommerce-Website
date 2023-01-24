import { Add, Remove } from "@mui/icons-material";
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import MyButton from "../components/muiElements/MyButton";
import MySelect from "../components/muiElements/MySelect";
import MyTypography from "../components/muiElements/MyTypography";
import { addProduct } from "../redux/cartRedux";
import { publicRequest } from "../requestMethods";
import { Image, PageContainer } from "../styles/globalStyles";
import { useDispatch } from "react-redux";
// import { productsData } from "../data/productsData";

const Product = () => {
  // const params = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.split("/")[3];


  const [product, setProduct] = useState({});
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/product/findproduct/${id}`);
        setProduct(res.data);
        console.log(res.data);
        console.log(res.data.sizedPrice);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);

  const [quantity, setQuantity] = useState(1);
  const handleQuantity = (option) => {
    if (option === "Increase") {
      setQuantity(quantity + 1);
    } else if (option === "Decrease") {
      if (quantity === 1) {
        setQuantity(1);
      } else {
        setQuantity(quantity - 1);
      }
    }
  };

  const [productItem, setProductItem] = useState({
    id: 0,
    img: "",
    name: "",
    price: 0,
    desc: "",
  });

  const variationoptions = [
    {
      id: 1,
      value: "Small",
    },
    {
      id: 2,
      value: "Medium",
    },
    {
      id: 3,
      value: "Large",
    },
  ];

  // const [variationfilters, setVariationFilters] = useState("");
  // const handleVariationFilter = (e) => {
  //   console.log(e.target.value);
  //   setVariationFilters(e.target.value);
  //   console.log(variationfilters);
  // };

  // Product Size Select Portion
  const [size, setSize] = useState([]);
  const [sizeSelected, setSizeSelected] = useState([]);
  const [categoryFirstCheck, setCategoryFirstCheck] = useState(false);

  const handleSizeChange = (e) => {
    setSizeSelected(parseFloat(e.target.value));

    product.sizedPrice.map((item) => {
      if(item.productPrice === e.target.value){
        setSize(item.productSize);
      }
    })
    setCategoryFirstCheck(false)
  };

  

  const handleClick = () => {
    if(!categoryFirstCheck && typeof sizeSelected === "number"){
      
      product.price = sizeSelected;
      // Update Cart
      dispatch(
        addProduct({...product,quantity,size})
        // addProduct({product,quantity,price:sizeSelected*quantity})
      )
    }else{
      setCategoryFirstCheck(true)
    }
  }

  return (
    <PageContainer>
      <Grid container my={3} spacing={4}>
        <Grid item xs={12} sm={5} md={5}>
          <Image
            width={"100%"}
            src={`http://localhost:5000/static/${product.productImg}`}
            // src={"http://localhost:5000/static/1666561098353--d1.png"}
          />
        </Grid>
        <Grid item xs={12} sm={7} md={7}>
          {/* <MyTypography
            variant={"h3"}
            text="Product Title"
            gutterBottom={"true"}
          /> */}
          <MyTypography
            variant={"h3"}
            text={product.title}
            gutterBottom={"true"}
          />
          {/* <MyTypography
            variant={"h6"}
            text={`Vendor: ${product.vendor}`}
            gutterBottom={"true"}
          /> */}
          <MyTypography
            variant={"h5"}
            text={product.desc}
            gutterBottom={"true"}
          />
          {(typeof sizeSelected === "number") ? (
            <MyTypography
              variant={"h4"}
              text={`Rs: ${sizeSelected*quantity}`}
              gutterBottom={"true"}
            />
          ) : (
            <MyTypography
              variant={"h4"}
              text={`Rs: ${product.price*quantity}`}
              gutterBottom={"true"}
            />
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              paddingTop: "16px",
              paddingBottom: "16px",
            }}
          >
            {/* <MySelect
              id={"selectSize"}
              label={"Size"}
              labelId={"labelId"}
              variant={"outlined"}
              selectoptions={product.size}
              size={"small"}
              width={"150px"}
              value={variationfilters}
              onchange={(e) => handleVariationFilter(e)}
            /> */}

            {product.sizedPrice ? (
              <FormControl
                sx={{ width: "100%",width:"300px" }}
                required
                error={categoryFirstCheck ? true : false}
              >
                <InputLabel id="product-size-select" sx={{ marginTop: "10px" }}>
                  Select Size
                </InputLabel>
                <Select
                  labelId="product-size-select"
                  id="size-select"
                  label={"Select Size"}
                  sx={{ marginTop: "10px" }}
                  value={sizeSelected}
                  onChange={(e) => handleSizeChange(e)}
                >
                  {product.sizedPrice.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.productPrice}>
                        {`${item.productSize} - RS: ${item.productPrice}`}
                      </MenuItem>
                    );
                  })}
                </Select>
                {categoryFirstCheck ? (
          <FormHelperText>Please select Size</FormHelperText>
        ) : (
          ""
        )}
              </FormControl>
            ) : (
              ""
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              paddingBottom: "16px",
            }}
          >
            <Remove onClick={() => handleQuantity("Decrease")} />
            {/* <MyTypography variant={"h5"} text={quantity} /> */}
            <TextField
              variant={"outlined"}
              // placeholder={quantity}
              value={quantity}
              type={"number"}
              size={"small"}
              sx={{ width: "82px" }}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              InputProps={{
                inputProps: { min: 1 },
              }}
            />
            <Add onClick={() => handleQuantity("Increase")} />
          </Box>

          <MyButton
            variant={"contained"}
            text={"Add to Cart"}
            size={"large"}
            fullWidth={false}
            color={"primary"}
            onClick={handleClick}
          />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Product;
