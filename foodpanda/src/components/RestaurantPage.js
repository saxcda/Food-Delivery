import React from "react";
import { useNavigate } from "react-router-dom";
import NavigationBreadcrumbs from "./NavigationBreadcrumbs";
import RestaurantGrid from "./RestaurantGrid";
import Footer from "./Footer";
import Header from "./Header";
import { useParams } from "react-router-dom";
import { restaurantData } from "../data/restaurants";

const RestaurantPage = () => {
  const navigate = useNavigate();
  const { city } = useParams();

  const restaurants = restaurantData.filter((restaurant) => restaurant.city === city);

  const handleRestaurantClick = (restaurantName) => {
    navigate(`/restaurants/${city}/${encodeURIComponent(restaurantName)}`);
  };

  const handleBackToHome = () => {
    // Navigate to Home page
    navigate("/");
    
  };

  return (
    <div>
      <Header />
      <NavigationBreadcrumbs
        selectedCity={city}
        selectedRestaurant={null}
        onBackToHome={handleBackToHome}
        onBackToRestaurants={() => navigate(`/restaurants/${city}`)} // Use 'city' for the back navigation

      />
      <RestaurantGrid
        restaurants={restaurants}
        onRestaurantClick={handleRestaurantClick} // Pass handler to grid
      />
      <Footer />
    </div>
  );
};

export default RestaurantPage;
