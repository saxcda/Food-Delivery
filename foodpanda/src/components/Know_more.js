import React from "react";
import know_more from "./Pictures/know_more.jpg"; // Ensure the image file is correctly imported
import { Box, Typography, Button } from "@mui/material";
//import "./Join_foodpanda.css";

const Know_more = () => {
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
            在外享用午餐
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
                backgroundImage: `url(${know_more})`, // Vendor image as background
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
                bottom: "6%", // 
                left: "10%", // Center horizontally
                width: "40%", // Width of the white box
                padding: "20px",
                backgroundColor: "#ffffff", // White background
                borderRadius: "10px", // Rounded corners
                //textAlign: "center", // Center content inside
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // More prominent shadow
                zIndex: 1, // Ensure the white box is above the background image
              }}              
            >
             <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                foodpanda【企業優惠方案】
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "20px" }}>
                你的專屬管家上線囉－從在家工作的三餐、會議餐點到下午茶、生日聚會，線上訂馬上到，交給我們就對囉！
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
                了解更多
              </Button>
            </Box>
      </Box>
    </div>
  );
};

export default Know_more;
