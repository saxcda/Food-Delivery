import React from "react";
import { Card, CardMedia, CardContent, Typography, CardActionArea } from "@mui/material";

const CityCard = ({ city, image, onClick }) => {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardActionArea onClick={onClick}>
        <CardMedia component="img" height="140" image={image} alt={city} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {city}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CityCard;
