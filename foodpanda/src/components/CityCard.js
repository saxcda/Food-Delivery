import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const CityCard = ({ city, image }) => {
  return (
    <Card sx={{ maxWidth: 250, m: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={city}
      />
      <CardContent>
        <Typography variant="h6" component="div" align="center">
          {city}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CityCard;
