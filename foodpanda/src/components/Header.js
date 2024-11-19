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
import LocationOnIcon from "@mui/icons-material/LocationOn";

const GOOGLE_MAPS_API_KEY = "";

const Header = () => {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const [locationAnchorEl, setLocationAnchorEl] = React.useState(null);
  const [location, setLocation] = React.useState("");
  const [loadingLocation, setLoadingLocation] = React.useState(false);

  const handleMenuOpen = (event) => setMenuAnchorEl(event.currentTarget);
  const handleMenuClose = () => setMenuAnchorEl(null);

  const handleLocationOpen = (event) => setLocationAnchorEl(event.currentTarget);
  const handleLocationClose = () => setLocationAnchorEl(null);

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
      position="static"
      color="inherit"
      sx={{ boxShadow: "none", borderBottom: "1px solid #e0e0e0" }}
    >
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          foodpanda
        </Typography>
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
        <Button color="inherit">登入</Button>
        <Button variant="contained" color="secondary" sx={{ ml: 1 }}>
          註冊
        </Button>
        <IconButton color="inherit" onClick={handleMenuOpen}>
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
        <IconButton color="inherit" sx={{ ml: 1 }}>
          <ShoppingCartIcon />
        </IconButton>
        <Avatar sx={{ ml: 1 }}>F</Avatar>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
