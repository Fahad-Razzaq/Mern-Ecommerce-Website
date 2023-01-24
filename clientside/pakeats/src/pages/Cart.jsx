import {
  Box,
  ButtonBase,
  Card,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MyButton from "../components/muiElements/MyButton";
import MyTypography from "../components/muiElements/MyTypography";
import { CenterConatiner, Image, PageContainer } from "../styles/globalStyles";
import { productsData } from "../data/productsData";
import { Add, Remove, Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { userRequest } from "../requestMethods";
import MyAlert from "../components/muiElements/MyAlert";
import axios from "axios";
import { deleteProduct, resetCart, updateProduct } from "../redux/apiCalls";

const KEY =
  "pk_test_51LxAfgFHvBTKPFKJbm6YYyeXjXoYUjv2GSDpGzHafHzMEAAlGDLHcaAjJ4SyCDtHFBlr9H7uWxPSm2spHjyZtzBe00SRkB9lsZ";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [stripeToken, setStripeToken] = useState(null);
  const [checkoutAlert, setCheckoutAlert] = useState(null);

  const onToken = async (token) => {

    setStripeToken(token)


  //   const userId = user.currentUser._id;
  //     const stripeToken_id = "stripeToken.id";
  //     const amount = cart.total;
  //     const address = "stripeToken.address";
  //     const products = cart.products;

  //     try {
  //       const res = await userRequest.post("/order/createorder", {
  //         userId,
  //         stripeToken_id,
  //         amount,
  //         address,
  //         products,
  //       });
  //       console.log(res.data);
  //       if (res.data) {
  //         resetCart(dispatch);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }

  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          // tokenId:stripeToken.id,
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        });
        setCheckoutAlert("success");
        // console.log(res.data);

        const makeOrder = async () => {
      
          const userId = user.currentUser._id;
          const stripeToken_id = stripeToken.id;
          const amount = cart.total;
          const address = `${stripeToken.card.address_line1}, ${stripeToken.card.address_city}, ${stripeToken.card.address_country}`;
          const products = cart.products;
    
          try {
            const res = await userRequest.post("/order/createorder", {
              userId,
              stripeToken_id,
              amount,
              address,
              products,
            });
            console.log(res.data);
            setCheckoutAlert(res.data)
            if (res.data) {
              resetCart(dispatch);
            }
          } catch (err) {
            setCheckoutAlert("error")
            console.log(err);
          }
        };
        makeOrder();
      } catch (err) {
        setCheckoutAlert("error");
        console.log(err);
      }
    };
    stripeToken && cart.total >= 1 && makeRequest();
  }, [stripeToken, cart.total]);

  const dispatch = useDispatch();
  const onReset = () => {
    resetCart(dispatch);
  };

  // useEffect(() => {
  //   const makeOrder = async () => {
      
  //     const userId = user.currentUser._id;
  //     const stripeToken_id = stripeToken.id;
  //     const amount = cart.total;
  //     const address = `${stripeToken.card.address_line1}, ${stripeToken.card.address_city}, ${stripeToken.card.address_country}`;
  //     const products = cart.products;

  //     try {
  //       const res = await userRequest.post("/order/createorder", {
  //         userId,
  //         stripeToken_id,
  //         amount,
  //         address,
  //         products,
  //       });
  //       console.log(res.data);
  //       setCheckoutAlert(res.data)
  //       if (res.data) {
  //         resetCart(dispatch);
  //       }
  //     } catch (err) {
  //       setCheckoutAlert("error")
  //       console.log(err);
  //     }
  //   };
  //   makeOrder();
  // }, [stripeToken]);



  return (
    <PageContainer>
      <CenterConatiner>
        <MyTypography variant={"h4"} text={"CART"} />
      </CenterConatiner>
      {checkoutAlert === "success" ? (
        <MyAlert severity={"success"} text={"Order Placed Successfully."} />
      ) : (
        ""
      )}
      {checkoutAlert === "error" ? (
        <MyAlert severity={"error"} text={"Order not Placed."} />
      ) : (
        ""
      )}

      {/* Main Page Grid */}
      <Grid container my={3} spacing={2}>
        {/* Main Page Grid Left Products Portion */}
        <Grid item xs={12} sm={12} md={8} lg={8} xl={9}>
          {cart.products.map((productItem) => {
            return (
              <CartProductCard
                key={productItem._id}
                productItem={productItem}
              />
            );
          })}
        </Grid>
        {/* Main Page Grid Right Summary Portion */}
        <Grid item xs={12} sm={12} md={4} lg={4} xl={3}>
          <Box>
            <Card raised={true} sx={{ padding: "18px" }}>
              <CenterConatiner>
                <MyTypography
                  variant={"h4"}
                  text={"Order Summary"}
                  gutterBottom={true}
                />
              </CenterConatiner>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: "18px",
                }}
              >
                <MyTypography
                  variant={"subtitle1"}
                  text={"Sub total"}
                  gutterBottom={true}
                />
                <MyTypography
                  variant={"subtitle1"}
                  text={`RS: ${cart.total}`}
                  gutterBottom={true}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <MyTypography
                  variant={"subtitle1"}
                  text={"Estimated Shipping"}
                  gutterBottom={true}
                />
                <MyTypography
                  variant={"subtitle1"}
                  text={"RS: 5.99"}
                  gutterBottom={true}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <MyTypography
                  variant={"subtitle1"}
                  text={"Shipping Discount"}
                  gutterBottom={true}
                />
                <MyTypography
                  variant={"subtitle1"}
                  text={"RS: 5.99"}
                  gutterBottom={true}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <MyTypography
                  variant={"h6"}
                  text={"Total"}
                  gutterBottom={true}
                />
                <MyTypography
                  variant={"h6"}
                  text={`RS: ${cart.total}`}
                  gutterBottom={true}
                />
              </Box>

              <StripeCheckout
                name="Pakeats"
                image="./images/logo.png"
                billingAddress
                shippingAddress
                description={`Your Total is Rs: ${cart.total}`}
                amount={cart.total * 100}
                token={onToken}
                stripeKey={KEY}
              >
                <MyButton
                  variant={"contained"}
                  text={"Checkout"}
                  size={"large"}
                  fullWidth={true}
                  color={"primary"}
                />
              </StripeCheckout>
              {/* <MyButton
                  variant={"contained"}
                  text={"Checkout Test"}
                  size={"large"}
                  fullWidth={true}
                  color={"primary"}
                  onClick={(e)=>onToken("pk_test_51LxAfgFHvBTKP")}
                /> */}
            </Card>
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

