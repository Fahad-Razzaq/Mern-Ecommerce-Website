import { Box, Button, Card, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import MyButton from "../components/muiElements/MyButton";
import MyTextField from "../components/muiElements/MyTextField";
import MyTypography from "../components/muiElements/MyTypography";
import { CenterConatiner, PageContainer } from "../styles/globalStyles";
import { useForm } from "react-hook-form";

const TrackOrder = () => {
  const [orderID, setOrderID] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const handleclick = (e) => {
    setOrderID(e.target.value);
    console.log(e.target.value);
  };
  const onTrack = (data) => {
    setOrderID(data.orderID);
    setOrderStatus("Pending")
  };
  return (
    <PageContainer>
      <CenterConatiner flexDirection={"column"}>
        <MyTypography variant={"h4"} text={"Track Order"} gutterBottom={true} />
        <Card raised sx={{ padding: "18px", width: "100%", maxWidth: "500px" }}>
          <TextField
            variant={"outlined"}
            type={"text"}
            label={"Order ID"}
            size={"small"}
            //   error={false}
            required={true}
            fullWidth={true}
            margin={"normal"}
            {...register("orderID", {
              required: "Please Put Order ID",
              minLength: 3,
              maxLength: 50,
              pattern: {
                value: /^[A-Za-z1-9 ]+$/,
                message: "Order ID is Invalid",
              },
            })}
            error={errors.orderID ? true : false}
            helperText={errors.orderID ? errors.orderID.message : ""}
          />
          <MyButton
            variant={"contained"}
            text={"Track"}
            type="submit"
            size={"large"}
            fullWidth={true}
            color={"primary"}
            onClick={handleSubmit(onTrack)}
          />
        </Card>

        {
            orderID ? (
                <Card
          raised
          sx={{
            padding: "18px",
            width: "100%",
            maxWidth: "700px",
            marginTop: "32px",
          }}
        >
          <MyTypography
            variant={"h6"}
            text={`Order ID: ${orderID}`}
            gutterBottom={true}
          />
          <MyTypography
            variant={"h6"}
            text={`Order Status: ${orderStatus}`}
            gutterBottom={true}
          />
        </Card>
            )
            :""
        }
      </CenterConatiner>
    </PageContainer>
  );
};

export default TrackOrder;
