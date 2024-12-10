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
  IconButton,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./RestaurantDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { PiHeart } from "react-icons/pi";
import panda_cart from "./Pictures/panda_cart.jpg";
import { BsPlusCircle } from "react-icons/bs";
import { HiPlus } from "react-icons/hi2";



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
  const [restaurantData, setRestaurantData] = useState([]);


  // Fetch restaurant data based on the restaurantId
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/restaurants");
        const data = await response.json();

        console.log(data)
  
        // 解析 promotions 字段
        const transformedData = data.map((restaurant) => {
          let promotionsArray = [];
          if (restaurant.promotions) {
            // 去掉不需要的符号，并用逗号分割
            const cleanedPromotions = restaurant.promotions
              .replace(/[\[\]\(\)"]/g, "") // 去掉 [ ] ( ) 和引号
              .split(","); // 按逗号分割
  
            promotionsArray = cleanedPromotions.map((promotion) =>
              promotion.trim() // 去除空格
            );
          }
          return { ...restaurant, promotions: promotionsArray };
        });
  
        console.log(transformedData); // 检查转换后的数据
        setRestaurantData(transformedData);
      } catch (err) {
        console.error("Error fetching restaurant data:", err.message);
      }
    };
  
    fetchData();
  }, []);
  
  
  
  
  useEffect(() => {
    if (restaurantData.length > 0) {
      const selectedRestaurant = restaurantData.find(
        (r) => r.name === decodeURIComponent(restaurantName)
      );
      console.log(selectedRestaurant)
      if (selectedRestaurant) {
        setRestaurant(selectedRestaurant);
      } else {
        navigate("/"); // 重定向
      }
    }
  }, [restaurantName, navigate, restaurantData]); // 依赖 restaurantData 和 restaurantName
  

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
            src={restaurant.image}
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
                      <Box
                        sx={{
                          position:"relative",
                          width:"400px",
                          height:"130px",
                          border:"2px solid #DCDCDC",
                          padding:"10px",
                          borderRadius:"15px",
                          "&:hover": {
                            transform: "scale(1.03)", // Scale the Box to 105% of its size on hover
                            backgroundColor:"#F5DAE6",
                          },
                        }}
                      >
                        <Box
                          component="img"
                          alt={menuItem.name}
                          src={menuItem.image}
                          sx={{ height: 130, 
                                width: 130,
                                position:"absolute",
                                objectFit: "cover",
                                right:"10px",
                                borderRadius:"10px"
                          }}
                        />
                        
                          <Typography variant="h5" gutterBottom>
                            {menuItem.name}
                          </Typography>
                          <Typography
                            variant="h7"
                            color="textSecondary"
                            gutterBottom
                          >
                            ${menuItem.price}{" "}
                            {menuItem.originalPrice && (
                              <del>${menuItem.originalPrice}</del>
                            )}
                          </Typography>
                          <IconButton
                            onClick={() => addToCart(menuItem)}
                            sx={{
                              position:"absolute",
                              bottom:"20px",
                              right:"20px",
                              backgroundColor:"#ffffff",
                              border:"1px solid",
                                "&:hover":{
                                  backgroundColor:"#f5f5f5",
                                  border:"1px solid",
                                }
                            }}
                          >
                            <HiPlus />
                          </IconButton>
                        
                      </Box>
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
              top: 165,
              border: "1px solid #E0E0E0",
              borderRadius: "10px",
              padding: "16px",
              width: "350px",
              height: "auto",
              backgroundColor: "#FFFFFF",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* 標題和切換按鈕 */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#F5F5F5",
                borderRadius: "8px",
                padding: "8px",
                mb: 2,
              }}
            >
              <Button
                variant="contained"
                onClick={() => setDeliveryType("外帶")}
                sx={{
                  width: "50%",
                  backgroundColor: deliveryType === "外帶" ? "#FFFFFF" : "transparent",
                  color: deliveryType === "外帶" ? "#000000" : "#757575",
                  borderRadius: "8px 0 0 8px",
                  boxShadow: deliveryType === "外帶" ? "none" : "none",
                  fontSize: "0.9rem",
                }}
              >
                外送
              </Button>
              <Button
                variant="contained"
                onClick={() => setDeliveryType("外送自取")}
                sx={{
                  width: "50%",
                  backgroundColor:
                    deliveryType === "外送自取" ? "#FFFFFF" : "transparent",
                  color: deliveryType === "外送自取" ? "#000000" : "#757575",
                  borderRadius: "0 8px 8px 0",
                  boxShadow: deliveryType === "外送自取" ? "none" : "none",
                  fontSize: "0.9rem",
                }}
              >
                外帶自取
              </Button>
            </Box>

            {/* 購物車內容 */}
            {cart.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  height: "300px",
                }}
              >
                <img
                  src={panda_cart}
                  alt="Panda Cart Icon"
                  style={{ width: "80px", height: "80px", marginBottom: "16px" }}
                />
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
                      padding: "8px 0",
                      borderBottom: "1px solid #E0E0E0",
                    }}
                  >
                    <Box>
                      <Typography variant="body2">{item.name}</Typography>
                      <Typography
                        variant="caption"
                        color="textSecondary"
                        sx={{ fontSize: "0.85rem" }}
                      >
                        ${item.price}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Button
                        size="small"
                        variant="text"
                        sx={{ minWidth: "30px", fontSize: "1rem" }}
                        onClick={() => {
                          // 減少數量的邏輯
                        }}
                      >
                        -
                      </Button>
                      <Typography variant="body2" sx={{ width: "24px", textAlign: "center" }}>
                        1
                      </Typography>
                      <Button
                        size="small"
                        variant="text"
                        sx={{ minWidth: "30px", fontSize: "1rem" }}
                        onClick={() => {
                          // 增加數量的邏輯
                        }}
                      >
                        +
                      </Button>
                    </Box>
                  </Box>
                ))}
                {/* 總計金額 */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "16px",
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    總計
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    ${totalPrice}
                  </Typography>
                </Box>
                {/* 按鈕 */}
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    marginTop: "16px",
                    backgroundColor: "#D70F64",
                    "&:hover": { backgroundColor: "#C00E58" },
                  }}
                  onClick={() => navigate("/payment", { state: { cart, deliveryType } })} // 傳遞購物車內容
                >
                  查看付款方式及地址
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
