import React from "react";
import panda_burger from "./panda_burger.jpg";
import { ThemeProvider } from "@mui/material/styles";
import "./Location.css";

import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Location = ({ location, loadingLocation, handleFindMyLocation }) => {
  return (
    <div>
    <Box
      sx={(theme) => ({
        margin: "0px 0px 100px 0 ",
        display: "flex",
        flexDirection: "row",
        //alignItems: "center",
        //justifyContent: "center",
        padding: "0 0 0 10%",
        textAlign: "center",
        backgroundColor: "#f5f5f5", // Light grey background
        position:"relative",
        overflowX: "hidden", /* No overflow on the left and right */
        overflowY: "visible",
        [theme.breakpoints.down("sm")]: {
          //height:"140%",
        },
      })}
    >
      
      
      
      {/* Location Selector Content */}
      <Box sx={(theme) => ({ 
        p: 2, 
        width: "50%",
        top:"20%",
        //justifyContent: "flex-start",
        backgroundColor: "#ffffff",
        borderRadius: "10px",     
        boxShadow:"0px 4px 6px rgba(0, 0, 0, 0.1)",
        position:"absolute",
        [theme.breakpoints.down("sm")]: {
          zIndex:1,
        },
        })}>
        <Typography variant="subtitle1">選擇送達地址</Typography>
        <TextField
          fullWidth
          placeholder="輸入你欲送達的地址"
          variant="outlined"
          size="small"
          sx={{ my: 2 }}
          value={location}
          disabled
        />
        <Button
          variant="outlined"
          fullWidth
          startIcon={<LocationOnIcon />}
          sx={{ mb: 2 }}
          onClick={handleFindMyLocation}
          disabled={loadingLocation}
        >
          {loadingLocation ? "尋找中..." : "尋找我的位置"}
        </Button>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          已儲存的地址
        </Typography>
        <List>
          <ListItem button>
            <ListItemText primary="33301 桃園市" secondary="文化一路259號" />
          </ListItem>
        </List>
      </Box>
      
     
        
      {/* Image */}
      <Box
        className="Box_location"
        component="img"
        src={panda_burger} // Replace with your image URL
        alt="Panda Burger"
        sx={(theme) => ({
          marginLeft: "auto", // 
          width: "60%", // Adjust width as needed
          //height:"100%",
          objectFit: "cover", // Make the image cover the entire box while maintaining its aspect ratio
          objectPosition: "right", // Focus the image from the left side
          //clipPath: "inset(0 28% 0 0)", // Crop the right 40% of the image, leaving 60% of the left part
          //overflow:"hidden",
          //objectFit: "cover", // Ensure the image covers the area
          //objectPosition: "right", // Focus the image from the left side
          position: "relative", // Make it overflow based on position
          right: "-18%", // Shift the image to the left, allowing it to overflow
          [theme.breakpoints.down("sm")]: {
            width:"140%",
          },
        })}
      />
      </Box>

    
    </div>
  );
};

export default Location;



