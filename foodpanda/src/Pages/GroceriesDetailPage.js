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
import Header from "../components/Header";

const GroceriesDetailPage = ({ setlogin, setlogout, loginState,  user, setUser}) => {
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
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.name === menuItem.name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0) // Remove items with quantity 0
    );
  };

  // 計算購物車總價
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);

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
    <div>
      <Header setlogin={setlogin} setlogout={setlogout} loginState={loginState}  user={user} setUser={setUser}/>
    <Box
      sx={{
        display:"flex",
        flexDirection:"row",
        backgroundColor:"#ffffff",
      }}
    >
      <Box
        sx={{
          width:"75%",
        }}
      >

        {/* search */}
        <Box
          sx={{
            top: 0,
            height:"270px",
            display: "flex",
            gap: 2,
            alignItems: "center",
            position:"relative",
            backgroundColor: "#ffffff",
            //boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            component="img"
            src={"https://images.deliveryhero.io/image/fd-tw/campaign-assets/dbb5b4c8-8fee-11ee-a50b-8a74b1813098/desktop_landing_ZhFlbK.png?height=450&quality=95&width=2000&?width=2000"}
            alt="hello"
            sx={{
              display:"flex",
              width:"100%",
              height:"270px",
              flexGrow:"1",
              position: "absolute",
              objectFit:"cover",
              }}
          />

         
          <TextField
            variant="outlined"
            placeholder="搜尋商品..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
            sx={{
              position: "absolute", 
              width:"400px",
              height:"50px",
              bottom:"0px",
              left:"10%",
              backgroundColor:"#ffffff"
            }}
          />
          
        </Box>

        {/* 商店信息 */}
        <Box sx={{ display: "flex", flexDirection: "row", padding: "20px 5%" }}>
          <Box sx={{ flexGrow: 1 }}> {/* This box will take up available space and push the button down */}
            <Typography variant="h5" fontWeight="bold">
              {store.name}
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            sx={{
              
              alignSelf: "flex-end", // This will align the button to the bottom right of the parent container
            }}
            onClick={() => alert("Happy Shopping！")}
          >
            商店資訊
          </Button>
        </Box>

            <hr/>
        
        
        {/* 商品和購物車 */}
        <Box
          sx={{display:"flex",
            
          }}
        >
          {/* 類別導航 */}
          <Box
            sx={{
              position: "sticky",
              display:"flex",
              flexDirection:"column",
              margin:"30px 0 0 55px",
              width:"15%"
            }}
          >
            <Typography variant="h5">所有類表</Typography>
          {categories.map((category, index) => (
            <Typography
              key={index}
              variant={activeCategory === index ? "contained" : "outlined"}
              onClick={() => scrollToCategory(index)}
              sx={{
                "&:hover":{
                  textDecoration: "underline"
                }
              }}
            >
              {category.name} ({category.items.length})
            </Typography>
          ))}
          </Box>
        <Grid container spacing={2} sx={{ padding: "20px 5%" }}>
          <Box
          component="img"
          src="https://images.deliveryhero.io/image/adtech-display/campaigns/fp_tw/f606209e-a7e1-11ef-9c83-0a9d38fbb5b2.png?height=224"
          sx={{margin:"0 50px 0 20px", width:"350px", height:"220px"}}
          >
            </Box>
          <Box
          component="img"
          sx={{ width:"350px", height:"220px"}}
          src="https://images.deliveryhero.io/image/adtech-display/campaigns/fp_tw/db76ccb0-b6c9-11ef-b28f-a216af6418eb.png?height=224"
          >
          
          </Box>
          {/* 商品列表 */}
          <Grid item xs={12} md={12}>
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
                      <Grid item xs={12} md={3} key={index} >
                          <Box
                            sx={{
                              backgroundColor:"#f5f5f5",
                              position:"relative",
                              width: "160px",
                              height: "160px",
                            }}
                            >
                            <Box
                            component="img"
                            src={item.image}
                            alt={item.name}
                            sx={{
                              width: "160px",
                              height: "160px",
                              position: "relative",
                              objectFit:"cover"
                              
                            }}
                            />
                            <IconButton
                            onClick={() => addToCart(item)}
                            sx={{
                              position: "absolute",
                              bottom: "10px",        // Position it 10px from the bottom of the parent Box
                              right: "10px",  
                              backgroundColor:"#ffffff",
                              border:"1px solid "
                            }}
                          >
                            <HiPlus />
                          </IconButton>
                          </Box>

                        <Box
                          sx={{
                            
                            width: "160px",
                            height:"50px",
                            
                            position: "relative",
                          }}
                        >
                          <Typography variant="body2" color="textSecondary">
                            ${item.price}
                          </Typography>
                          <Typography variant="body1" 
                          sx={{
                              whiteSpace: "nowrap",     // Prevent text from wrapping
                              overflow: "hidden",       // Hide any overflow text
                              textOverflow: "ellipsis", // Add "..." if text overflows
                            }}
                          >{item.name}</Typography>
                          
                        </Box>
                      </Grid>
                    ))}
                </Grid>
              </Box>
            ))}
          </Grid>

          
        </Grid>
        </Box>
      </Box>
          <Box
            sx={{
              flexGrow:"1",
              zIndex:"1000",
             
            }}
          >
              {/* 購物車 */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  //border: "1px solid #E0E0E0",
                  position:"fixed",
                  boxShadow:"0px 4px 6px rgba(0, 0, 0, 0.1)",
                  borderRadius: "10px",
                  padding: "10px",
                  backgroundColor: "#ffffff",
                  height:"100vh",
                  width:"25%",
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
                      height: "100%",
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
                        padding: "8px 10px 0 0",
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
                            removeFromCart(item)
                          }}
                        >
                          -
                        </Button>
                        <Typography variant="body2" sx={{ width: "24px", textAlign: "center" }}>
                        {item.quantity}
                        </Typography>
                        <Button
                          size="small"
                          variant="text"
                          sx={{ minWidth: "30px", fontSize: "1rem" }}
                          onClick={() => {
                            // 增加數量的邏輯
                            addToCart(item)
                          }}
                        >
                          +
                        </Button>
                      </Box>
                    </Box>
                    ))}
                    <Divider sx={{ marginY: "10px" }} />
                    <Box>
                    <Typography variant="h6">總計: ${totalPrice}</Typography>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ marginTop: "10px", backgroundColor: "#D70F64" }}
                      onClick={() =>
                        navigate("/payment", { state: { cart, storeName } })
                      }
                    >
                      查看付款方式及地址
                    </Button>
                    </Box>
                  </Box>
                )}
              </Box>
            </Grid>
          </Box>
    </Box>
    </div>
  );
};

export default GroceriesDetailPage;
