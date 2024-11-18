import React from "react";
import { Grid, Button } from "@mui/material";
import RestaurantCard from "./RestaurantCard";

const RestaurantGrid = ({ restaurants, onRestaurantClick, onBack }) => {
  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={onBack}
        sx={{ mb: 2 }}
      >
        返回縣市選單
      </Button>
      <Grid container spacing={3} justifyContent="center">
        {restaurants.map((restaurant, index) => (
          <Grid item key={index}>
            <RestaurantCard
              restaurant={restaurant}
              onClick={() => onRestaurantClick(restaurant)}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default RestaurantGrid;
