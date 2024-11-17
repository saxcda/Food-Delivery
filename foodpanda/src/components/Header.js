import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageIcon from "@mui/icons-material/Language";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar position="static" color="inherit" sx={{ boxShadow: "none", borderBottom: "1px solid #e0e0e0" }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          foodpanda
        </Typography>
        <Button color="inherit">登入</Button>
        <Button variant="contained" color="secondary" sx={{ ml: 1 }}>
          註冊
        </Button>
        <IconButton color="inherit" onClick={handleMenuOpen}>
          <LanguageIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
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
