import { Backdrop, Box, CircularProgress, Grid, Snackbar } from "@mui/material";
import React from "react";
import DashboardSideBar from "../components/DashboardSideBar";
import MyTypography from "../components/muiElements/MyTypography";
import { Image, PageContainer, RouterLink } from "../styles/globalStyles";
import { useTheme } from "@mui/system";
import { DataGrid} from "@mui/x-data-grid";
import MyButton from "../components/muiElements/MyButton";
import { useState } from "react";
import usersData from "../data/usersData";
import { useEffect } from "react";
import { publicRequest, userRequest } from "../requestMethods";
import MyAlertDialog from "../components/muiElements/MyAlertDialog";
import MyAlert from "../components/muiElements/MyAlert";

const Users = () => {
  const theme = useTheme();
  const [data, setData] = useState(usersData);
  const [usersdata, setUsersData] = useState(null);

  useEffect(()=>{
    console.log("Requesting Users Data")
    const getUsers = async ()=>{
      const res = await userRequest.get("/user/findallusers")
      setUsersData(res.data)
    }
    getUsers();
    console.log(usersdata)
  },[])


  const [deleteSnackBarOpen,setDeleteSnackBarOpen] = useState(false)
  const DeleteSnackBarOpen = () => {
    setDeleteSnackBarOpen(true)
  }
  const DeleteSnackBarClose = () => {
    setDeleteSnackBarOpen(false)
  }
  
  const handleUserDelete = (id) => {
    console.log(`Deleting User ${id}`)
    let deleteResponse = null;
    const deleteUser = async () => {
      const res = await userRequest.delete(`/user/deleteuser/${id}`,data);
      console.log(res.data)
      deleteResponse = res.data;
    }
    deleteUser()
    if(deleteResponse === "User Has Been Deleted"){
      setDeleteSnackBarOpen(true)
    }
    setUsersData(usersdata.filter((item) => item._id !== id));
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 70 },
    { field: "userName",headerName: "User",width: 220,},
    { field: "email", headerName: "Email", width: 220 },
    { field: "designation", headerName: "Designation", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
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
              <RouterLink to={"/user/" + params.row._id}>
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
                onClick={() => handleUserDelete(params.row._id)}
              />
              
            </Box>
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
            <MyTypography variant={"h5"} text={"Users Details"} />
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
          {usersdata ?
            <DataGrid
            rows={usersdata}
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
      <Snackbar open={deleteSnackBarOpen} autoHideDuration={5000} onClose={DeleteSnackBarClose} >
                <MyAlert severity={"error"} text={"User Has Been Deleted."} />
              </Snackbar>
    </PageContainer>
  );
};

export default Users;
