import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

const MyBackdrop = () => {
  return (
    <Backdrop open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default MyBackdrop;
