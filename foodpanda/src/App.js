import React, { useState } from "react";
import restaurantData from "./data/restaurantData";
import CityGrid from "./components/CityGrid";
import RestaurantGrid from "./components/RestaurantGrid";
import NavigationBreadcrumbs from "./components/NavigationBreadcrumbs";
import RestaurantDetails from "./components/RestaurantDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Location from "./components/Location";
import Join_foodpanda from "./components/Join_foodpanda";
import Know_more from "./components/Know_more";
import Download from "./components/Download";
import Note_foodpanda from "./components/Note_foodpanda"
import FoodDeliveryPage from "./Pages/FoodDeliveryPage";
import RestaurantPage from "./components/RestaurantPage";
import RestaurantDetailsPage from "./components/RestaurantDetailsPage";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import { useEffect } from "react";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} /> {/* Add Profile route */}
        <Route path="/restaurants/:city" element={<RestaurantPage />} />
        <Route path="/restaurants/:city/:restaurantName" element={<RestaurantDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
