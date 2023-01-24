import { Alert } from '@mui/material'
import React from 'react'

const MyAlert = ({severity,text}) => {
  return (
    <Alert severity={severity}>
        {text}
    </Alert>
  )
}

export default MyAlert


{/*  <MyAlert severity={"error"} text={"User Has Been Deleted."} />
<Alert severity="error">This is an error alert — check it out!</Alert>
<Alert severity="warning">This is a warning alert — check it out!</Alert>
<Alert severity="info">This is an info alert — check it out!</Alert>
<Alert severity="success">This is a success alert — check it out!</Alert> */}