import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";

const RestaurantCard = ({ restaurant, onClick }) => {
  return (
    <Card sx={{ 
        maxWidth: 400, 
        borderRadius:"20px",
        
      }}>
      <CardActionArea onClick={() => onClick(restaurant.id)}>
        <CardMedia
          component="img"
          height="200"
          image={restaurant.image}
          alt={restaurant.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div"
          
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          >
            {restaurant.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {restaurant.type} | 評分: {restaurant.rating}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RestaurantCard;
