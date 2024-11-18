import React from "react";
import { Box, Button } from "@mui/material";

const RestaurantDetails = ({ restaurant, onBack }) => {
  return (
    <Box>
      <Button
        variant="contained"
        color="secondary"
        onClick={onBack}
        sx={{ mb: 2 }}
      >
        返回
      </Button>
      <img
        src={restaurant.image}
        alt={restaurant.name}
        style={{ width: "100%", height: "auto", marginBottom: "16px" }}
      />
      <h2>{restaurant.name}</h2>
      <p><strong>評分：</strong>{restaurant.rating}</p>
      <p><strong>類型：</strong>{restaurant.type}</p>
      <p><strong>地點：</strong>{restaurant.location}</p>
      <p><strong>詳情：</strong>{restaurant.details}</p>
      <p>
        <strong>促銷：</strong>
        {restaurant.promotions.map((promo, index) => (
          <span key={index}>{promo} </span>
        ))}
      </p>
    </Box>
  );
};

export default RestaurantDetails;
