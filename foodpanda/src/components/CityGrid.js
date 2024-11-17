import React from "react";
import { Grid } from "@mui/material";
import CityCard from "./CityCard";

const cities = [
  { name: "台北市", image: "https://example.com/taipei.jpg" },
  { name: "新北市", image: "https://example.com/newtaipei.jpg" },
  { name: "台中市", image: "https://example.com/taichung.jpg" },
  { name: "台南市", image: "https://example.com/tainan.jpg" },
  { name: "高雄市", image: "https://example.com/kaohsiung.jpg" },
];

const CityGrid = () => {
  return (
    <Grid container spacing={3} justifyContent="center">
      {cities.map((city, index) => (
        <Grid item key={index}>
          <CityCard city={city.name} image={city.image} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CityGrid;
