import { Backdrop, Box, CircularProgress, Grid } from "@mui/material";
import React, { useEffect } from "react";
import DashboardSideBar from "../components/DashboardSideBar";
import MyTypography from "../components/muiElements/MyTypography";
import { Image, PageContainer, RouterLink } from "../styles/globalStyles";
import { useTheme } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import MyButton from "../components/muiElements/MyButton";
import { useState } from "react";
import { productsData } from "../data/productsData";
import { publicRequest, userRequest } from "../requestMethods";
import {useDispatch,useSelector} from 'react-redux';
import { getProducts } from "../redux/apiCalls";

const Products = () => {
  const theme = useTheme();
  // const [data, setData] = useState(productsData);
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    console.log("Requesting Products Data");
    const getProducts = async () => {
      const res = await publicRequest.get("/product/findproducts");
      setProductData(res.data);
      // console.log(res.data)
    };
    getProducts();
  }, []);

  // const productData = useSelector((state)=>state.product.products);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   console.log("Requesting Products Data");
  //   getProducts(dispatch)
  // }, [dispatch]);

  const handleProductDelete = (id) => {
    console.log(`Deleting Product with ID : ${id}`);
    
    let deleteResponse = null;
    const deleteProduct = async () => {
      const res = await userRequest.delete(`/product/deleteproduct/${id}`);
      console.log(res.data)
      deleteResponse = res.data;
    }
    deleteProduct()
    // if(deleteResponse === "Product Deleted Successfully"){
    //   setDeleteSnackBarOpen(true)
    // }
    setProductData(productData.filter((item) => item._id !== id));
  };

  console.log(productData)
  const columns = [
    { field: "_id", headerName: "ID", width: 50 },
    // { field: "avatar", headerName: "Avatar", width: 130 },
    {
      field: "title",
      headerName: "Product",
      width: 220,
      renderCell: (params) => {
        return (
          <>
            <Box
              sx={{
                marginRight: "15px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Image src={"http://localhost:5000/static/"+params.row.productImg} width="40px" />
            </Box>
            {params.row.title}
            {/* <MyTypography variant={"body1"} text={params.row.userName} /> */}
          </>
        );
      },
    },
    {
      field: "vendor",
      headerName: "Vendor",
      width: 200,
    },
    {
      field: "categories",
      headerName: "Categories",
      width: 200,
      renderCell: (params) => {
        return <>{params.row.categories.toString()}</>;
      },
    },
    {
      field: "sizedPrice",
      headerName: "Size",
      width: 200,
      renderCell: (params) => {
        return <>
        {/* {console.log(params.row.sizedPrice)} */}
        {/* {params.row.sizedPrice.toString()} */}
        {(params.row.sizedPrice).map((item)=>{
          return (
            item.productSize+","
            // [item.productSize,item.productPrice].join("-")+","
          )
        })}
        </>;
      },
    },
    { field: "price", headerName: "Price", width: 70 },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => {
        return (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              <RouterLink to={"/product/edit/" + params.row._id}>
                <MyButton
                  variant={"contained"}
                  text={"Edit"}
                  size={"small"}
                  fullWidth={false}
                  color={"primary"}
                />
              </RouterLink>

              <MyButton
                variant={"contained"}
                text={"Delete"}
                size={"small"}
                fullWidth={false}
                color={"secondary"}
                onClick={() => handleProductDelete(params.row._id)}
              />
            </Box>
            {/* <MyTypography variant={"body1"} text={params.row.userName} /> */}
          </>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <Grid container my={2} spacing={2}>
        <DashboardSideBar theme={theme} />

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
            <MyTypography variant={"h5"} text={"Products Details"} />
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
          {
            productData ?

            <DataGrid
              rows={productData}
              columns={columns}
              getRowId={(row)=>row._id}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              disableSelectionOnClick
              sx={{ height: "371px" }}
            />
            : 
          <Backdrop open={true} >
            <CircularProgress color="inherit" />
          </Backdrop>
          }
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Products;
