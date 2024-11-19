import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Button,
  Chip,
  Divider,
  TextField,
} from "@mui/material";

const RestaurantDetails = ({ restaurant }) => {
  const categoryRefs = useRef([]);
  const [searchQuery, setSearchQuery] = useState("");

  const scrollToCategory = (index) => {
    categoryRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  if (!restaurant || !Array.isArray(restaurant.categories)) {
    return (
      <Typography variant="body1" color="error">
        餐厅信息不完整，请检查数据。
      </Typography>
    );
  }

  return (
    <Box>
      {/* 店家資訊 */}
      <Card sx={{ mb: 4, mt: 2 }}>
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
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                可使用的優惠
              </Typography>
              <Grid container spacing={2}>
                {restaurant.promotions.map((promo, index) => (
                  <Grid item key={index}>
                    <Chip label={promo} color="primary" />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </Card>

      {/* 類別總覽 Bar (固定浮動 + 搜尋欄) */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          display: "flex",
          gap: 2,
          alignItems: "center",
          p: 2,
          backgroundColor: "primary.light",
          borderBottom: "2px solid",
        }}
      >
        {/* 搜尋欄 (固定長度) */}
        <TextField
          variant="outlined"
          placeholder="搜尋菜單..."
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ width: 300 }}
        />

        {/* 類別按鈕 */}
        {restaurant.categories.map((category, index) => (
          <Button
            key={index}
            variant="contained"
            color="secondary"
            onClick={() => scrollToCategory(index)}
          >
            {category.displayName} ({category.items.length})
          </Button>
        ))}
      </Box>

      {/* 菜單 */}
      <Typography variant="h5" gutterBottom>
        菜單
      </Typography>
      {restaurant.categories.map((category, categoryIndex) => (
        <Box
          key={categoryIndex}
          ref={(el) => (categoryRefs.current[categoryIndex] = el)}
          sx={{ mb: 4 }}
        >
          <Typography variant="h6" gutterBottom>
            {category.displayName}
          </Typography>
          <Grid container spacing={2}>
            {category.items
              .filter((menuItem) =>
                menuItem.name.toLowerCase().includes(searchQuery)
              )
              .map((menuItem, index) => (
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
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                      >
                        ${menuItem.price}{" "}
                        {menuItem.originalPrice && (
                          <del>${menuItem.originalPrice}</del>
                        )}
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
      ))}
    </Box>
  );
};

export default RestaurantDetails;
