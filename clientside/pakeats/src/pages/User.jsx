import {
  CalendarToday,
  Grid3x3,
  Mail,
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
} from "@mui/material";
import { useTheme } from "@mui/system";
import React, { useEffect, useState } from "react";
import DashboardSideBar from "../components/DashboardSideBar";
import MyButton from "../components/muiElements/MyButton";
import MyTypography from "../components/muiElements/MyTypography";
import { Image, PageContainer, RouterLink } from "../styles/globalStyles";
import { useForm } from "react-hook-form";
import { userRequest } from "../requestMethods";
import { useLocation } from "react-router-dom";
import MyBackdrop from "../components/muiElements/MyBackdrop";

const User = () => {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    console.log(`Requesting User Data with id : ${id}`);
    const getUser = async () => {
      try {
        const res = await userRequest.get(`/user/finduser/${id}`);
        res.data.createdAt = res.data.createdAt
          .replace(/T/, " ")
          .replace(/\..+/, "");
        setUserData(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
    console.log(userData);
  }, [id]);

  const onEditUser = (data) => {
    console.log(data);
    console.log(`Updating User Data with id : ${id}`);
    const updateUser = async () => {
      try {
        const res = await userRequest.put(`/user/updateuser/${id}`, data);
        setUserData(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    updateUser();
  };

  return (
    <PageContainer>
      <Grid container my={1} spacing={2}>
        <DashboardSideBar theme={theme} />

        {userData ? (
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
              <MyTypography variant={"h5"} text={"Edit User"} />
              <RouterLink to={"/newUser"}>
                <MyButton
                  variant={"contained"}
                  text={"Create User"}
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
                  {/* User CARD */}
                  <Card raised={true} sx={{ padding: "18px" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: "12px",
                      }}
                    >
                      <MyTypography variant={"h4"} text={userData.userName} />
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
                        <MyTypography variant={"body1"} text={userData._id} />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "Left",
                          alignItems: "center",
                          marginBottom: "8px",
                        }}
                      >
                        <Mail sx={{ marginRight: "12px" }} />
                        <MyTypography variant={"body1"} text={userData.email} />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "Left",
                          alignItems: "center",
                          marginBottom: "8px",
                        }}
                      >
                        <Work sx={{ marginRight: "12px" }} />
                        <MyTypography
                          variant={"body1"}
                          text={userData.designation}
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
                          text={userData.createdAt}
                        />
                      </Box>
                    </Box>
                  </Card>
                </Grid>

                {/* Edit User */}
                <Grid item xs={12} sm={12} md={6}>
                  <Card raised="true" sx={{ padding: "18px" }}>
                    <MyTypography
                      variant={"h5"}
                      text={"Edit User"}
                      gutterBottom={true}
                    />
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
                      helperText={
                        errors.userName ? errors.userName.message : ""
                      }
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
                          value:
                            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
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
                        <RadioGroup row>
                          <FormControlLabel
                            value={"Customer"}
                            label={"Customer"}
                            control={
                              <Radio
                                {...register("designation", {
                                  required: "Please Choose Account Type",
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
                        </RadioGroup>
                        <FormHelperText>
                          {errors.designation ? errors.designation.message : ""}
                        </FormHelperText>
                      </FormControl>
                    </Box>

                    <MyButton
                      variant={"contained"}
                      text={"Update User"}
                      type="submit"
                      size={"large"}
                      fullWidth={true}
                      color={"primary"}
                      onClick={handleSubmit(onEditUser)}
                    />
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        ) : (
          <MyBackdrop />
        )}
      </Grid>
    </PageContainer>
  );
};

export default User;
