import React from "react";
import { Grid, Typography } from "@mui/material";
import RestaurantCard from "./RestaurantCard";

const RestaurantGrid = ({ restaurants = [], onRestaurantClick }) => {
  return (
    <Grid container spacing={3} justifyContent="center">
      {restaurants.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          沒有找到符合條件的餐廳。
        </Typography>
      ) : (
        restaurants.map((restaurant, index) => (
          <Grid item key={index}>
            <RestaurantCard
              restaurant={restaurant}
              onClick={() => onRestaurantClick(restaurant)}
            />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default RestaurantGrid;
