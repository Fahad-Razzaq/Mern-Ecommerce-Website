import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  useMediaQuery,
} from "@mui/material";
import { Box, Button, TextField } from "@mui/material";
import { useTheme } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import {
  PageContainer,
  CenterConatiner,
  RouterLink,
} from "../styles/globalStyles";
import { NavLink } from "react-router-dom";
import MyTextField from "../components/muiElements/MyTextField";
import MyButton from "../components/muiElements/MyButton";
import MyTypography from "../components/muiElements/MyTypography";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import MyAlert from "../components/muiElements/MyAlert";
import { useEffect } from "react";
import { useState } from "react";
import { publicRequest, userRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();


    const { isFetching, error } = useSelector((state) => state.user);

  // console.log(currentUser)

  let nevigate = useNavigate();
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState(null);
  const onLogin = (data) => {
    const userData = async () => {
      const res = await publicRequest.post("/auth/login", {
        email: data.email,
        password: data.password,
      });
      setLoginData(res.data);
      // console.log(res.data);
      login(dispatch, data);
      if(res.data != "User Does not Exists."){
        nevigate("/")
      }
    };
      userData();
    // if(error){
    //   nevigate("/")
    // }
  };

  return (
    <PageContainer>
      <CenterConatiner
        width={matches ? "40%" : "100%"}
        flexDirection={"column"}
      >
        <MyTypography variant={"h4"} text={"Login"} gutterBottom={true} />
        <Box sx={{ display: "flex" }}>
          <MyTypography
            variant={"body1"}
            text={"Don't Have an Account. "}
            gutterBottom={true}
          />
          <NavLink to="/register">
            <MyTypography
              variant={"body1"}
              text={"Register"}
              gutterBottom={true}
            />
          </NavLink>
        </Box>

        <TextField
          variant={"outlined"}
          type={"text"}
          label={"Email"}
          size={"small"}
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
          })}
          error={errors.password ? true : false}
        />

        <Box sx={{ width: "100%", marginBottom: "12px" }}>
          {error && (
            <MyAlert severity={"error"} text={"Login Unsuccessful."} />
          )}
        </Box>

        <MyButton
          variant={"contained"}
          text={"Login"}
          type="submit"
          size={"large"}
          fullWidth={true}
          color={"primary"}
          disabled={isFetching}
          onClick={handleSubmit(onLogin)}
        />
      </CenterConatiner>
    </PageContainer>
  );
};

export default Login;
