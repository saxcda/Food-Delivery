import React from "react";
import BreadcrumbNav from "../components/Breadcrumbs";
import { Box, Typography, Grid } from "@mui/material";
import RestaurantCard from "../components/RestaurantCard"; // 餐廳卡片元件

const CityPage = ({ city, restaurants }) => {
  const breadcrumbLinks = [
    { label: "首頁", href: "/", active: false },
    { label: city, href: `/city/${city}`, active: true },
  ];

  return (
    <Box>
      {/* 面包屑導航 */}
      <BreadcrumbNav links={breadcrumbLinks} />

      {/* 城市標題 */}
      <Typography variant="h4" gutterBottom>
        {city} - 餐廳列表
      </Typography>

      {/* 餐廳列表 */}
      <Grid container spacing={3}>
        {restaurants.map((restaurant, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <RestaurantCard restaurant={restaurant} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CityPage;
