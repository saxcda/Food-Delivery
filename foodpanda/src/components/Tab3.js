import React, { useEffect, useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import RestaurantCard from "../components/RestaurantCard";
import { useNavigate } from "react-router-dom";

const Tab3 = ({ handleRestaurantClick }) => {
  const [promotions, setPromotions] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch promotions data from the backend
    const fetchPromotions = async () => {
      try {
        const response = await fetch(`http://localhost:5000/groceries_promotions`);
        const data = await response.json();
        setPromotions(data);
        console.log(data)
      } catch (error) {
        console.error("Failed to fetch promotions:", error);
      }
    };

    // Fetch restaurant data from the backend
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`http://localhost:5000/groceries_restaurants`);
        const data = await response.json();
        setRestaurantData(data);
        console.log(data)
      } catch (error) {
        console.error("Failed to fetch restaurant data:", error);
      }
    };

    fetchPromotions();
    fetchRestaurants();
  }, []);

  const handleCardClick = (restaurantName) => {
    navigate(`/groceries/${encodeURIComponent(restaurantName)}`); // 跳转到商家详情页面
  };

  return (
    <div className="tab3-container"
    style={{
      
      width: "100%", // Allow it to stretch to the full width
      height: "100%", // Optional: Allow it to stretch vertically
      //flexGrow: 1, // Allow the children to grow within the flex layout
      boxSizing: "border-box", // Include padding/border in the dimensions
    }}
    >
      {/* Promotions Section */}
      <Typography variant="h5" gutterBottom>
        精選優惠
      </Typography>
      <Box className="promotion-section" display="flex" gap={2} mb={4}>
        {promotions.length > 0 ? (
          promotions.map((promo) => (
            <Box
              key={promo.id}
              className="promo-card"
              padding={2}
              borderRadius={2}
              bgcolor="#ffe4e1"
              //flex={1}
              width={"200px"}
              textAlign="center"
            >
              <Typography variant="body1" fontWeight="bold">
                {promo.title}
              </Typography>
              <Typography variant="body2">{promo.description}</Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            沒有可用的優惠。
          </Typography>
        )}
      </Box>

      {/* Today's Offers Section */}
      <Typography variant="h5" gutterBottom>
        今日好康
      </Typography>
      <Grid container spacing={2} className="today-offers">
        {restaurantData.length > 0 ? (
          restaurantData.map((restaurant, index) => (
            <Grid item xs={12} sm={4} md={3} key={index}>
              <RestaurantCard
                restaurant={restaurant}
                onClick={() => handleCardClick(restaurant.name)} // 点击事件
              />
            </Grid>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            沒有符合條件的餐廳。
          </Typography>
        )}
      </Grid>
    </div>
  );
};

export default Tab3;
