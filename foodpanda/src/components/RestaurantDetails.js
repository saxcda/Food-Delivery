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
import { useNavigate, useParams } from "react-router-dom";
import restaurantData from "../data/restaurantData"; // Assuming you have this data available
import { PiHeart } from "react-icons/pi";
import panda_cart from "./Pictures/panda_cart.jpg";



const RestaurantDetails = () => {
  const { restaurantName } = useParams();
  const [restaurant, setRestaurant] = useState(null); // Replace prop with state  
  const navigate = useNavigate();


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

  // Fetch restaurant data based on the restaurantId
  useEffect(() => {
    const selectedRestaurant = restaurantData.find(
      (r) => r.name === decodeURIComponent(restaurantName)
    );    
    if (selectedRestaurant) {
      setRestaurant(selectedRestaurant);
    } else {
      navigate("/"); // Redirect if restaurant not found
    }
  }, [restaurantName, navigate]);
  

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
      <Box
        sx={{
          display:"flex",
          alignItems:"flex-start",
          height:"250px",
          padding:"0 5% 0 5%",
        }}
        >
        <Box
            
            component="img"
            alt={restaurant.name}
            image={restaurant.image}
            sx={{ height: "200px" ,width:"220px", borderRadius:"20px", marginTop:"20px", marginRight:"20px"
            }}

            />
        {/* 店家資訊 */}
        {/* 餐廳資訊 */}

        <Card sx={{ mb: 4 , flex:1 , boxShadow:"none"}}>
        
        <CardContent>
          {/* 餐廳類型 */}
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {restaurant.type}
          </Typography>

          {/* 餐廳名稱 */}
          <Typography variant="h5" gutterBottom fontWeight={"bold"}>
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
                size="large"
                onClick={() => alert("已收藏該餐廳！")} // 收藏按鈕功能，替換為你的收藏邏輯
                sx={{
                  ml: "auto", // 靠右對齊
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  border: "1px solid black",
                  color: "black",
                  padding: "10px 20px", // Adjust padding for box size
                  fontSize: "1.1rem", // Increase text size
                  borderRadius: "12px", // Optional: Rounded corners
                  "& .icon": {
                    fontSize: "1.6rem", // Adjust icon size
                  },
                  "&:hover":{
                    backgroundColor:"#f5f5f5", 
                  } 
                }}
              >
                <PiHeart className="icon" style={{ marginRight: "8px" }} />
                加入收藏
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

          {/* 可用優惠 
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
          */}

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
      </Box>

      <Box
        component="hr"
        sx={{
          border: "none", // Remove default border
          height: "2px", // Thickness of the line
          backgroundColor: "#f5f5f5", // Line color
          width: "100%", // Full width or customize as needed
          
        }}
      />


      {/* 可用優惠 */}
      <Box sx={{ mt: 2 , padding:"20px 5% 0 5%",}}>
            <Typography variant="h5" gutterBottom fontWeight={"bold"}>
              可使用的優惠：
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, }}>
              {restaurant.promotions.map((promotion, index) => (
                <Chip key={index} label={promotion} 
                sx={{ 
                  backgroundColor:"#FBF2F7", 
                  fontWeight: "bold" , 
                  height:"100px", 
                  width:"250px",
                  color:"#D70F64",
                  fontSize:"1.1rem",
                  "&:hover":{
                    backgroundColor:"#F5DAE6", 
                  } 
                }} />
              ))}
            </Box>
      </Box>

      {/* 類別總覽 Bar */}
      <Box
        sx={{
          position: "sticky",
          marginTop:"20px",
          top: "65px",
          zIndex: 1000,
          display: "flex",
          gap: 2,
          alignItems: "center",
          p: 2,
          backgroundColor: "#ffffff",
          padding:"10px 0 10px 5%",
          boxShadow:"0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="搜尋菜單..."
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ 
            width: 300 ,
            "& .MuiOutlinedInput-root": {
            height: "40px", // Match the button height
            borderRadius:"30px",
              },
            }}
        />
        {restaurant.categories.map((category, index) => (
          <Button
            key={index}
            variant={activeCategory === index ? "contained" : "outlined"}
            color={activeCategory === index ? "secondary" : "default"}
            onClick={() => scrollToCategory(index)}
            sx={{
              border:"none",
              backgroundColor: activeCategory === index ? "#ffffff" : "transparent",
              color: activeCategory === index ? "black" : "none",
              boxShadow: activeCategory === index ? "none" : "none",
              position: "relative", // Required for positioning the underline
                "&::after": {
                  content: '""', // Empty content to create the underline
                  position: "absolute",
                  left: 0,
                  bottom: -2, // Position slightly below the button
                  width: "100%",
                  height: "2px", // Thickness of the underline
                  backgroundColor: activeCategory === index ? "black" : "transparent", // Active color
                  transition: "background-color 0.3s ease", // Smooth transition for the underline
                },
              "&:hover":{
                backgroundColor: activeCategory === index ? "#transparent" : "#f5f5f5",
              }
            }}
          >
            {category.displayName} ({category.items.length})
          </Button>
        ))}
      </Box>

      {/* 菜單和購物車佈局 */}
      <Grid container spacing={2} sx={{padding:"30px 5% 0 5%"}}>
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
                    <Grid item xs={12}  md={6} key={index}>
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
        <Grid item xs={12} md={4}  >
          <Box
            sx={{
              position: "sticky",
              top: 165,
              border: "1px solid",
              borderColor:"#C4C4C4",
              borderRadius: "20px",
              padding:"8px 20px 8px 20px",
              width:"350px",
              height: "650px",
              overflowY: "visible",
              marginTop:"30px",
              marginLeft:"50px",

            }}
          >
        
            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "center",
                backgroundColor:"#f5f5f5",
                borderRadius:"10px",
                height:"55px",
                padding:"5px",
              }}
            >
              <Button
                variant="contained"
                onClick={() => setDeliveryType("外帶")}
                sx={{
                  width: "50%",
                  backgroundColor: deliveryType === "外帶" ? "#f5f5f5" : "#ffffff",
                  color: "black",
                  border: deliveryType === "外帶" ? "1px solid grey" : "1px solid transparent",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    boxShadow: "none",
                    border: "1px solid grey",
                  },
                }}
              >
                外帶
              </Button>

              <Button
                variant="contained"
                onClick={() => setDeliveryType("外送自取")}
                sx={{
                  width: "50%",
                  backgroundColor: deliveryType === "外送自取" ? "#f5f5f5" : "#ffffff",
                  color: "black",
                  border: deliveryType === "外送自取" ? "1px solid grey" : "1px solid transparent",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    boxShadow: "none",
                    border: "1px solid grey",
                  },
                }}
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
                <img 
                  src={panda_cart} 
                  alt="Panda Cart Icon" 
                  style={{ width: "100px", height: "100px", marginTop:"-100px"}} // Adjust size as needed
                /> {/* icon */}
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