import { TextField } from "@mui/material";

const MyTextField = ({
  id,
  name,
  label,
  onChange,
  variant,
  fullWidth,
  type,
  placeholder,
  margin,
  error,
  helperText,
  multiline,
  required,
  value,
  size,
  width,
  defaultValue
  // inputRef
}) => {
  return (
    <>
    <TextField
      id={id}
      name={name}
      variant={variant}
      type={type}
      label={label}
      onChange={onChange}
      fullWidth={fullWidth}
      placeholder={placeholder}
      margin={margin}
      error={error}
      helperText={helperText}
      multiline={multiline}
      required={required}
      value={value}
      defaultValue={defaultValue}
      size={size}
      sx={{width:{width}}}
      // inputRef={inputRef}
    />
    </>
  );
};

export default MyTextField;


{/* <MyTextField id={"textID"} name={"Username"} variant={"outlined"} type={"password"} label={"username"} size={"small"} fullWidth={false} placeholder={"Fahad"} margin={"normal"} error={true} helperText={"Type username"} multiline={true} required={true}  /> */}
