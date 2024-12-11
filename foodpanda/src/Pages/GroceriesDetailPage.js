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
  LinearProgress
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
                    <Divider sx={{ marginY: "10px" }} />
                    
                    

                    <Box>
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
