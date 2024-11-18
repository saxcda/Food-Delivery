import React, { useState } from "react";
import { Container, Box } from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RestaurantGrid from "./components/RestaurantGrid";
import RestaurantDetails from "./components/RestaurantDetails";
import { restaurantData } from "./data/restaurants";

const App = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  return (
    <Container maxWidth="lg">
      <Header />
      <Box sx={{ mt: 4 }}>
        {!selectedRestaurant ? (
          <RestaurantGrid
            restaurants={restaurantData}
            onRestaurantClick={(restaurant) => setSelectedRestaurant(restaurant)}
          />
        ) : (
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