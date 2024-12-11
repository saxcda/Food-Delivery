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
  LinearProgress,
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
  const [deliveryType, setDeliveryType] = useState("外送");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0); // 新增：追踪当前可见分类

  const scrollToCategory = (index) => {
    categoryRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const addToCart = (menuItem) => {
    setCart((prevCart) => {
      // Check if the item already exists in the cart
      const existingItem = prevCart.find((item) => item.name === menuItem.name);
      if (existingItem) {
        // Increment the quantity of the existing item
        return prevCart.map((item) =>
          item.name === menuItem.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Add a new item to the cart
      return [...prevCart, { ...menuItem, quantity: 1 }];
    });
  };

  const removeFromCart = (menuItem) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((item) =>
            item.name === menuItem.name
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0) // Remove items with quantity 0
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

        console.log(data);

        // 解析 promotions 字段
        const transformedData = data.map((restaurant) => {
          let promotionsArray = [];
          if (restaurant.promotions) {
            // 去掉不需要的符号，并用逗号分割
            const cleanedPromotions = restaurant.promotions
              .replace(/[\[\]\(\)"]/g, "") // 去掉 [ ] ( ) 和引号
              .split(","); // 按逗号分割

            promotionsArray = cleanedPromotions.map(
              (promotion) => promotion.trim() // 去除空格
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
      console.log(selectedRestaurant);
      if (selectedRestaurant) {
        setRestaurant(selectedRestaurant);
      } else {
        navigate("/"); // 重定向
      }
    }
  }, [restaurantName, navigate, restaurantData]); // 依赖 restaurantData 和 restaurantName

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = categoryRefs.current.findIndex(
            (ref) => ref === entry.target
          );
          setActiveCategory(index);
        }
      });
    });

    categoryRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  if (!restaurant || !Array.isArray(restaurant.categories)) {
    return (
      <Typography variant="body1" color="error">
        餐廳訊息不完整
      </Typography>
    );
  }

  const totalPrice = cart
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          height: "250px",
          padding: "0 5% 0 5%",
        }}
      >
        <Box
          component="img"
          alt={restaurant.name}
          src={restaurant.image}
          sx={{
            height: "200px",
            width: "220px",
            borderRadius: "20px",
            marginRight: "20px",
          }}
        />
        {/* 店家資訊 */}
        {/* 餐廳資訊 */}

        <Card
          sx={{
            mb: 4,
            flex: 1,
            boxShadow: "none",
            backgroundColor: "transparent",
          }}
        >
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
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "text.secondary",
                }}
              >
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
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
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
              <Dialog
                open={showMoreInfo}
                onClose={() => setShowMoreInfo(false)}
              >
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
          backgroundColor: "#DCDCDC", // Line color
          width: "100%", // Full width or customize as needed
        }}
      />

      {/* 可用優惠 */}
      <Box sx={{ mt: 2, padding: "20px 5% 0 5%" }}>
        <Typography variant="h5" gutterBottom fontWeight={"bold"}>
          可使用的優惠：
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {restaurant.promotions.map((promotion, index) => (
            <Chip
              key={index}
              label={promotion}
              sx={{
                backgroundColor: "#FBF2F7",
                fontWeight: "bold",
                height: "100px",
                width: "250px",
                color: "#D70F64",
                fontSize: "1.1rem",
                "&:hover": {
                  backgroundColor: "#F5DAE6",
                },
              }}
            />
          ))}
        </Box>
      </Box>

      {/* 類別總覽 Bar */}
      <Box
        sx={{
          position: "sticky",
          marginTop: "20px",
          top: "65px",
          zIndex: 1000,
          display: "flex",
          gap: 2,
          alignItems: "center",
          p: 2,
          backgroundColor: "#ffffff",
          padding: "10px 0 10px 5%",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="搜尋菜單..."
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{
            width: 300,
            "& .MuiOutlinedInput-root": {
              height: "40px", // Match the button height
              borderRadius: "30px",
            },
          }}
        />
        {restaurant.categories.map((category, index) => (
          <Button
            key={index}
            variant="text"
            onClick={() => scrollToCategory(index)}
            sx={{
              position: "relative",
              padding: "8px 16px",
              color: activeCategory === index ? "black" : "gray",
              "&::after": {
                content: '""',
                position: "absolute",
                left: 0,
                bottom: -4, // Adjust distance from the text
                width: "100%",
                height: "2px",
                backgroundColor:
                  activeCategory === index ? "black" : "transparent",
                transition: "background-color 0.3s ease",
              },
            }}
          >
            {category.display_name} ({category.items.length})
          </Button>
        ))}
      </Box>

      {/* 菜單和購物車佈局 */}
      <Grid container spacing={2} sx={{ padding: "30px 5% 0 5%" }}>
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
                {category.display_name}
              </Typography>
              <Grid container spacing={2}>
                {category.items
                  .filter((menuItem) =>
                    menuItem.name.toLowerCase().includes(searchQuery)
                  )
                  .map((menuItem, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <Box
                        sx={{
                          position: "relative",
                          width: "400px",
                          height: "130px",
                          border: "2px solid #DCDCDC",
                          padding: "10px",
                          borderRadius: "15px",
                          "&:hover": {
                            transform: "scale(1.03)", // Scale the Box to 105% of its size on hover
                            backgroundColor: "#F5DAE6",
                          },
                        }}
                      >
                        <Box
                          component="img"
                          alt={menuItem.name}
                          src={menuItem.image}
                          sx={{
                            height: 130,
                            width: 130,
                            position: "absolute",
                            objectFit: "cover",
                            right: "10px",
                            borderRadius: "10px",
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
                            position: "absolute",
                            bottom: "20px",
                            right: "20px",
                            backgroundColor: "#ffffff",
                            border: "1px solid",
                            "&:hover": {
                              backgroundColor: "#f5f5f5",
                              border: "1px solid",
                            },
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
              borderRadius: "15px",
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
                onClick={() => setDeliveryType("外送")}
                sx={{
                  width: "50%",
                  backgroundColor:
                    deliveryType === "外送" ? "#FFFFFF" : "transparent",
                  color: deliveryType === "外送" ? "#000000" : "#757575",
                  borderRadius: "8px 0 0 8px",
                  boxShadow: deliveryType === "外送" ? "none" : "none",
                  fontSize: "0.9rem",
                }}
              >
                外送
              </Button>
              <Button
                variant="contained"
                onClick={() => setDeliveryType("外帶自取")}
                sx={{
                  width: "50%",
                  backgroundColor:
                    deliveryType === "外帶自取" ? "#FFFFFF" : "transparent",
                  color: deliveryType === "外帶自取" ? "#000000" : "#757575",
                  borderRadius: "0 8px 8px 0",
                  boxShadow: deliveryType === "外帶自取" ? "none" : "none",
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
                  style={{
                    width: "80px",
                    height: "80px",
                    marginBottom: "16px",
                  }}
                />
                <div style={{ width: "200px" }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "#333",
                      marginBottom: "10px", // 與下一段文字的間距
                    }}
                  >
                    購物車目前空空的
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#666",
                      lineHeight: "1.6", // 行距
                    }}
                  >
                    快將美食、生鮮雜貨加入購物車讓 foodpanda 幫你『送』～
                  </Typography>
                </div>
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
                          removeFromCart(item);
                        }}
                      >
                        <svg
                          aria-hidden="false"
                          focusable="false"
                          class="bds-c-quantity-stepper__button--bin"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          data-testid="quantity-stepper-trash-icon"
                        >
                          <path d="M10.55 16.9C10.1358 16.9 9.8 16.5663 9.8 16.1547L9.8 9.84534C9.8 9.4337 10.1358 9.1 10.55 9.1C10.9642 9.1 11.3 9.4337 11.3 9.84534L11.3 16.1547C11.3 16.5663 10.9642 16.9 10.55 16.9Z"></path>
                          <path d="M13.45 16.9C13.0358 16.9 12.7 16.5663 12.7 16.1547L12.7 9.84534C12.7 9.4337 13.0358 9.1 13.45 9.1C13.8642 9.1 14.2 9.4337 14.2 9.84534L14.2 16.1547C14.2 16.5663 13.8642 16.9 13.45 16.9Z"></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M20 7.05C20 7.46421 19.6663 7.8 19.2547 7.8H18.7206C18.5225 7.8 18.3543 7.94499 18.325 8.1409L16.7584 18.6281C16.6406 19.4167 15.968 20 15.1762 20H8.82376C8.03205 20 7.35938 19.4167 7.24157 18.6281L5.675 8.1409C5.64573 7.94499 5.47748 7.8 5.27938 7.8H4.74534C4.3337 7.8 4 7.46421 4 7.05C4 6.63579 4.3337 6.3 4.74534 6.3H19.2547C19.6663 6.3 20 6.63579 20 7.05ZM16.354 7.8H7.64599C7.40874 7.80366 7.22618 8.01248 7.25533 8.2489L8.50069 18.3489C8.52541 18.5494 8.6957 18.7 8.89768 18.7H15.1023C15.3043 18.7 15.4745 18.5494 15.4993 18.3489L16.7446 8.2489C16.7738 8.01248 16.5912 7.80366 16.354 7.8Z"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M8 3.75C8 3.33579 8.31603 3 8.70588 3H15.2941C15.684 3 16 3.33579 16 3.75C16 4.16421 15.684 4.5 15.2941 4.5H8.70588C8.31603 4.5 8 4.16421 8 3.75Z"
                          ></path>
                        </svg>
                      </Button>
                      <Typography
                        variant="body2"
                        sx={{ width: "24px", textAlign: "center" }}
                      >
                        {item.quantity}
                      </Typography>
                      <Button
                        size="small"
                        variant="text"
                        sx={{ minWidth: "30px", fontSize: "1rem" }}
                        onClick={() => {
                          // 增加數量的邏輯
                          addToCart(item);
                        }}
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          class="fl-none"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          data-testid="quantity-stepper-plus-icon"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12 5C12.3797 5 12.6935 5.28215 12.7432 5.64823L12.75 5.75V10.85C12.75 11.0709 12.9291 11.25 13.15 11.25H18.25C18.6642 11.25 19 11.5858 19 12C19 12.3797 18.7178 12.6935 18.3518 12.7432L18.25 12.75H13.15C12.9291 12.75 12.75 12.9291 12.75 13.15V18.25C12.75 18.6642 12.4142 19 12 19C11.6203 19 11.3065 18.7178 11.2568 18.3518L11.25 18.25V13.15C11.25 12.9291 11.0709 12.75 10.85 12.75H5.75C5.33579 12.75 5 12.4142 5 12C5 11.6203 5.28215 11.3065 5.64823 11.2568L5.75 11.25H10.85C11.0709 11.25 11.25 11.0709 11.25 10.85V5.75C11.25 5.33579 11.5858 5 12 5Z"
                          ></path>
                        </svg>
                      </Button>
                    </Box>
                  </Box>
                ))}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "left",
                    flexDirection: "column",
                    mt: 2,
                  }}
                >
                  {/* 動態提示區域 */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: 1,
                    }}
                  >
                    {totalPrice < 149 ? (
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        width="24"
                        height="24"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ fill: "#D70F64" }}
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M14.2419 2.94497C13.0129 1.68501 10.9872 1.68501 9.75809 2.94497L9.67803 3.02705C9.0886 3.63129 8.28022 3.97202 7.4361 3.97202H7.10397C5.37424 3.97202 3.97202 5.37424 3.97202 7.10396V7.4361C3.97202 8.28021 3.63129 9.08859 3.02705 9.67802L2.94497 9.75808C1.68501 10.9872 1.68501 13.0129 2.94497 14.2419L3.02705 14.322C3.63129 14.9114 3.97202 15.7198 3.97202 16.5639V16.8961C3.97202 18.6258 5.37424 20.028 7.10397 20.028H7.4361C8.28022 20.028 9.08859 20.3687 9.67802 20.973L9.75809 21.055C10.9872 22.315 13.0129 22.315 14.2419 21.055L14.322 20.973C14.9114 20.3687 15.7198 20.028 16.5639 20.028H16.8961C18.6258 20.028 20.028 18.6258 20.028 16.8961V16.5639C20.028 15.7198 20.3687 14.9114 20.973 14.322L21.0551 14.2419C22.315 13.0129 22.315 10.9872 21.0551 9.75808L20.973 9.67802C20.3687 9.08859 20.028 8.28021 20.028 7.43609V7.10396C20.028 5.37424 18.6258 3.97202 16.8961 3.97202H16.5639C15.7198 3.97202 14.9114 3.63129 14.322 3.02705L14.2419 2.94497ZM15.5356 8.46491C15.2102 8.13947 14.6826 8.13947 14.3571 8.46491L8.46457 14.3575C8.13913 14.6829 8.13913 15.2105 8.46457 15.536C8.79001 15.8614 9.31764 15.8614 9.64308 15.536L15.5356 9.64342C15.8611 9.31799 15.8611 8.79035 15.5356 8.46491ZM10.5 9C10.5 9.82843 9.82844 10.5 9.00001 10.5C8.17158 10.5 7.50001 9.82843 7.50001 9C7.50001 8.17158 8.17158 7.5 9.00001 7.5C9.82844 7.5 10.5 8.17158 10.5 9ZM15 16.5C15.8284 16.5 16.5 15.8284 16.5 15C16.5 14.1716 15.8284 13.5 15 13.5C14.1716 13.5 13.5 14.1716 13.5 15C13.5 15.8284 14.1716 16.5 15 16.5Z"
                        ></path>{" "}
                      </svg>
                    ) : (
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        width="24"
                        height="24"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ fill: "green" }}
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3ZM16.781 8.48967C16.489 8.19678 16.0156 8.19678 15.7237 8.48967L10.6447 13.5836L8.27634 11.2084L8.19248 11.1358C7.89979 10.9179 7.48442 10.9422 7.21899 11.2084C6.927 11.5013 6.927 11.9762 7.21899 12.2691L10.3616 15.4215C10.3619 15.4218 10.3622 15.4221 10.3625 15.4224C10.5189 15.5783 10.7722 15.5779 10.9281 15.4215L16.781 9.55033L16.8534 9.46621C17.0706 9.1726 17.0465 8.75594 16.781 8.48967Z"
                        ></path>
                      </svg>
                    )}
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color: totalPrice < 149 ? "#D70F64" : "green",
                        textAlign: "left",
                      }}
                    >
                      {totalPrice < 149
                        ? `只差 $${(149 - totalPrice).toFixed(
                            2
                          )} 可享免外送服務費！`
                        : "您已獲得免費外送！"}
                    </Typography>
                  </Box>
                  {/* 進度條 */}
                  <Box sx={{ width: "100%", mt: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min((totalPrice / 149) * 100, 100)}
                      sx={{
                        height: "8px",
                        borderRadius: "5px",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor:
                            totalPrice < 149 ? "#D70F64" : "green",
                        },
                      }}
                    />
                  </Box>
                </Box>
                {/* 總計金額 */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "10px",
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
                    marginTop: "10px",
                    backgroundColor: "#D70F64",
                    borderRadius: "8px",
                    padding: "10px",
                    fontWeight: "bold",
                    "&:hover": { backgroundColor: "#C00E58" },
                  }}
                  onClick={() => {
                    const orderDetails = {
                      total_price: parseFloat(totalPrice), // 總金額
                      restaurant_name: restaurant.name, // 店家名稱
                      items: cart.map((item) => ({
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                      })), // 訂單的產品列表
                    };

                    // 打印或传递订单内容
                    console.log("Order Details:", orderDetails);

                    // 示例：将订单数据传递到支付页面
                    navigate("/payment", {
                      state: { ...orderDetails, deliveryType },
                    });
                  }}
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
