import React from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Popover,
  TextField,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageIcon from "@mui/icons-material/Language";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LoginDialog from "../auth/LoginDialog"
import { useNavigate } from "react-router-dom";
import { BsPerson } from "react-icons/bs";
import { TbReceipt } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";

//add img
import foodpanda_logo from "./Pictures/foodpanda_logo.jpg";


const GOOGLE_MAPS_API_KEY = "";

const Header = ({ setlogin, setlogout }) => {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const [locationAnchorEl, setLocationAnchorEl] = React.useState(null);
  const [location, setLocation] = React.useState("");
  const [loadingLocation, setLoadingLocation] = React.useState(false);
  const [openLoginDialog, setOpenLoginDialog] = React.useState(false);

  const handleMenuOpen = (event) => setMenuAnchorEl(event.currentTarget);
  const handleMenuClose = () => setMenuAnchorEl(null);

  const handleLocationOpen = (event) => setLocationAnchorEl(event.currentTarget);
  const handleLocationClose = () => setLocationAnchorEl(null);

  const handleLoginDialogOpen = () => setOpenLoginDialog(true);
  const handleLoginDialogClose = () => setOpenLoginDialog(false);

  const [bsPersonMenuAnchorEl, setBsPersonMenuAnchorEl] = React.useState(null); // For BsPerson menu
  const handleBsPersonMenuOpen = (event) => setBsPersonMenuAnchorEl(event.currentTarget); // Open BsPerson menu
  const handleBsPersonMenuClose = () => setBsPersonMenuAnchorEl(null); // Close BsPerson menu
  const navigateToProfile = () => {
    handleBsPersonMenuClose(); // Close the menu first
    navigate("/profile"); // Navigate to the Profile page
  };
  const navigate = useNavigate();


  const handleFindMyLocation = async () => {
    setLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
            );
            const address =
              response.data.results[0]?.formatted_address || "找不到地址";
            setLocation(address);
          } catch (error) {
            console.error("Error fetching address:", error);
            setLocation("無法取得地址資訊，請稍後再試");
          }
          setLoadingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocation("無法獲取位置資訊，請檢查權限或網路");
          setLoadingLocation(false);
        }
      );
    } else {
      setLocation("瀏覽器不支援地理位置功能");
      setLoadingLocation(false);
    }
  };

  return (
    <AppBar
      position="sticky"
      color="inherit"
      //adding shadow to the bar
      sx={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", 
            borderBottom: "1px solid #e0e0e0",
            padding: "0 60px", // Padding on left and right
      }}
    >

      <Toolbar>
        {/*}
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        */}
        <Box
          component="img"
          src={foodpanda_logo}
          alt="Foodpanda Logo"
          sx={{ height: 30}} // Optional styling
        />

        <Box sx={{ flexGrow: 1 }} />
         
         {/*
        <IconButton color="inherit" onClick={handleLocationOpen}>
          <LocationOnIcon />
        </IconButton>
        
        <Popover
          open={Boolean(locationAnchorEl)}
          anchorEl={locationAnchorEl}
          onClose={handleLocationClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Box sx={{ p: 2, width: 300 }}>
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
        </Popover>
        */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center", // Center horizontally
              alignItems: "center",    // Center vertically
              width: "75px",         // Example container height
              position: "relative",    // Optional for further positioning
              margin: "0 5px", //add space right left (outside)
            }}
          >
        <Button variant="contained" color="inherit" 
          sx={{
            
            backgroundColor: "transparent",
            //color: "#ffffff", // White text
            boxShadow:"none",
            ml: 1,
            border: "1px solid #4a4a4a", // Optional: matching border,
            //margin: "0 15px", //add space right left (outside)
            borderRadius: "8px",        // Rounded corners (increase for more roundness)
            height: "33px",              // Set height (adjust as needed)
            transition: "all 0.4s ease", // Smooth transition for hover effects
            fontWeight: 'bold',
            
            "&:hover": {
              boxShadow:"none",
              backgroundColor: "#F5F5F5", // Darker on hover
              border: "1px solid #4a4a4a", // Optional: matching border,
              borderRadius: "8px",        // Rounded corners (increase for more roundness)
              height: "38px",              // Set height (adjust as needed)
              width:"70px",
            },
          }} onClick={handleLoginDialogOpen}>登入</Button>
          
        </Box>

        <Box
            sx={{
              display: "flex",
              justifyContent: "center", // Center horizontally
              alignItems: "center",    // Center vertically
              width: "75px",         // Example container height
              position: "relative",    // Optional for further positioning
              margin: "0 5px", //add space right left (outside)
            }}
        >
        <Button
          variant="contained"
          //sx override the css, able to custom the css here
          sx={{
            backgroundColor: "#D70F64", // Food panda color pink
            color: "#ffffff", // White text
            boxShadow:"none",
            ml: 1,
            //margin: "0 15px", //add space right left (outside)
            borderRadius: "8px",        // Rounded corners (increase for more roundness)
            height: "33px",              // Set height (adjust as needed)
            transition: "all 0.3s ease", // Smooth transition for hover effects
            fontWeight: 'bold',
            "&:hover": {
              boxShadow:"none",
              backgroundColor: "#b10c52", // Darker pink on hover
              borderRadius: "8px",        // Rounded corners (increase for more roundness)
              height: "38px",              // Set height (adjust as needed)
              width:"70px",
            },
          }}
          onClick={handleLoginDialogOpen}>
          註冊
        </Button>

        </Box>
        
        <IconButton color="inherit" onClick={handleBsPersonMenuOpen} >
          <BsPerson />
        </IconButton>
        <Menu
          anchorEl={bsPersonMenuAnchorEl}
          open={Boolean(bsPersonMenuAnchorEl)}
          onClose={handleBsPersonMenuClose}
        >
          <MenuItem onClick={navigateToProfile}><BsPerson />個人檔案</MenuItem>
          <MenuItem onClick={handleBsPersonMenuClose}><TbReceipt />歷史訂單</MenuItem>
          <MenuItem onClick={handleBsPersonMenuClose}><IoIosLogOut />登出</MenuItem>
        </Menu>

        <IconButton color="inherit" onClick={handleMenuOpen} >
          <LanguageIcon />
        </IconButton>
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>繁體中文</MenuItem>
          <MenuItem onClick={handleMenuClose}>English</MenuItem>
        </Menu>
        <IconButton color="inherit" 
        sx={{ 
         }}>
          <ShoppingBagIcon />
        </IconButton>
        {/*<Avatar sx={{ ml: 1 }}>F</Avatar>*/}
      </Toolbar>
      <LoginDialog open={openLoginDialog} onClose={handleLoginDialogClose} setlogin={setlogin} setlogout={setlogout}/>
    </AppBar>
  );
};

export default Header;
