import { Typography } from "@mui/material";

const MyTypography = ({
  text,
  align,
  gutterBottom,
  variant,
  component,
  color,
}) => {
  return (
    <Typography
      variant={variant}
      component={component}
      align={align}
      gutterBottom={gutterBottom}
      color={color}
    >
      {text}
    </Typography>
  );
};

export default MyTypography;


{/* <MyTypography text={"Typography Text"} variant={"h5"} color={"secondary"} component={"h1"} align={"left"} gutterBottom={true} /> */}