import { Upload } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { useState } from "react";
import { Image } from "../styles/globalStyles";
import { useForm } from "react-hook-form";
import MyTypography from "./muiElements/MyTypography";
import MyButton from "./muiElements/MyButton";
import { DataGrid } from "@mui/x-data-grid";
import { userRequest } from "../requestMethods";
import { useLocation } from "react-router-dom";
import MyAlert from "./muiElements/MyAlert";

const EditProductComp = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const id = location.pathname.split("/")[3];

  // Product Size Handler------------------------------------------------------------------------
  const [sizeData, setSizeData] = useState([]);
  const [sizeCounter, setSizeCounter] = useState(1);
  const [productSize, setProductSize] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const onChangeProductSize = (e) => {
    setProductSize(e.target.value);
  };

  const onChangeProductPrice = (e) => {
    setProductPrice(e.target.value);
  };

  const findMinPrice = () => {
    let priceArray = sizeData;
    let min = Math.min(...priceArray.map((item) => item.productPrice));
    return min;
  };

  const onSetProductPrice = () => {
    if (sizeData === undefined || sizeData.length == 0) {
      setSizeData([
        ...sizeData,
        {
          id: sizeCounter,
          productSize: productSize,
          productPrice: productPrice,
        },
      ]);
    } else {
      let checkSizeExistance = sizeData.find(
        (sizeObj) => sizeObj.productSize === productSize
      );
      if (checkSizeExistance === undefined) {
        setSizeData([
          ...sizeData,
          {
            id: sizeCounter,
            productSize: productSize,
            productPrice: productPrice,
          },
        ]);
      }
    }

    setProductSize("");
    setProductPrice("");
    setSizeCounter(sizeCounter + 1);
  };

  const handleProductDelete = (id) => {
    setSizeData(sizeData.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "productSize", headerName: "Size", width: 150 },
    { field: "productPrice", headerName: "Price (Rs)", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => {
        return (
          <MyButton
            variant={"contained"}
            text={"Delete"}
            size={"small"}
            fullWidth={false}
            color={"secondary"}
            onClick={() => handleProductDelete(params.row.id)}
          />
        );
      },
    },
  ];

  // Categories Select Portion
  const [categoryFirstCheck, setCategoryFirstCheck] = useState(false);
  const categoryMessage = "Please Select one or more Categories";
  const [categoryName, setCategories] = useState([]);
  const categories = [
    "Non Veg",
    "Veg",
    "Fast Food",
    "Drinks",
    "Desert",
    "Deals",
  ];
  const handleCategoriesChange = (e) => {
    setCategories(e.target.value);
  };
  
  const [product, setProduct] = useState(null);
  const onEditProduct = (data) => {
    if (categoryName.length > 0) {
      // data["categories"] = categoryName;
      // data["sizedPrice"] = sizeData;
      // data["price"] = parseFloat(findMinPrice());
      // delete data.productSize;
      // delete data.productPrice;

      console.log(`Updating Product Data with id : ${id}`);
      const formData = new FormData();
      formData.append("productImg", data.productImg[0]);
      formData.append("title", data.title);
      formData.append("desc", data.desc);
      formData.append("categories", categoryName);
      formData.append("sizedPrice", JSON.stringify(sizeData));
      formData.append("price", parseFloat(findMinPrice()));

      // console.log(sizeData)

      delete data.productSize;
      delete data.productPrice;

      const updateProduct = async () => {
        try {
          const res = await userRequest.put(
            `/product/updateproduct/${id}`,
            formData
          );
          setProduct(res.data);
          console.log(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      updateProduct();
    } else {
      setCategoryFirstCheck(true);
      console.log("Else condition");
    }
  };

  return (
    <form
      action="/upload"
      id="AddProduct"
      method="post"
      role="form"
      encType="multipart/form-data"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "Left",
          alignItems: "center",
          marginBottom: "12px",
          marginTop: "12px",
        }}
      >
        {/* <Image
          src={productImage || "https://d3o2e4jr3mxnm3.cloudfront.net/Rocket-Vintage-Chill-Cap_66374_1_lg.png"}
          width={"100px"}
          borderRadius={"10px"}
          objectFit={"cover"}
          background={"lightgrey"}
        /> */}
        {errors.productImg && (
          <FormHelperText sx={{ color: "#D32F2F" }}>
            Product Image is required
          </FormHelperText>
        )}
        <Button
          variant="contained"
          component="label"
          sx={{ marginLeft: "18px" }}
        >
          Upload Product Image
          <input
            hidden
            accept="image/*"
            type="file"
            id="productImg"
            name="productImg"
            {...register("productImg", {
              required: "Product Image is required",
            })}
            required
          />
        </Button>

        {/* <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          sx={{ marginLeft: "20px" }}
        >
          <input hidden accept="image/*" type="file" id="productImg" name="productImg" />
          <Upload fontSize="large" />
        </IconButton> */}
      </Box>

      <TextField
        variant={"outlined"}
        type={"text"}
        label={"Product Name"}
        size={"small"}
        //   error={false}
        placeholder={"Fahad"}
        required={true}
        fullWidth={true}
        margin={"normal"}
        {...register("title", {
          required: "Product Name is required",
          minLength: 3,
          maxLength: 25,
          pattern: {
            value: /^[A-Za-z ]+$/,
            message: "Product Name must be atleast 3 letters Long",
          },
        })}
        error={errors.title ? true : false}
        helperText={errors.title ? errors.title.message : ""}
      />

      {/* <TextField
        variant={"outlined"}
        type={"text"}
        label={"Price"}
        size={"small"}
        placeholder={"19.99"}
        required={true}
        fullWidth={true}
        margin={"normal"}
        {...register("price", {
          required: "Price is required",
          pattern: {
            value: /^[0-9. ]+$/,
            message: "Please Enter Correct Price",
          },
        })}
        error={errors.price ? true : false}
        helperText={errors.price ? errors.price.message : ""}
      /> */}

      <TextField
        multiline
        minRows={4}
        variant={"outlined"}
        type={"text"}
        label={"Description"}
        size={"small"}
        placeholder={"Long Description"}
        required={true}
        fullWidth={true}
        margin={"normal"}
        {...register("desc", {
          required: "Please Enter Description",
        })}
        error={errors.desc ? true : false}
        helperText={errors.desc ? errors.desc.message : ""}
      />

      <FormControl
        sx={{ width: "100%" }}
        required
        error={categoryFirstCheck && !categoryName.length ? true : false}
      >
        <InputLabel id="multi-categories-select" sx={{ marginTop: "10px" }}>
          Categories
        </InputLabel>
        <Select
          labelId="multi-categories-select"
          id="categories-select"
          label={"Categories"}
          multiple
          sx={{ marginTop: "10px" }}
          value={categoryName}
          onChange={(e) => handleCategoriesChange(e)}
        >
          {categories.map((categoriesValue) => {
            return (
              <MenuItem key={categoriesValue} value={categoriesValue}>
                {categoriesValue}
              </MenuItem>
            );
          })}
        </Select>
        {categoryFirstCheck && !categoryName.length ? (
          <FormHelperText>{categoryMessage}</FormHelperText>
        ) : (
          ""
        )}
      </FormControl>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
        }}
      >
        <TextField
          variant={"outlined"}
          type={"text"}
          value={productSize}
          label={"Product Size"}
          size={"small"}
          //   error={false}
          placeholder={"Small"}
          required={true}
          fullWidth={false}
          margin={"normal"}
          sx={{ width: "48%" }}
          {...register("productSize", {
            required: "Product Size is required",
          })}
          error={errors.productSize ? true : false}
          helperText={errors.productSize ? errors.productSize.message : ""}
          onChange={(e) => onChangeProductSize(e)}
        />

        <TextField
          variant={"outlined"}
          type={"text"}
          value={productPrice}
          label={"Price For Product Size"}
          size={"small"}
          //   error={false}
          placeholder={"Small"}
          required={true}
          fullWidth={false}
          margin={"normal"}
          sx={{ width: "48%" }}
          {...register("productPrice", {
            required: "Product Price is required",
            pattern: {
              value: /^[0-9. ]+$/,
              message: "Product Price must be in Digits",
            },
          })}
          error={errors.productPrice ? true : false}
          helperText={errors.productPrice ? errors.productPrice.message : ""}
          onChange={(e) => onChangeProductPrice(e)}
        />
      </Box>
      <Box
        sx={{
          marginBottom: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
        }}
      >
        <MyButton
          variant={"contained"}
          text={"Add Size"}
          type="submit"
          size={"medium"}
          fullWidth={false}
          color={"primary"}
          onClick={onSetProductPrice}
        />
      </Box>

      <DataGrid
        rows={sizeData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        sx={{ height: "371px", marginBottom: "16px" }}
      />

      <Box sx={{ width: "100%", marginBottom: "12px" }}>
        {product && <MyAlert severity={"success"} text={"Product Updated Successfully"} />}
      </Box>

      <MyButton
        variant={"contained"}
        text={"Create Product"}
        type="submit"
        size={"large"}
        fullWidth={true}
        color={"primary"}
        onClick={handleSubmit(onEditProduct)}
      />
    </form>
  );
};

export default EditProductComp;
