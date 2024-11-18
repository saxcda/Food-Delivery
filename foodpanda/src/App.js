import React, { useState } from "react";
import { Container, Box } from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CityGrid from "./components/CityGrid";
import RestaurantGrid from "./components/RestaurantGrid";
import RestaurantDetails from "./components/RestaurantDetails";
import { restaurantData } from "./data/restaurants";

const App = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  return (
    <Container maxWidth="lg">
      <Header />
      <Box sx={{ mt: 4 }}>
        {!selectedCity ? (
          // 顯示縣市選單
          <CityGrid onCityClick={(city) => setSelectedCity(city)} />
        ) : !selectedRestaurant ? (
          // 顯示該縣市的餐廳列表
          <RestaurantGrid
            restaurants={restaurantData.filter(
              (restaurant) => restaurant.city === selectedCity
            )}
            onRestaurantClick={(restaurant) => setSelectedRestaurant(restaurant)}
            onBack={() => setSelectedCity(null)}
          />
        ) : (
          // 顯示餐廳詳細資訊
          <RestaurantDetails
            restaurant={selectedRestaurant}
            onBack={() => setSelectedRestaurant(null)}
          />
        )}
      </Box>
      <Footer />
    </Container>
  );
};

export default App;
