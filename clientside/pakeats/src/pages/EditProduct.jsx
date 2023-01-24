import {
  AspectRatio,
  CalendarToday,
  Description,
  FilterList,
  Grid3x3,
  LocalAtm,
  Mail,
  PriceChange,
  PriceChangeOutlined,
  Storefront,
  Upload,
  Work,
} from "@mui/icons-material";
import {
  Box,
  Card,
  FormHelperText,
  Grid,
  IconButton,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/system";
import React, { useEffect, useState } from "react";
import DashboardSideBar from "../components/DashboardSideBar";
import MyButton from "../components/muiElements/MyButton";
import MyTypography from "../components/muiElements/MyTypography";
import { Image, PageContainer, RouterLink } from "../styles/globalStyles";
import { useForm } from "react-hook-form";
import Chart from "../components/Chart";
import EditProductComp from "../components/EditProductComp";
import { useLocation } from "react-router-dom";
import { userRequest } from "../requestMethods";

const EditProduct = () => {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const [productData, setProductData] = useState(null);
  useEffect(() => {
    console.log(`Requesting Product Data with id : ${id}`);
    const getProduct = async () => {
      try {
        const res = await userRequest.get(`/product/findproduct/${id}`);
        res.data.createdAt = res.data.createdAt
          .replace(/T/, " ")
          .replace(/\..+/, "");
        setProductData(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
    console.log(productData);
  }, [id]);

  const chartData = [
    {
      name: "May",
      Sales: 4000,
    },
    {
      name: "June",
      Sales: 3000,
    },
    {
      name: "July",
      Sales: 5000,
    },
  ];

  const onEditProduct = (data) => {
    console.log(data);
  };
  return (
    <PageContainer>
      <Grid container my={1} spacing={2}>
        <DashboardSideBar theme={theme} />

        {productData ? (
          <Grid item xs={12} sm={8} md={9} lg={9} xl={10}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "center",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <MyTypography variant={"h5"} text={"Edit Product"} />
              <RouterLink to={"/newProduct"}>
                <MyButton
                  variant={"contained"}
                  text={"Create Product"}
                  size={"medium"}
                  fullWidth={false}
                  color={"primary"}
                />
              </RouterLink>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                  {/* Product Sales Card */}
                  <Chart
                    chartData={chartData}
                    dataKey={"Sales"}
                    title="Sales Performance"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  {/* Product Edit Card */}
                  <Card raised={true} sx={{ padding: "18px" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: "12px",
                      }}
                    >
                      <Image
                        src={`http://localhost:5000/static/${productData.productImg}`}
                        width={"100px"}
                        borderRadius={"10px"}
                        objectFit={"cover"}
                        background={"lightgrey"}
                      />

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          marginLeft: "12px",
                        }}
                      >
                        <MyTypography
                          variant={"h5"}
                          text={productData.title || "Product name"}
                        />
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "12px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "Left",
                          alignItems: "center",
                          marginBottom: "8px",
                        }}
                      >
                        <Grid3x3 sx={{ marginRight: "12px" }} />
                        <MyTypography
                          variant={"body1"}
                          text={productData._id}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "Left",
                          alignItems: "center",
                          marginBottom: "8px",
                        }}
                      >
                        <Storefront sx={{ marginRight: "12px" }} />
                        <MyTypography
                          variant={"body1"}
                          text={productData.vendor}
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "Left",
                          alignItems: "center",
                          marginBottom: "8px",
                        }}
                      >
                        <FilterList sx={{ marginRight: "12px" }} />
                        <MyTypography
                          variant={"body1"}
                          text={productData.categories.toString()}
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "Left",
                          alignItems: "center",
                          marginBottom: "8px",
                        }}
                      >
                        <CalendarToday sx={{ marginRight: "12px" }} />
                        <MyTypography
                          variant={"body1"}
                          text={productData.createdAt}
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "Left",
                          alignItems: "center",
                          marginBottom: "8px",
                        }}
                      >
                        <LocalAtm sx={{ marginRight: "12px" }} />
                        <MyTypography
                          variant={"body1"}
                          text={"Rs : " + productData.price}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "Left",
                          alignItems: "Top",
                          marginBottom: "8px",
                        }}
                      >
                        <PriceChangeOutlined sx={{ marginRight: "12px" }} />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "Left",
                            alignItems: "Left",
                          }}
                        >
                          {productData.sizedPrice.map((item) => {
                            return (
                              <>
                                <MyTypography
                                  variant={"body1"}
                                  text={`${item.productSize} -- ${item.productPrice},`}
                                />
                              </>
                            );
                          })}
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "Left",
                          alignItems: "center",
                          marginBottom: "8px",
                        }}
                      >
                        <Description sx={{ marginRight: "12px" }} />
                        <MyTypography
                          variant={"body1"}
                          text={productData.desc}
                        />
                      </Box>
                    </Box>
                  </Card>
                </Grid>

                <Grid item xs={12} >
                  <Card raised="true" sx={{ padding: "18px" }}>
                    <EditProductComp />
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        ) : (
          <Backdrop open={true}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </Grid>
    </PageContainer>
  );
};

export default EditProduct;
