import { Button } from "@mui/material";

const MyButton = ({ text, variant, size, fullWidth, color, onClick,disabled}) => {
  return (
    <Button
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      color={color}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};

export default MyButton;


{/* <MyButton variant={"contained"} text={"TexButton Text"} size={"medium"} fullWidth={false} color={"secondary"} onClick={handleclick} /> */}