import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import MyButton from "./MyButton";

const MyAlertDialog = ({
    dialogStatus,
  dialogTitle,
  dialogContent,
  AgreeButtonText,
  AgreeButtonFunction,
  DisagreeButtonText,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialogOpen = () => {
    setOpenDialog(true);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <Dialog open={dialogStatus} onClose={handleDialogClose}>
      <DialogTitle>{DialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogContent}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <MyButton
          variant={"contained"}
          text={AgreeButtonText}
          size={"medium"}
          fullWidth={false}
          color={"primary"}
          onClick={AgreeButtonFunction}
        />
        <MyButton
          variant={"contained"}
          text={DisagreeButtonText}
          size={"medium"}
          fullWidth={false}
          color={"primary"}
          onClick={handleDialogClose}
        />
      </DialogActions>
    </Dialog>
  );
};

export default MyAlertDialog;
