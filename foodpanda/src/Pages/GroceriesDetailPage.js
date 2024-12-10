import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Chip,
  IconButton,
  Divider,
} from "@mui/material";
import { HiPlus } from "react-icons/hi2";
import { useParams, useNavigate } from "react-router-dom";
import "./GroceriesDetailPage.css"; // 加入 CSS 檔案的導入

const GroceriesDetailPage = () => {
  const { storeName } = useParams();
  const navigate = useNavigate();
  const [store, setStore] = useState(null);
  const [categories, setCategories] = useState([]); // 存储分类后的商品信息
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0); // 當前分類的索引
  const [searchQuery, setSearchQuery] = useState(""); // 搜尋內容
  const categoryRefs = useRef([]); // 儲存每個分類的 Ref 以供導航滾動使用

  // 獲取商店商品數據
  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/groceries_items?store_name=${storeName}`
        );
        const data = await response.json();

        // 將商品按分類進行分組
        const groupedCategories = data.reduce((acc, item) => {
          const category = item.category;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(item);
          return acc;
        }, {});

        // 格式化分類數據
        const formattedCategories = Object.entries(groupedCategories).map(
          ([name, items]) => ({ name, items })
        );

        setCategories(formattedCategories); // 設置分類數據
        setStore({ name: storeName, items: data }); // 儲存原始商品資訊
      } catch (error) {
        console.error("Failed to fetch store data:", error);
      }
    };

    fetchStoreData();
  }, [storeName]);

  // 添加商品到購物車
  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  // 從購物車移除商品
  const removeFromCart = (indexToRemove) => {
    setCart((prevCart) =>
      prevCart.filter((_, index) => index !== indexToRemove)
    );
  };

  // 計算購物車總價
  const totalPrice = cart
    .reduce((total, item) => total + item.price, 0)
    .toFixed(2);

  // 滾動到指定分類
  const scrollToCategory = (index) => {
    categoryRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  if (!store) {
    return (
      <Typography variant="body1" color="error">
        無法加載店家資訊，請稍後再試。
      </Typography>
    );
  }

  return (
    <Box>
      {/* 商店信息 */}
      <Box sx={{ display: "flex", padding: "20px 5%" }}>
        <Box>
          <Typography variant="h5" fontWeight="bold">
            {store.name}
          </Typography>
          <Button
            variant="contained"
            sx={{ marginTop: "10px" }}
            onClick={() => alert("已收藏該商家！")}
          >
            加入收藏
          </Button>
        </Box>
      </Box>

      {/* 類別導航 */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          display: "flex",
          gap: 2,
          alignItems: "center",
          padding: "10px 5%",
          backgroundColor: "#ffffff",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="搜尋商品..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          sx={{ flex: 1 }}
        />
        {categories.map((category, index) => (
          <Button
            key={index}
            variant={activeCategory === index ? "contained" : "outlined"}
            onClick={() => scrollToCategory(index)}
          >
            {category.name} ({category.items.length})
          </Button>
        ))}
      </Box>

      {/* 商品和購物車 */}
      <Grid container spacing={2} sx={{ padding: "20px 5%" }}>
        {/* 商品列表 */}
        <Grid item xs={12} md={8}>
          {categories.map((category, categoryIndex) => (
            <Box
              key={categoryIndex}
              ref={(el) => (categoryRefs.current[categoryIndex] = el)}
              sx={{ marginBottom: "20px" }}
            >
              <Typography variant="h6" fontWeight="bold">
                {category.name}
              </Typography>
              <Grid container spacing={2}>
                {category.items
                  .filter((item) =>
                    item.name.toLowerCase().includes(searchQuery)
                  )
                  .map((item, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box
                        sx={{
                          border: "1px solid #E0E0E0",
                          padding: "10px",
                          borderRadius: "10px",
                          position: "relative",
                        }}
                      >
                        <Box
                          component="img"
                          src={item.image}
                          alt={item.name}
                          sx={{
                            width: "100px",
                            height: "100px",
                            position: "absolute",
                            right: "10px",
                            borderRadius: "8px",
                          }}
                        />
                        <Typography variant="body1">{item.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          ${item.price}
                        </Typography>
                        <IconButton
                          onClick={() => addToCart(item)}
                          sx={{
                            position: "absolute",
                            bottom: "10px",
                            right: "10px",
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
              border: "1px solid #E0E0E0",
              borderRadius: "10px",
              padding: "10px",
              backgroundColor: "#ffffff",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              購物車
            </Typography>
            {cart.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "200px",
                }}
              >
                <Typography variant="body2" color="textSecondary">
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
                    <Typography variant="body2">{item.name}</Typography>
                    <Button size="small" onClick={() => removeFromCart(index)}>
                      移除
                    </Button>
                  </Box>
                ))}
                <Divider sx={{ marginY: "10px" }} />
                <Typography variant="h6">總計: ${totalPrice}</Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ marginTop: "10px", backgroundColor: "#D70F64" }}
                  onClick={() =>
                    navigate("/checkout", { state: { cart, storeName } })
                  }
                >
                  查看付款方式及地址
                </Button>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GroceriesDetailPage;
