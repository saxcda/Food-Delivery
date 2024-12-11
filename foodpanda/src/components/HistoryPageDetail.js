import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To fetch order_id from URL
import { Box, Typography } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import { BsCashCoin } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";


const HistoryPageDetail = ({ setlogin, setlogout, loginState,  user, setUser}) => {
  const { order_id } = useParams(); // Get order_id from URL
  const [orderDetails, setOrderDetails] = useState(null);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(`/historyPage`); 
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/order-detail?order_id=${order_id}`);
        if (response.ok) {
          const data = await response.json();
          setOrderDetails(data);
        } else {
          console.error("Failed to fetch order details:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [order_id]);

  return (
    <div>
      <Header setlogin={setlogin} setlogout={setlogout} loginState={loginState}  user={user} setUser={setUser}/>

      <Box
        sx={{
        display: 'flex',          // Use flexbox
        alignItems: "flex-start",
        maxWidth: 600,             // Ensure the box takes full width
        margin: "auto",
        marginTop:"30px",
        }}
      >
        <Typography variant="h6" onClick={() => handleBackClick()}
          sx={{
            textDecoration: 'underline',  // Underline the text
            fontWeight: 'bold',           // Make the text bold
            marginRight:"15px",
          }}
          >訂單紀錄</Typography>
        
        <Typography variant="h6"
          sx={{
            marginRight:"15px",
            position:"relative",
            bottom:"-3px",
          }}
        ><IoIosArrowForward /></Typography>

        <Typography variant="h6">訂單詳情</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: 3,
          maxWidth: 600,
          margin: "auto",
        }}
      >
        {orderDetails ? (
          <>
            
            <Box
              sx={{
                backgroundColor: "#ffffff",
                padding: "20px",
                borderRadius: "15px 15px 0 0",
                width:"100%",
                display:"flex",
              }}
            >

              <Box
              component="img"
              alt={"Image"}
              src={orderDetails.restaurant_image}
              sx={{
                height:"100px",
                width:"100px",
                marginRight:"20px",
                objectFit:"cover",
                borderRadius:"10px"
              }}
              />
              <Box>
                <Typography variant="h6">{orderDetails.restaurant_name}</Typography>
                <Typography variant="h6">{orderDetails.order_time}</Typography>
                <Typography variant="h6">Order ID: {orderDetails.order_id}</Typography>
                
              </Box>
                
            </Box>
            <Box
              sx={{
                backgroundColor: "#ffffff",
                padding: "20px",
                borderRadius: "0 0 15px 15px",
                width:"100%",
                display:"flex",
                flexDirection:"column",
                marginBottom:"30px",
              }}
            >
              <Typography variant="h6"><FiMapPin />訂購於: {orderDetails.merchant_location}</Typography>
              <Box
                sx={{
                  position:"relative",
                  top:"-5px",
                  left:"9px",
                  width: "2px",      // Narrow line
                  height: "30px",    // Make the line span the entire height
                  backgroundColor: "#000",
                }}
              />
              <Typography variant="h6"><FiMapPin />外送到: {orderDetails.delivery_address}</Typography>
            </Box>


            <Box
                sx={{
                  backgroundColor: "#ffffff",
                  padding: "20px",
                  borderRadius: "15px",
                  width:"100%",
                }}
              >
                <Typography variant="h5">訂單</Typography>
                {orderDetails.items.map((item) => (
                  <Box
                  sx={{
                    display: 'flex',          // Use flexbox
                    justifyContent: 'space-between',  // Distribute space between children
                    width: '100%',             // Ensure the box takes full width
                    alignItems: 'center',      // Vertically align the items (optional, depending on your design)
                  }}
                  >
                  <Typography variant="h6" marginRight={"50px"}>
                    {item.quantity} x
                  </Typography>
                
                  <Typography variant="h6" sx={{ textAlign: 'start', flexGrow: 1 }}>
                    {item.name}
                  </Typography>
                
                  <Typography variant="h6" sx={{ textAlign: 'right' }}>
                    ${item.price.toFixed(2)}
                  </Typography>
                </Box>
                ))}
                <hr/>
                <Box
                  sx={{
                    display: 'flex',          // Use flexbox
                    justifyContent: 'space-between',  // Distribute space between children
                    width: '100%',             // Ensure the box takes full width
                    alignItems: 'center',      // Vertically align the items (optional, depending on your design)
                  }}
                >
                    <Typography variant="h6" >總計（含稅）: </Typography>
                    <Typography variant="h6" sx={{ textAlign: 'right' }}>${orderDetails.total_price.toFixed(2)}</Typography>
                </Box>
                
                <hr/>
                <Typography variant="h6">付款方式</Typography>
                <Box
                  sx={{
                    display: 'flex',          // Use flexbox
                    justifyContent: 'space-between',  // Distribute space between children
                    width: '100%',             // Ensure the box takes full width
                    alignItems: 'center',      // Vertically align the items (optional, depending on your design)
                  }}
                >
                    <Typography variant="h6"><BsCashCoin />  現金付款 : </Typography>
                    <Typography variant="h6">${orderDetails.total_price.toFixed(2)}</Typography>
                </Box>
                
            </Box>
            
          </>
        ) : (
          <Typography variant="h6">Loading...</Typography>
        )}
      </Box>
      <Footer />
    </div>
  );
};

export default HistoryPageDetail;
