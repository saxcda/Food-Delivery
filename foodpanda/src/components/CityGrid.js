import React from "react";
import { Grid, Card, CardActionArea, CardContent, Typography } from "@mui/material";

const cities = [
  { name: "台北市", image: "https://example.com/taipei.jpg" },
  { name: "新北市", image: "https://example.com/newtaipei.jpg" },
  { name: "台中市", image: "https://example.com/taichung.jpg" },
  { name: "高雄市", image: "https://example.com/kaohsiung.jpg" },
  { name: "新竹市", image: "https://example.com/shinchu.jpg" },
];

const CityGrid = ({ onCityClick }) => {
  return (
    <Grid container spacing={3} justifyContent="center">
      {cities.map((city, index) => (
        <Grid item key={index}>
          <Card sx={{ maxWidth: 300 }}>
            <CardActionArea onClick={() => onCityClick(city.name)}>
              <img
                src={city.image}
                alt={city.name}
                style={{ width: "100%", height: "140px", objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {city.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CityGrid;
