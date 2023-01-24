import { Box, Grid } from "@mui/material";
import { UNSAFE_convertRoutesToDataRoutes } from "@remix-run/router";
import React, { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { productsData } from "../data/productsData";
import Chart from "./Chart";
import InfoCard from "./InfoCard";
import TransactionsWidget from "./TransactionsWidget";
import { userRequest } from "../requestMethods";

const DashboardMainPage = () => {
  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/user/stats");
        // console.log("res.data");
        // console.log(res.data);

        const userstate = [];
        res.data.map((item)=>{
          userstate.push({"name":MONTHS[item._id - 1],"New Users": item.total})
        });
        setUserStats(userstate)

      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [MONTHS]);

  // console.log(userStats);

  const chartData = [
    {
      name: "May",
      "Active User": 4000,
    },
    {
      name: "June",
      "Active User": 3000,
    },
    {
      name: "July",
      "Active User": 2000,
    },
    {
      name: "August",
      "Active User": 2780,
    },
    {
      name: "Sept",
      "Active User": 1890,
    },
    {
      name: "Oct",
      "Active User": 2390,
    },
    {
      name: "Nov",
      "Active User": 3490,
    },
  ];
  return (
    <Grid item xs={12} sm={8} md={9} lg={9} xl={10}>
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <InfoCard
            Title={"Revenue"}
            money={"199.99"}
            difference={"1.49"}
            differenceStatus={true}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <InfoCard
            Title={"Users"}
            money={"24"}
            difference={"-32.49"}
            differenceStatus={false}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <InfoCard
            Title={"Cost"}
            money={"986.58"}
            difference={"+32.49"}
            differenceStatus={false}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <InfoCard
            Title={"Budget"}
            money={"56000"}
            difference={"+13.49"}
            differenceStatus={true}
          />
        </Grid>
      </Grid>

      <Chart
        chartData={userStats}
        title={"Users Analytics"}
        dataKey={"New Users"}
      />
      {/* <Chart chartData={chartData} title={"Users Analytics"} dataKey={"Active User"} /> */}
      <TransactionsWidget
        title={"Latest Transactions"}
        productsData={productsData}
      />
    </Grid>
  );
};

export default DashboardMainPage;
