import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import RestaurantDetails from "./RestaurantDetails";
import NavigationBreadcrumbs from "./NavigationBreadcrumbs";
import Header from "./Header";
import Footer from "./Footer";
import HeaderLocation from "./HeaderLocation";

const RestaurantDetailsPage = ({ restaurantData }) => {
  const { city, restaurantName } = useParams();
  const navigate = useNavigate();

  const restaurant = restaurantData.find(
    (r) => r.name === decodeURIComponent(restaurantName) && r.city === city
  );

  if (!restaurant) {
    navigate(`/restaurants/${city}`);
    return null;
  }

  const handleBack = () => {
    navigate(`/restaurants/${city}`);
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
      <RestaurantDetails restaurant={restaurant} />
      <button onClick={handleBack}>Back to Restaurant List</button>
      <Footer />
    </div>
  );
};

export default RestaurantDetailsPage;
