import React from "react";
import { useParams, Link } from "react-router-dom";
import { Typography, Box } from "@mui/material";

const CityPage = () => {
  const { cityName } = useParams(); // 取得動態路由中的城市名稱
  const restaurantData = {
    "台北市": ["八方雲集", "麥味登", "路易莎咖啡", "McDonald's 麥當勞"],
    "新北市": ["春水堂", "拉亞漢堡", "大埔鐵板燒"],
    // 可以擴充其他縣市的餐廳資料
  };

  const restaurants = restaurantData[cityName] || [];

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {cityName} 的餐廳列表
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {restaurants.length > 0 ? (
          restaurants.map((name, index) => (
            <Link
              to="#"
              key={index}
              style={{ textDecoration: "none", fontSize: "1rem", color: "inherit" }}
            >
              {name}
            </Link>
          ))
        ) : (
          <Typography variant="body1">目前沒有資料。</Typography>
        )}
      </Box>
    </Box>
  );
};

export default CityPage;
