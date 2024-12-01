import React from "react";
import vendor from "./Pictures/vendor.jpg"; // Ensure the image file is correctly imported
import { Box, Typography, Button } from "@mui/material";
import "./Join_foodpanda.css";

const Join_foodpanda = () => {
  return (
    <div
    >
      {/* Text Section */}
      <Box
        sx={{
          margin: "70px 0 -8% 0",
          padding: "0 0 0 10%",
          backgroundColor: "#ffffff",
          position:"relative",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          想加入foodpanda嗎?
        </Typography>
      </Box>

      <Box
        sx={{
          position: "relative", // For absolute positioning of the white box
          margin:"0 0 10% 0",
        }}
      >
            {/* Background Section with Vendor Image */}
            <Box
              sx={{
                position: "relative", // For absolute positioning of the white box
                padding: "50px 10%", // Space around the section
                backgroundImage: `url(${vendor})`, // Vendor image as background
                backgroundSize: "cover", // Cover the entire container
                backgroundPosition: "center", // Center the image
                backgroundRepeat: "no-repeat", // No repeat
                height: "600px", // Adjust as needed for the image height
                clipPath: "inset(20% 0 20% 0)", // Crop the bottom half dynamically
                overflow:"visible",
              }}
            />
          
            {/* White Box */}
            <Box
              className="whitebox"
              sx={{
                position: "absolute",
                bottom: "0%", // 
                left: "10%", // Center horizontally
                width: "30%", // Width of the white box
                padding: "20px",
                backgroundColor: "#ffffff", // White background
                borderRadius: "10px", // Rounded corners
                //textAlign: "center", // Center content inside
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // More prominent shadow
                zIndex: 1, // Ensure the white box is above the background image
              }}              
            >
             <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                與foodpanda合作，讓更多人享受你的餐點跟商品吧！
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "20px" }}>
                想讓上百萬新顧客試試你的美食或生鮮雜貨商品嗎？讓我們來幫忙吧！
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "20px" }}>
                該怎麼做呢？我們會協助你上傳菜單或商品清單、幫你處理訂單、訂單確認後我們將請外送夥伴前往你的商店去取件，再將餐點或商品外送給顧客們。
              </Typography>
              <Typography variant="body1">
                還等什麼？一起和我們開始這個外送的旅程吧！
              </Typography>


              {/* Join Button */}
              <Button
                variant="contained"
                sx={{
                  marginTop: "20px",
                  backgroundColor: "#D70F64", // Foodpanda pink
                  color: "#ffffff", // White text
                  "&:hover": {
                    backgroundColor: "#b10c52", // Darker pink on hover
                  },
                }}
              >
                立即加入
              </Button>
            </Box>
      </Box>
    </div>
  );
};

export default Join_foodpanda;
