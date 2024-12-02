import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { restaurantData } from "./data/restaurants";
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
import Note_foodpanda from "./components/Note_foodpanda";
import RestaurantPage from "./components/RestaurantPage";
import RestaurantDetailsPage from "./components/RestaurantDetailsPage";
import Home from "./components/Home";
import { useEffect } from "react";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants/:city" element={<RestaurantPage />} />
        <Route path="/restaurants/:city/:restaurantName" element={<RestaurantDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
