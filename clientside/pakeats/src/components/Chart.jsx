import { Card } from '@mui/material'
import React from 'react'
import MyTypography from './muiElements/MyTypography'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = ({chartData,title,dataKey}) => {
  return (
    <Card raised="true" sx={{ padding: "18px",marginTop:"24px" }}>
        <MyTypography variant={"h6"} text={title} gutterBottom={true} />
        <ResponsiveContainer width="100%" aspect={4 / 1}>
            <LineChart data={chartData} >
                <XAxis dataKey={"name"}  />
                <Line type={"monotone"} dataKey={dataKey} stroke={"#5550bd"} />
                <Tooltip />
                <CartesianGrid  strokeDasharray={"5 5"}/>
            </LineChart>
        </ResponsiveContainer>
    </Card>
  )
}

export default Chart