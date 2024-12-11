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
import inputAdornment from "@mui/material";
import { InputAdornment } from "@mui/material";
import { PiGpsFixBold } from "react-icons/pi";
//add img
import foodpanda_logo from "./Pictures/foodpanda_logo.jpg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import LoginDialog from "../auth/LoginDialog";
import { BsPerson } from "react-icons/bs";
import { TbReceipt } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";

const GOOGLE_MAPS_API_KEY = "AIzaSyAqqcudDyo4itlY1bqbDyByPh_L6GMy9cs";

const HeaderLocation = ({ setlogin, setlogout, loginState,  user, setUser}) => {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const [locationAnchorEl, setLocationAnchorEl] = React.useState(null);
  const [location, setLocation] = React.useState("");
  const [loadingLocation, setLoadingLocation] = React.useState(false);
  const [openLoginDialog, setOpenLoginDialog] = React.useState(false);
  const [accountMenuAnchor, setAccountMenuAnchor] = React.useState(null);
  const [languageMenuAnchor, setLanguageMenuAnchor] = React.useState(null);
  const [userName, setUserName] = React.useState('');

  React.useEffect(() => {
    console.log(user);
    setUserName(user.name)
  }, [user]);
  
  const navigate = useNavigate(); // Initialize navigate

  const handleMenuOpen = (event) => setMenuAnchorEl(event.currentTarget);
  const handleMenuClose = () => setMenuAnchorEl(null);

  const handleLocationOpen = (event) =>
    setLocationAnchorEl(event.currentTarget);
  const handleLocationClose = () => setLocationAnchorEl(null);

  const handleLoginDialogOpen = () => setOpenLoginDialog(true);
  const handleLoginDialogClose = () => setOpenLoginDialog(false);

  const handleAccountMenuOpen = (event) =>
    setAccountMenuAnchor(event.currentTarget);
  const handleAccountMenuClose = () => setAccountMenuAnchor(null);

  const handleLanguageMenuOpen = (event) =>
    setLanguageMenuAnchor(event.currentTarget);
  const handleLanguageMenuClose = () => setLanguageMenuAnchor(null);

  const [bsPersonMenuAnchorEl, setBsPersonMenuAnchorEl] = React.useState(null); // For BsPerson menu
  const handleBsPersonMenuOpen = (event) =>
    setBsPersonMenuAnchorEl(event.currentTarget); // Open BsPerson menu
  const handleBsPersonMenuClose = () => setBsPersonMenuAnchorEl(null); // Close BsPerson menu

  const navigateToProfile = () => {
    handleBsPersonMenuClose(); // Close the menu first
    navigate("/profile"); // Navigate to the Profile page
  };
  const navigateToHistoryPage = () => {
    handleBsPersonMenuClose(); // Close the menu first
    navigate("/historyPage"); // Navigate to the history
  };

  const handleLogout = () => {
    setlogout()
    navigate("/");
  };


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
      sx={{
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        borderBottom: "1px solid #e0e0e0",
        padding: "0 60px", // Padding on left and right
      }}
    >
      {loginState === false ? (
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
            sx={{ height: 30 }} // Optional styling
            onClick={() => navigate("/")}
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
              alignItems: "center", // Center vertically
              width: "75px", // Example container height
              position: "relative", // Optional for further positioning
              margin: "0 5px", //add space right left (outside)
            }}
          >
            <Button
              variant="contained"
              color="inherit"
              sx={{
                backgroundColor: "transparent",
                //color: "#ffffff", // White text
                boxShadow: "none",
                ml: 1,
                border: "1px solid #4a4a4a", // Optional: matching border,
                //margin: "0 15px", //add space right left (outside)
                borderRadius: "8px", // Rounded corners (increase for more roundness)
                height: "33px", // Set height (adjust as needed)
                transition: "all 0.4s ease", // Smooth transition for hover effects
                fontWeight: "bold",

                "&:hover": {
                  boxShadow: "none",
                  backgroundColor: "#F5F5F5", // Darker on hover
                  border: "1px solid #4a4a4a", // Optional: matching border,
                  borderRadius: "8px", // Rounded corners (increase for more roundness)
                  height: "38px", // Set height (adjust as needed)
                  width: "70px",
                },
              }}
              onClick={handleLoginDialogOpen}
            >
              登入
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center", // Center horizontally
              alignItems: "center", // Center vertically
              width: "75px", // Example container height
              position: "relative", // Optional for further positioning
              margin: "0 5px", //add space right left (outside)
            }}
          >
            <Button
              variant="contained"
              //sx override the css, able to custom the css here
              sx={{
                backgroundColor: "#D70F64", // Food panda color pink
                color: "#ffffff", // White text
                boxShadow: "none",
                ml: 1,
                //margin: "0 15px", //add space right left (outside)
                borderRadius: "8px", // Rounded corners (increase for more roundness)
                height: "33px", // Set height (adjust as needed)
                transition: "all 0.3s ease", // Smooth transition for hover effects
                fontWeight: "bold",
                "&:hover": {
                  boxShadow: "none",
                  backgroundColor: "#b10c52", // Darker pink on hover
                  borderRadius: "8px", // Rounded corners (increase for more roundness)
                  height: "38px", // Set height (adjust as needed)
                  width: "70px",
                },
              }}
              onClick={handleLoginDialogOpen}
            >
              註冊
            </Button>
          </Box>

          <IconButton color="inherit" onClick={handleBsPersonMenuOpen}>
            <BsPerson />
          </IconButton>

          <Menu
            anchorEl={bsPersonMenuAnchorEl}
            open={Boolean(bsPersonMenuAnchorEl)}
            onClose={handleBsPersonMenuClose}
          >
            <MenuItem onClick={navigateToProfile}>
              <BsPerson />
              個人檔案
            </MenuItem>
            <MenuItem onClick={navigateToHistoryPage}>
              <TbReceipt />
              歷史訂單
            </MenuItem>
            <MenuItem onClick={handleBsPersonMenuClose}>
              <IoIosLogOut />
              登出
            </MenuItem>
          </Menu>

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
          <IconButton color="inherit" sx={{}}>
            <ShoppingBagIcon />
          </IconButton>
          {/*<Avatar sx={{ ml: 1 }}>F</Avatar>*/}
        </Toolbar>
      ) : (
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between", // 左右分佈
            alignItems: "center", // 垂直居中對齊
            padding: "0 20px", // 添加內邊距
          }}
        >
          <Box
            component="img"
            src={foodpanda_logo}
            alt="Foodpanda Logo"
            sx={{ height: 30, cursor: "pointer" }}
            onClick={() => navigate("/")}
          />

          <Box sx={{ flexGrow: 1 }} />

          <div
            className="box-flex bds-c-navbar__right fd-row"
            style={{
              display: "flex",
              justifyContent: "flex-end", // 右對齊內容
              alignItems: "center", // 垂直居中
              gap: "16px", // 按鍵之間的間距
              justifyContent: "center",
            }}
          >
            {/* 個人資料按鍵 */}
            <div
              data-testid="account-menu"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button
                onClick={handleAccountMenuOpen}
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "transparent", // 背景透明
                  border: "none", // 移除邊框
                  cursor: "pointer",
                }}
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  class="fl-none"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  data-testid="personal-icon"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 11.5C13.933 11.5 15.5 9.933 15.5 8C15.5 6.067 13.933 4.5 12 4.5C10.067 4.5 8.50001 6.067 8.50001 8C8.50001 9.933 10.067 11.5 12 11.5ZM10.0566 14.2045C10.679 14.071 11.33 14.0001 12 14C12.0003 14 12.0007 14 12.001 14C12.6709 14 13.3218 14.0708 13.9442 14.2042C17.1008 14.881 19.5251 17.1688 19.9907 20.0041C20.0802 20.5491 19.6241 21 19.0718 21H4.93021C4.37792 21 3.92177 20.5491 4.01127 20.0041C4.47684 17.1692 6.90063 14.8815 10.0566 14.2045ZM10.1743 12.6562C8.31584 11.9269 7.00001 10.1171 7.00001 8C7.00001 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.1169 15.6845 11.9265 13.8263 12.656C13.2609 12.8779 12.6452 12.9999 12.001 13C12.0007 13 12.0003 13 12 13C11.3557 13 10.7399 12.8781 10.1743 12.6562ZM18.3216 19.5C17.5644 17.2951 15.1351 15.5 12.001 15.5C8.86687 15.5 6.43759 17.2951 5.6804 19.5H18.3216Z"
                  ></path>
                </svg>
                <span
                  style={{
                    display: "flex",
                    fontSize: "14px",
                    color: "#333",
                    justifyContent: "center",
                    fontWeight: "bold",
                  }}
                >
                  {userName}
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    class="fl-interaction-primary"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M18.5303 9.26347C18.7966 9.52971 18.8208 9.94638 18.603 10.24L18.5304 10.3241L12.3286 16.5269C12.1728 16.6827 11.9204 16.6832 11.764 16.528L5.47165 10.2823C5.17767 9.9905 5.1759 9.51563 5.4677 9.22165C5.73297 8.95439 6.14955 8.92864 6.44397 9.1454L6.52835 9.2177L11.7602 14.4093C11.9165 14.5645 12.169 14.564 12.3248 14.4083L17.4696 9.26356C17.7359 8.99727 18.1525 8.97303 18.4462 9.19086L18.5303 9.26347Z"
                    ></path>
                  </svg>
                </span>
              </button>
              <Menu
                anchorEl={accountMenuAnchor}
                open={Boolean(accountMenuAnchor)}
                onClose={handleAccountMenuClose}
              >
                <MenuItem onClick={navigateToProfile}>個人檔案</MenuItem>
                <MenuItem onClick={navigateToHistoryPage}>歷史訂單</MenuItem>
                <MenuItem
                  onClick={() => {
                    handleAccountMenuClose();
                    handleLogout();
                  }}
                >
                  登出
                </MenuItem>
              </Menu>
            </div>
            {/* 語言切換按鍵 */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                onClick={handleLanguageMenuOpen}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 12px", // 調整按鈕內邊距
                  backgroundColor: "transparent", // 背景透明
                  border: "none", // 移除邊框
                  cursor: "pointer",
                }}
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  class="fl-none"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM10.6635 19.3813C9.79267 18.1369 9.11658 16.9361 8.65036 15.75H5.50337C6.58707 17.6234 8.45784 18.9845 10.6635 19.3813ZM4.84335 14.25H8.17237C7.98964 13.4966 7.89523 12.7442 7.8931 11.9853C7.891 11.2379 7.97842 10.4952 8.15242 9.75H4.84335C4.62027 10.4603 4.5 11.2161 4.5 12C4.5 12.7839 4.62027 13.5397 4.84335 14.25ZM5.50337 8.25H8.61663C9.06884 7.07159 9.72906 5.8752 10.586 4.63309C8.41405 5.04747 6.57436 6.39858 5.50337 8.25ZM18.4966 15.75C17.4415 17.574 15.6402 18.9124 13.5102 19.3479C14.3698 18.1154 15.038 16.9255 15.5 15.75H18.4966ZM19.1566 14.25H15.978C16.1608 13.4966 16.2552 12.7442 16.2573 11.9853C16.2594 11.2379 16.172 10.4952 15.998 9.75H19.1566C19.3797 10.4603 19.5 11.2161 19.5 12C19.5 12.7839 19.3797 13.5397 19.1566 14.25ZM18.4966 8.25H15.5338C15.0859 7.08283 14.4339 5.89803 13.5888 4.66862C15.6845 5.12065 17.4545 6.44847 18.4966 8.25ZM12.0752 5.12312C12.8682 6.22942 13.4764 7.26325 13.9116 8.25H10.2388C10.674 7.26325 11.2822 6.22942 12.0752 5.12312ZM9.69994 9.75H14.4504C14.6591 10.5113 14.7593 11.2505 14.7573 11.981C14.7552 12.7258 14.6467 13.4775 14.4269 14.25H9.72354C9.50364 13.4775 9.39519 12.7258 9.3931 11.981C9.39105 11.2505 9.49129 10.5113 9.69994 9.75ZM10.2783 15.75H13.8721C13.4389 16.7093 12.8428 17.7109 12.0752 18.7788C11.3076 17.7109 10.7115 16.7093 10.2783 15.75Z"
                  ></path>
                </svg>
                <span>ZH</span>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  class="fl-interaction-primary"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18.5303 9.26347C18.7966 9.52971 18.8208 9.94638 18.603 10.24L18.5304 10.3241L12.3286 16.5269C12.1728 16.6827 11.9204 16.6832 11.764 16.528L5.47165 10.2823C5.17767 9.9905 5.1759 9.51563 5.4677 9.22165C5.73297 8.95439 6.14955 8.92864 6.44397 9.1454L6.52835 9.2177L11.7602 14.4093C11.9165 14.5645 12.169 14.564 12.3248 14.4083L17.4696 9.26356C17.7359 8.99727 18.1525 8.97303 18.4462 9.19086L18.5303 9.26347Z"
                  ></path>
                </svg>
              </button>
              <Menu
                anchorEl={languageMenuAnchor}
                open={Boolean(languageMenuAnchor)}
                onClose={handleLanguageMenuClose}
              >
                <MenuItem onClick={handleLanguageMenuClose}>繁體中文</MenuItem>
                <MenuItem onClick={handleLanguageMenuClose}>English</MenuItem>
              </Menu>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                aria-hidden="true"
                focusable="false"
                class="fl-none"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.0021 2C14.5418 2 16.4241 3.6512 16.5538 6.15854H19.8491C20.4014 6.15854 20.8491 6.60625 20.8491 7.15854C20.8491 7.20585 20.8457 7.25311 20.8391 7.29996L19.1248 19.1414C19.0544 19.6341 18.6325 20 18.1348 20H5.86942C5.37176 20 4.94984 19.6341 4.87947 19.1414L3.16518 7.29996C3.08707 6.75322 3.46697 6.24669 4.0137 6.16859C4.06055 6.16189 4.10781 6.15854 4.15513 6.15854L7.36129 6.16397C7.49108 3.65663 9.46248 2 12.0021 2ZM17.5607 16.25H6.44235C6.22143 16.25 6.04235 16.4291 6.04235 16.65C6.04235 16.669 6.04369 16.6879 6.04638 16.7067L6.25397 18.1567C6.28217 18.3537 6.45092 18.5 6.64993 18.5H17.3533C17.5523 18.5 17.7211 18.3537 17.7492 18.1566L17.9567 16.7066C17.988 16.488 17.836 16.2853 17.6174 16.254C17.5986 16.2513 17.5797 16.25 17.5607 16.25ZM18.8109 7.65854H5.19233C4.97142 7.65854 4.79233 7.83762 4.79233 8.05854C4.79233 8.32251 4.79367 8.09637 4.79635 8.11511L5.71793 14.4066C5.74609 14.6036 5.91486 14.75 6.11391 14.75H17.8891C18.0882 14.75 18.2569 14.6036 18.2851 14.4066L19.2069 8.11513C19.2381 7.89643 19.0862 7.69381 18.8675 7.66256C18.8487 7.65988 18.8298 7.65854 18.8109 7.65854ZM12.0021 3.40323C10.4163 3.40323 9.15495 4.32251 8.91234 5.80175C8.88507 5.96802 8.98943 6.12701 9.15495 6.15854C9.17377 6.16212 9.19289 6.16392 9.21204 6.1639L14.7134 6.15847C14.8772 6.15843 15.0099 6.02566 15.0099 5.86189C15.0099 5.84361 14.9631 5.82209 15.0049 5.80742C14.655 4.32251 13.5918 3.40323 12.0021 3.40323Z"
                ></path>
              </svg>
            </div>
          </div>
        </Toolbar>
      )}
      <LoginDialog
        open={openLoginDialog}
        onClose={handleLoginDialogClose}
        setlogin={setlogin}
        setlogout={setlogout}
      />
    </AppBar>
  );
};

export default HeaderLocation;
