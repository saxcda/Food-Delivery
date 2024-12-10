import React , { useState } from "react";
import { Box, Typography, TextField, Button, IconButton, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { BsPerson } from "react-icons/bs";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios"; // Axios for API requests
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import "./Join_foodpanda.css";

const HistoryPage = () => {
  const [completedOrders, setCompletedOrders] = useState([]);
  const [OngoingOrders, setOngoingOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompletedOrders = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/order-history?user_id=1`);
        if (response.ok) {
          const data = await response.json();
          setCompletedOrders(data);
        } else {
          console.error("Failed to fetch completed orders:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching completed orders:", error);
      }
    };

    fetchCompletedOrders();
  }, []);

  useEffect(() => {
    const fetchOngoingOrders = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/order-history-ongoing?user_id=1`);
        if (response.ok) {
          const data = await response.json();
          setOngoingOrders(data);
        } else {
          console.error("Failed to fetch completed orders:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching completed orders:", error);
      }
    };

    fetchOngoingOrders();
  }, []);

  const handleOrderClick = (order_id) => {
    navigate(`/history-detail/${order_id}`); // Pass the order_id to the detail page
  };

  return (
    <div>
      <Header />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start", 
            padding: 3,
            maxWidth: 800,
            margin: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              marginBottom: 2,
              borderRadius: "15px",
            }}
          >
            <Typography variant="h6" >
            目前正在處理的訂單
            </Typography>
          </Box>

            {/*This is the map for ongoing order*/}

          {/* If no ongoing orders, show message */}
          {OngoingOrders.length === 0 ? (
          <Typography variant="body1" color="textSecondary" marginBottom={2}>
            您目前沒有正在處理的訂單
          </Typography>
          ) : ( 
          OngoingOrders.map((order) => (

          <Box
          key={order.order_id}
          onClick={() => handleOrderClick(order.order_id)}
          sx={{
            backgroundColor:"#ffffff",
            minHeight:"150px",
            width:"100%",
            padding:"20px",
            display:"flex",
            flexDirection: "row",  
            marginBottom:"30px",
            borderRadius:"15px"
          }}
          >
            <Box
              component="img"
              alt={"Image"}
              sx={{
                height:"100px",
                width:"100px",
                marginRight:"20px",
                objectFit:"cover",
                borderRadius:"10px"
              }}
            />

            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body1">{order.restaurant_name}</Typography>
              <Typography variant="body1">{order.order_time}</Typography>
              <Typography variant="body1">Order ID: {order.order_id}</Typography>
              {order.items.map((item) => (
                <Typography key={item.item_id} variant="body2">
                  {item.quantity} x {item.name} (${item.price.toFixed(2)})
                </Typography>
              ))}
              <Typography variant="body1"> ...</Typography>
            </Box>

            <Box>
              <Typography variant="body1">${order.total_price.toFixed(2)}</Typography>
            </Box>
        
          </Box>
          )))}
            {/* ongoing order ends here */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              marginBottom: 2,
              borderRadius: "15px",
            }}
          >
            <Typography variant="h6" >
              過往訂單
            </Typography>
          </Box>

          {/*This is the map for completed order*/}

          {/* If no completed orders, show message */}
        {completedOrders.length === 0 ? (
          <Typography variant="body1" color="textSecondary" marginBottom={2}>
            您目前沒有過往訂單
          </Typography>
        ) : (
          completedOrders.map((order) => (
          <Box
          key={order.order_id}
          onClick={() => handleOrderClick(order.order_id)}
          sx={{
            backgroundColor:"#ffffff",
            minHeight:"150px",
            width:"100%",
            padding:"20px",
            display:"flex",
            flexDirection: "row",  
            marginBottom:"30px",
            borderRadius:"15px",
          }}
          >
            <Box
              component="img"
              alt={"Image"}
              src={order.restaurant_image}
              sx={{
                height:"100px",
                width:"100px",
                marginRight:"20px",
                objectFit:"cover",
                borderRadius:"10px"
              }}
            />

            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body1">{order.restaurant_name}</Typography>
              <Typography variant="body1">{order.order_time}</Typography>
              <Typography variant="body1">Order ID: {order.order_id}</Typography>
              {order.items.map((item) => (
                <Typography key={item.item_id} variant="body2">
                  {item.quantity} x {item.name} (${item.price.toFixed(2)})
                </Typography>
              ))}
              <Typography variant="body1"> ...</Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end', // Align content at the end of the container
              }}
            >
              <Typography variant="body1">${order.total_price.toFixed(2)}</Typography>
            </Box>
        
          </Box>
          )))}
          {/* completed order ends here */}
          
          
        </Box>

      <Footer />
    </div>
  );
};
export default HistoryPage;
