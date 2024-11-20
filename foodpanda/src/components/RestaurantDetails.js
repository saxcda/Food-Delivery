import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Chip,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./RestaurantDetails.css";

const RestaurantDetails = ({ restaurant }) => {
  const categoryRefs = useRef([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [deliveryType, setDeliveryType] = useState("外帶");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0); // 新增：追踪当前可见分类

  const scrollToCategory = (index) => {
    categoryRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart((prevCart) =>
      prevCart.filter((_, index) => index !== indexToRemove)
    );
  };

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3, // 30% 可见性时触发
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = categoryRefs.current.indexOf(entry.target);
          setActiveCategory(index);
        }
      });
    }, observerOptions);

    categoryRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  if (!restaurant || !Array.isArray(restaurant.categories)) {
    return (
      <Typography variant="body1" color="error">
        餐廳訊息不完整
      </Typography>
    );
  }

  const totalPrice = cart.reduce((total, item) => total + item.price, 0).toFixed(2);

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

      {/* 類別總覽 Bar */}
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
        <TextField
          variant="outlined"
          placeholder="搜尋菜單..."
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ width: 300 }}
        />
        {restaurant.categories.map((category, index) => (
          <Button
            key={index}
            variant={activeCategory === index ? "contained" : "outlined"}
            color={activeCategory === index ? "secondary" : "default"}
            onClick={() => scrollToCategory(index)}
          >
            {category.displayName} ({category.items.length})
          </Button>
        ))}
      </Box>

      {/* 菜單和購物車佈局 */}
      <Grid container spacing={2}>
        {/* 菜單 */}
        <Grid item xs={12} md={8}>
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
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => addToCart(menuItem)}
                          >
                            加入購物車
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            </Box>
          ))}
        </Grid>

        {/* 購物車 */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              position: "sticky",
              top: 80,
              border: "2px solid",
              borderRadius: 2,
              p: 2,
              height: "400px",
              overflowY: "auto",
            }}
          >
            <Typography variant="h6" gutterBottom>
              購物車
            </Typography>
            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Button
                variant={deliveryType === "外帶" ? "contained" : "outlined"}
                onClick={() => setDeliveryType("外帶")}
              >
                外帶
              </Button>
              <Button
                variant={deliveryType === "外送自取" ? "contained" : "outlined"}
                onClick={() => setDeliveryType("外送自取")}
              >
                外送自取
              </Button>
            </Box>

            {cart.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  textAlign: "center",
                }}
              >
                <ShoppingCartIcon sx={{ fontSize: 80, color: "gray" }} />
                <Typography variant="body1" color="textSecondary">
                  購物車目前是空的
                </Typography>
              </Box>
            ) : (
              <Box>
                {cart.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                      borderBottom: "1px solid gray",
                    }}
                  >
                    <Typography variant="body2">{item.name}</Typography>
                    <Button
                      size="small"
                      variant="text"
                      color="error"
                      onClick={() => removeFromCart(index)}
                    >
                      移除
                    </Button>
                  </Box>
                ))}
                <Typography variant="h6" sx={{ mt: 2 }}>
                  總計: ${totalPrice}
                </Typography>
                <Button variant="contained" color="primary" onClick={openDialog}>
                  查看明細
                </Button>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>

      {/* 明細對話框 */}
      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>購物車明細</DialogTitle>
        <DialogContent>
          {cart.map((item, index) => (
            <Typography key={index} variant="body1">
              {item.name} - ${item.price}
            </Typography>
          ))}
          <Typography variant="h6" sx={{ mt: 2 }}>
            總計: ${totalPrice}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>關閉</Button>
          <Button variant="contained" color="primary">
            確認下單
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RestaurantDetails;
