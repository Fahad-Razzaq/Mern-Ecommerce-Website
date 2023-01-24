import {
  Card,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  useMediaQuery,
} from "@mui/material";
import { Box, Button, TextField } from "@mui/material";
import { useTheme } from "@mui/system";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  PageContainer,
  CenterConatiner,
  RouterLink,
  Image,
} from "../styles/globalStyles";
import { NavLink } from "react-router-dom";
import MyTextField from "../components/muiElements/MyTextField";
import MyButton from "../components/muiElements/MyButton";
import MyTypography from "../components/muiElements/MyTypography";
import DashboardSideBar from "../components/DashboardSideBar";
import { Upload } from "@mui/icons-material";
import { publicRequest } from "../requestMethods";
import MyAlert from "../components/muiElements/MyAlert";

const NewUser = () => {
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [alertText,setAlertText] = useState(null)
  const onRegister = (data) => {
    console.log(data);

    const registerUser = async () => {
      const res = await publicRequest.post("/auth/register",data);
      console.log(res.data)
      setAlertText(res.data)
    }
    registerUser()

  };

  return (
    <PageContainer>
      <Grid container my={1} spacing={2}>
        <DashboardSideBar theme={theme} />

        <Grid item xs={12} sm={8} md={9} lg={9} xl={10}>

          <Card raised="true" sx={{ padding: "18px" }}>
          <MyTypography variant={"h5"} text={"Create New User"} />
            
            <TextField
              variant={"outlined"}
              type={"text"}
              label={"Name"}
              size={"small"}
              //   error={false}
              placeholder={"Fahad"}
              required={true}
              fullWidth={true}
              margin={"normal"}
              {...register("userName", {
                required: "Name is required",
                minLength: 3,
                maxLength: 25,
                pattern: {
                  value: /^[A-Za-z ]+$/,
                  message: "Name must be atleast 3 letters Long",
                },
              })}
              error={errors.userName ? true : false}
              helperText={errors.userName ? errors.userName.message : ""}
            />

            <TextField
              variant={"outlined"}
              type={"text"}
              label={"Email"}
              size={"small"}
              placeholder={"fahadrazzaq41@gmail.com"}
              required={true}
              fullWidth={true}
              margin={"normal"}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Please Enter Correct Email Address",
                },
              })}
              error={errors.email ? true : false}
              helperText={errors.email ? errors.email.message : ""}
            />
            <TextField
              variant={"outlined"}
              type={"password"}
              label={"Password"}
              size={"small"}
              required={true}
              fullWidth={true}
              margin={"normal"}
              {...register("password", {
                required: "Please Enter Password",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message:
                    "Minimum eight characters, at least one letter and one number",
                },
              })}
              error={errors.password ? true : false}
              helperText={
                errors.password
                  ? errors.password.message
                  : "Minimum eight characters, at least one letter and one number"
              }
            />

            <Box sx={{ width: "100%" }}>
              <FormControl error={errors.designation ? true : false}>
                <FormLabel>Choose Your Account Type:</FormLabel>
                <RadioGroup row >
                  <FormControlLabel
                    value={"Admin"}
                    label={"Admin"}
                    control={
                      <Radio
                        {...register("designation", {
                          required: "Please Choose Account Type",
                        })}
                      />
                    }
                  />
                  <FormControlLabel
                    value={"Customer"}
                    label={"Customer"}
                    control={
                      <Radio
                        {...register("designation", {
                          required: "Please Choose trst Type",
                        })}
                      />
                    }
                  />
                  <FormControlLabel
                    value={"Vendor"}
                    label={"Vendor"}
                    control={
                      <Radio
                        {...register("designation", {
                          required: "Please Choose Account Type",
                        })}
                      />
                    }
                  />
                </RadioGroup>
                <FormHelperText>
                  {errors.designation ? errors.designation.message : ""}
                </FormHelperText>
              </FormControl>
            </Box>

            <Box sx={{ width: "100%", marginBottom: "12px" }}>
          {alertText && alertText==="User Already Exists" ? <MyAlert severity={"error"} text={"User Already Exists."} /> : ""  }
          {alertText && alertText==="Registration Successfull" ? <MyAlert severity={"success"} text={"Registration Successfull."} /> : ""  }

          
        </Box>

            <MyButton
              variant={"contained"}
              text={"Create New User"}
              type="submit"
              size={"large"}
              fullWidth={true}
              color={"primary"}
              onClick={handleSubmit(onRegister)}
            />
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default NewUser;
