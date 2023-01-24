import React from "react";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

const MySelect = ({
  label,
  id,
  variant,
  selectoptions,
  labelId,
  HelperText,
  size,
  error,
  onchange,
  value,
  width
}) => {


  const [selectValue,setSelectValue] = useState("");

  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: "150px", width:"100%"}} size={size}>
    <InputLabel id={labelId}>{label}</InputLabel>
    <Select
      id={id}
      labelId={labelId}
      label={label}
      variant={variant}
      onChange={onchange}
      value={value}
      error={error}
      sx={{width:{width}}}
    >
      {selectoptions.map((item) => {
        return <MenuItem key={item} value={item}>{item}</MenuItem>;
      })}
    </Select>
    <FormHelperText>{HelperText}</FormHelperText>
    </FormControl>
  );
};

export default MySelect;


{/* <MySelect id={"selectCountry"} label={"Country"} labelId={"labelId"} variant={"outlined"} selectoptions={selectoptions} HelperText={"Select Country"} size={"small"} onchange={(e)=>handleSortFilter(e) /> */}

// const [sortfilters, setSortFilters] = useState("");
// const handleSortFilter = (e) => {
//     console.log(e.target.value)
//   setSortFilters(e.target.value);
//   console.log(sortfilters)
// };