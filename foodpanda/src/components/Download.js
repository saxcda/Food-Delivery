import React from "react";
import phone from "./Pictures/phone.jpg"; // Ensure the image file is correctly imported
import { Box, Typography, Button } from "@mui/material";
//import "./Join_foodpanda.css";

const Download = () => {
  return (
    <div>
      {/* Text Section */}
      <Box
        sx={{
          margin: "70px 0 30px 0",
          padding: "0 0 0 10%",
          backgroundColor: "#ffffff",
          position:"relative",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          下載foodpanda App!
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          //position: "relative", 
          justifyContent:"center",
          alignItems:"center",
          overflow:"visible",
          width:"100%",
          height:"60%",
        }}>
        <Box
          sx={{
            position: "relative",
            width:"86%",
            height:"350px",
            backgroundColor:"#D70F64",
            borderRadius:"20px",
            //overflow:"visible",
          }}
        > 

              <Box
                sx={{
                  position:"absolute",
                  left:"5%",
                  width:"auto",
                  justifyContent:"center",
                  alignItems:"center",
                  top:"35%",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" ,color: "#FFFFFF",}}>
                  你最喜愛的美食與生鮮雜貨都在foodpanda app
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: "20px", color: "#FFFFFF", }}>
                  手指輕點，從美食到生鮮雜貨，上萬種商品馬上點馬上到－立即下載
                </Typography>
              </Box>

        </Box>

        <Box
          component="img"
          src={phone} // Replace with your image URL
          sx={{
            position:"absolute",
            right:"5%",
            height:"550px",
            
          }}
        />
        

      </Box>
    </div>
  );
};

export default Download;
