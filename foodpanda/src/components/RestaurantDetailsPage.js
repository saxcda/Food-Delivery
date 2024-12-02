import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import RestaurantDetails from "./RestaurantDetails";  // Restaurant details component
import NavigationBreadcrumbs from "./NavigationBreadcrumbs";
import Header from "./Header";
import Footer from "./Footer";
import { restaurantData } from "../data/restaurants"; // Assuming you have this data available
import HeaderLocation from "./HeaderLocation";

const RestaurantDetailsPage = () => {
  const { city, restaurantName } = useParams(); // Retrieve city and restaurantName from the URL
  const navigate = useNavigate();

  // Find the restaurant by name and city
  const restaurant = restaurantData.find(
    (r) => r.name === decodeURIComponent(restaurantName) && r.city === city
  );

  if (!restaurant) {
    navigate(`/restaurants/${city}`); // Navigate back to the restaurant list if not found
    return null;
  }

  const handleBack = () => {
    navigate(`/restaurants/${city}`); // Navigate back to the restaurant list page
  };

  return (
    <div>
      <HeaderLocation />
      <NavigationBreadcrumbs
      selectedCity={restaurant.city}
      selectedRestaurant={restaurant}
      onBackToHome={() => navigate("/")}
      onBackToRestaurants={() => navigate(`/restaurants/${restaurant.city}`)}
    />
      <RestaurantDetails restaurant={restaurant} />  {/* Pass the restaurant to the details component */}
      <button onClick={handleBack}>Back to Restaurant List</button>
      <Footer />
    </div>
  );
};

export default RestaurantDetailsPage;
