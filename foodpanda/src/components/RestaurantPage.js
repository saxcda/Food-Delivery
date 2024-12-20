import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import NavigationBreadcrumbs from "./NavigationBreadcrumbs";
import RestaurantGrid from "./RestaurantGrid";
import Footer from "./Footer";
import Header from "./Header";
import { useParams } from "react-router-dom";
import panda_burger from "./Pictures/panda_burger.jpg";
import { Box, Typography } from "@mui/material";
import HeaderLocation from "./HeaderLocation";
import CitySearch from "./CitySearch";

const RestaurantPage = ({ setlogin, setlogout, loginState,  user, setUser }) => {
  const navigate = useNavigate();
  const { city } = useParams();

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

  const handleBackToHome = () => {
    // Navigate to Home page
    navigate("/");
  };

  return (
    <div>
      <HeaderLocation setlogin={setlogin} setlogout={setlogout} loginState={loginState}  user={user} setUser={setUser} />

      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          display: "flex",
          overflow: "hidden",
          position: "relative",
          height: "300px",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            margin: "0 0 0 10%",
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            推薦美食，外送到家
          </Typography>
        </Box>
        
        

        <Box
          component="img"
          src={panda_burger} // Replace with your image URL
          sx={(theme) => ({
            marginLeft: "auto",
            width: "700px", // Adjust width as needed
            right: "0%",
            objectPosition: "right", // Focus the image from the left side
            position: "absolute", // Make it overflow based on position
          })}
        />
      </Box>

      

      <NavigationBreadcrumbs
        selectedCity={city}
        selectedRestaurant={null}
        onBackToHome={handleBackToHome}
        onBackToRestaurants={() => navigate(`/restaurants/${city}`)} // Use 'city' for the back navigation
      />

      <CitySearch location={city}/>
      
      <RestaurantGrid
        restaurants={restaurants}
        onRestaurantClick={handleRestaurantClick} // Pass handler to grid
      />
      <Footer />
    </div>
  );
};

export default RestaurantPage;
