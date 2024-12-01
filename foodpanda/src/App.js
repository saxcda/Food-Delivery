import React, { useState } from "react";
import { restaurantData } from "./data/restaurants";
import CityGrid from "./components/CityGrid";
import RestaurantGrid from "./components/RestaurantGrid";
import NavigationBreadcrumbs from "./components/NavigationBreadcrumbs";
import RestaurantDetails from "./components/RestaurantDetails"
import Header from "./components/Header";
import Footer from "./components/Footer";
import Location from "./components/Location"
import Join_foodpanda from "./components/Join_foodpanda"
import Know_more from "./components/Know_more";
import Download from "./components/Download";
import Note_foodpanda from "./components/Note_foodpanda";

const App = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // 選擇城市
  const handleCityClick = (cityName) => {
    setSelectedCity(cityName);
    setSelectedRestaurant(null); // 確保不會顯示上一個選擇的餐廳
  };

  // 返回城市選擇
  const handleBackToHome = () => {
    setSelectedCity(null);
    setSelectedRestaurant(null);
  };

  // 返回餐廳列表
  const handleBackToRestaurants = () => {
    setSelectedRestaurant(null);
  };

  // 選擇餐廳
  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  //location selector
  const [location, setLocation] = React.useState("");
  const [loadingLocation, setLoadingLocation] = React.useState(false);

  const handleFindMyLocation = () => {
    setLoadingLocation(true);
    // Simulate location finding process
    setTimeout(() => {
      setLocation("33301 桃園市, 文化一路259號");
      setLoadingLocation(false);
    }, 2000);
  };

  const filteredRestaurants = selectedCity
    ? restaurantData.filter((restaurant) => restaurant.city === selectedCity)
    : [];

  

  return (
    <div>
      <Header />
      
      <Location
        location={location}
        loadingLocation={loadingLocation}
        handleFindMyLocation={handleFindMyLocation}
      />
    
      <Join_foodpanda />

      <NavigationBreadcrumbs
        selectedCity={selectedCity}
        selectedRestaurant={selectedRestaurant}
        onBackToHome={handleBackToHome}
        onBackToRestaurants={handleBackToRestaurants}
      />
      {!selectedCity ? (
        <CityGrid onCityClick={handleCityClick} />
      ) : selectedRestaurant ? (
        <RestaurantDetails
          restaurant={selectedRestaurant}
        />
      ) : (
        <RestaurantGrid
          restaurants={filteredRestaurants}
          onRestaurantClick={handleRestaurantClick}
        />
      )}
      <Download/>
      <Know_more/>
      <Note_foodpanda/>
      <Footer />
    </div>
  );
};

export default App;

//wajndoanw