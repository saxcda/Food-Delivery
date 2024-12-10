import React , { useState } from "react";
import { Box, Typography, TextField, Button, IconButton, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { BsPerson } from "react-icons/bs";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios"; // Axios for API requests
import { useEffect } from "react";
//import "./Join_foodpanda.css";

const HistoryPage = () => {

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
          <Box
          sx={{
            backgroundColor:"#ffffff",
            minHeight:"150px",
            width:"100%",
            padding:"20px",
            display:"flex",
            flexDirection: "row",  
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
              }}
            />

            <Box sx={{ flexGrow: 1 }}>
              order restaurant name<br/>
              order time<br/>
              order id<br/>
              {/* map of list of product connected to order id , fetch 3 only */}
              quantity x order_products_name<br/>
              {/* ends here */}
            </Box>

            <Box>
              order_price
            </Box>
        
          </Box>
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
          <Box
          sx={{
            backgroundColor:"#ffffff",
            minHeight:"150px",
            width:"100%",
            padding:"20px",
            display:"flex",
            flexDirection: "row",  
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
              }}
            />

            <Box sx={{ flexGrow: 1 }}>
              order restaurant name<br/>
              order time<br/>
              order id<br/>
              {/* map of list of product connected to order id , fetch 3 only */}
              quantity x order_products_name<br/>
              {/* ends here */}
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end', // Align content at the end of the container
              }}
            >
              order_price
            </Box>
        
          </Box>
          {/* complete order ends here */}
          
          
        </Box>

      <Footer />
    </div>
  );
};
export default HistoryPage;
