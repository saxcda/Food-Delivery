import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";

const NavigationBreadcrumbs = ({
  selectedCity,
  selectedRestaurant,
  onBackToHome,
  onBackToRestaurants,
}) => {
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ 
                                              marginLeft:"50px",
                                              marginTop:"30px",
                                              mb: 2 
                                              }}>
      <Link
        underline="hover"
        color="inherit"
        onClick={onBackToHome}
        style={{ cursor: "pointer" }}
      >
        首頁
      </Link>
      {selectedCity && (
        <Link
          underline="hover"
          color="inherit"
          onClick={onBackToRestaurants}
          style={{ cursor: "pointer" }}
        >
          {selectedCity}
        </Link>
      )}
      {selectedRestaurant && (
        <Typography color="text.primary">{selectedRestaurant.name}</Typography>
      )}
    </Breadcrumbs>
  );
};

export default NavigationBreadcrumbs;
