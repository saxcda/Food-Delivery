import React from "react";
import { Container, Typography, Box, Grid, Link } from "@mui/material";
import Header from "./components/Header";
import Card from "./components/CityGrid";

const App = () => {
  const restaurants = [
    "八方雲集",
    "麥味登",
    "路易莎咖啡",
    "McDonald's 麥當勞",
    "春水堂",
    "拉亞漢堡",
    "大埔鐵板燒",
    "吉野家 Yoshinoya",
    "海底撈",
    "點點心",
    "鬍鬚張滷肉飯",
    "Subway",
    "摩斯漢堡 Mos Burger",
    "大呼過癮",
    "大戶屋",
    "迷客夏",
    "麗媽香香鍋",
    "不可熟成紅茶",
    "Isaac Toast & Coffee",
  ];

  const cuisines = [
    "台北市", "新北市", "高雄市", "台中市", "印度料理", "日式料理",
    "美式料理", "中式料理", "壽司外送", "麵包蛋糕", "飲料外送", "素食料理",
  ];

  return (
    
    <Container maxWidth="lg">
      <Header />
      <Card />
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          熱門餐廳
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {restaurants.map((name, index) => (
            <Link href="#" key={index} underline="hover" color="inherit" sx={{ fontSize: "1rem" }}>
              {name}
            </Link>
          ))}
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          熱門料理
        </Typography>
        <Grid container spacing={2}>
          {cuisines.map((cuisine, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Link href="#" underline="hover" color="inherit" sx={{ fontSize: "1rem", display: "block" }}>
                {cuisine}
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default App;
