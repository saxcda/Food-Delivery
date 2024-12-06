import React, {useEffect, useState} from "react";
import { Grid, Typography } from "@mui/material";
import RestaurantCard from "./RestaurantCard";
import { useNavigate, useParams } from "react-router-dom";
import restaurantData from "../data/restaurantData";

const RestaurantGrid = () => {
  const { city } = useParams();
  const navigate = useNavigate();

  const [restaurants, setRestaurantData] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
          try {
              console.log(city)
              const response = await fetch(`http://localhost:5000/restaurants?city=${city}`);
              const data = await response.json();

              setRestaurantData(data);
              console.log(data)
          } catch (err) {
              console.error('Error fetching restaurant data:', err.message);
          }
      };

      fetchData();
  }, []);

  const handleRestaurantClick = (restaurantName) => {
    navigate(`/restaurants/${city}/${encodeURIComponent(restaurantName)}`);
  };

  return (
    <Grid 
      container spacing={1} 
      justifyContent="flex-start" 
      minHeight={"450px"}
      padding={"0 8% 0 8%"}
      >
      {restaurants.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          沒有找到符合條件的餐廳。
        </Typography>
      ) : (
        restaurants.map((restaurant, index) => (
          <Grid 
            item key={index} 
            md={4}
            >
            <RestaurantCard
              restaurant={restaurant}
              onClick={() => handleRestaurantClick(restaurant.name)} 
            />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default RestaurantGrid;
