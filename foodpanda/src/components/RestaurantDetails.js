import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  TextField,
  Divider,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./RestaurantDetails.css";


const RestaurantDetails = ({ restaurant }) => {
  const [showReviews, setShowReviews] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

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
      {/* 餐廳資訊 */}
      <Card sx={{ mb: 4 }}>
      <CardContent>
        {/* 餐廳類型 */}
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {restaurant.type}
        </Typography>

        {/* 餐廳名稱 */}
        <Typography variant="h5" gutterBottom>
          {restaurant.name}
        </Typography>

        {/* 餐廳評分與操作按鈕 */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
          <Typography variant="body2" sx={{ display: "flex", alignItems: "center", color: "text.secondary" }}>
            ⭐ {restaurant.rating} / 5
          </Typography>

          {/* 查看評論按鈕 */}
          <Button
            variant="outlined"
            size="small"
            onClick={() => setShowReviews(true)} // 彈出評論視窗
          >
            查看評論
          </Button>

          {/* 更多資訊按鈕 */}
          <Button
            variant="outlined"
            size="small"
            onClick={() => setShowMoreInfo(true)} // 彈出更多資訊視窗
          >
            更多資訊
          </Button>
          
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => alert("已收藏該餐廳！")} // 收藏按鈕功能，替換為你的收藏邏輯
            sx={{
              ml: "auto", // 靠右對齊
            }}
          >
            收藏
          </Button>

        </Box>

        

        {/* 餐廳詳細描述 */}
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {restaurant.details}
        </Typography>

        {/* 餐廳地址 */}
        <Typography variant="body2" color="text.secondary">
          地址：{restaurant.location}
        </Typography>

        {/* 可用優惠 */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" gutterBottom>
            可使用的優惠：
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {restaurant.promotions.map((promotion, index) => (
              <Chip key={index} label={promotion} sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }} />
            ))}
          </Box>
        </Box>

        {/* 彈跳視窗：評論 */}
        {showReviews && (
          <Dialog open={showReviews} onClose={() => setShowReviews(false)}>
            <DialogTitle>評論</DialogTitle>
            <DialogContent>
              <DialogContentText>
                這裡顯示餐廳的評論內容...
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowReviews(false)}>關閉</Button>
            </DialogActions>
          </Dialog>
        )}

        {/* 彈跳視窗：更多資訊 */}
        {showMoreInfo && (
          <Dialog open={showMoreInfo} onClose={() => setShowMoreInfo(false)}>
            <DialogTitle>更多資訊</DialogTitle>
            <DialogContent>
              <DialogContentText>
                這裡顯示餐廳的詳細資訊，例如營業時間、聯絡方式等。
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowMoreInfo(false)}>關閉</Button>
            </DialogActions>
          </Dialog>
        )}
      </CardContent>
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