function CartProductCard({ productItem }) {
  // const reduxUpdateProduct = (updateType) => {
  //   console.log(updateType);
  //   let updProduct = productItem;

  //   if(updateType=== "Increase"){
  //     updProduct.pice = updProduct.pice * (updProduct.quantity+1);
  //     updProduct.quantity = updProduct.quantity + 1;
  //   }else if(updateType=== "Decrease") {
  //     updProduct.pice = updProduct.pice * (updProduct.quantity-1);
  //     updProduct.quantity = updProduct.quantity - 1;
  //   }

  //   updateProduct({ updateType,productItem}, dispatch);
  // }

  const [quantity, setQuantity] = useState(productItem.quantity);
  const handleQuantity = (option) => {
    if (option === "Increase") {
      // setTotalPrice(totalPrice * (quantity + 1));
      setQuantity(quantity + 1);

      // reduxUpdateProduct("Increase")
    } else if (option === "Decrease") {
      if (quantity === 1) {
        // setTotalPrice(totalPrice * (quantity - 1));
        setQuantity(1);
      } else {
        setQuantity(quantity - 1);
        // reduxUpdateProduct("Decrease")
      }
    }
  };

  // const [totalPrice, setTotalPrice] = useState(productItem.price * quantity);
  const dispatch = useDispatch();
  const handleDelete = (id, totalPrice, quantity) => {
    console.log(id, totalPrice);
    deleteProduct({ id, totalPrice, quantity }, dispatch);
  };
  return (
    <Paper elevation={6} sx={{ p: 1, marginBottom: "16px", padding: "16px" }}>
      <Grid container spacing={2}>
        {/* Left Image Grid Portion */}
        <Grid item xs={12} sm={3} lg={2} xl={2}>
          <ButtonBase
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
            }}
          >
            <Image
              src={"http://localhost:5000/static/" + productItem.productImg}
              objectFit={"contain"}
              width={"100%"}
            />
          </ButtonBase>
        </Grid>

        {/* Center Content Grid Portion */}
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <MyTypography
                variant={"h6"}
                text={`Product: ${productItem.title}`}
                gutterBottom={true}
              />
              <MyTypography
                variant={"body2"}
                text={`ID: ${productItem._id}`}
                gutterBottom={true}
              />
              <MyTypography
                variant={"body2"}
                text={`Size: ${productItem.size}`}
                gutterBottom={true}
              />
              <MyTypography
                variant={"body2"}
                text={`Quantity: ${productItem.quantity}`}
                gutterBottom={true}
              />
            </Grid>

            {/* <Grid item>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Remove onClick={() => handleQuantity("Decrease")} />
                {/* <MyTypography variant={"h5"} text={quantity} /> */}
            {/*<TextField
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
            </Grid> */}
          </Grid>

          {/* Product Card Right Grid Item */}
          <Grid item>
            <Grid item xs container direction="column">
              <Grid item>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <IconButton
                    onClick={() =>
                      handleDelete(
                        productItem._id,
                        productItem.price * productItem.quantity,
                        quantity
                      )
                    }
                  >
                    <Close />
                  </IconButton>
                </Box>
              </Grid>
              <Grid item>
                <MyTypography
                  variant={"h6"}
                  text={`Rs: ${productItem.price * productItem.quantity}`}
                  // text={`Rs: ${totalPrice}`}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Cart;
