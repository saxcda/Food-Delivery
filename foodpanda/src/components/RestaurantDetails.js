import React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Button,
} from "@mui/material";

const RestaurantDetails = ({ restaurant }) => {
  return (
    <Box>
      <Card sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <CardMedia
              component="img"
              alt={restaurant.name}
              image={restaurant.image}
              sx={{ height: "100%", objectFit: "cover" }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {restaurant.name}
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                {restaurant.type} | {restaurant.rating} ⭐
              </Typography>
              <Typography variant="body1" gutterBottom>
                地址：{restaurant.location}
              </Typography>
              <Typography variant="body1" gutterBottom>
                促銷活動：
              </Typography>
              <ul>
                {restaurant.promotions.map((promo, index) => (
                  <li key={index}>
                    <Typography variant="body2" color="primary">
                      {promo}
                    </Typography>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Grid>
        </Grid>
      </Card>

      <Typography variant="h5" gutterBottom>
        菜單
      </Typography>
      <Grid container spacing={2}>
        {restaurant.menu.map((menuItem, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                alt={menuItem.name}
                image={menuItem.image}
                sx={{ height: 150 }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {menuItem.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  ${menuItem.price} {menuItem.originalPrice && <del>${menuItem.originalPrice}</del>}
                </Typography>
                <Button variant="outlined" size="small">
                  加入購物車
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RestaurantDetails;
