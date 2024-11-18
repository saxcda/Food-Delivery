import React, { useState } from "react";
import { Container, Box, Button } from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CityGrid from "./components/CityGrid";

const cityPageData = {
  台北市: {
    image: "https://example.com/taipei.jpg",
    description: "這是台北市的專屬頁面，顯示餐廳和其他資訊。",
  },
  新北市: {
    image: "https://example.com/newtaipei.jpg",
    description: "這是新北市的專屬頁面，顯示餐廳和其他資訊。",
  },
  台中市: {
    image: "https://example.com/taichung.jpg",
    description: "這是台中市的專屬頁面，顯示餐廳和其他資訊。",
  },
  台南市: {
    image: "https://example.com/tainan.jpg",
    description: "這是台南市的專屬頁面，顯示餐廳和其他資訊。",
  },
  高雄市: {
    image: "https://example.com/kaohsiung.jpg",
    description: "這是高雄市的專屬頁面，顯示餐廳和其他資訊。",
  },
};

const App = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <Container maxWidth="lg">
      <Header />
      <Box sx={{ mt: 4 }}>
        {!selectedCity ? (
          // 顯示城市網格
          <CityGrid onCityClick={(city) => setSelectedCity(city)} />
        ) : (
          // 顯示特定城市的頁面
          <Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setSelectedCity(null)} // 返回主頁
              sx={{ mb: 2 }}
            >
              返回
            </Button>
            <img
              src={cityPageData[selectedCity].image}
              alt={selectedCity}
              style={{ width: "100%", height: "auto", marginBottom: "16px" }}
            />
            <p>{cityPageData[selectedCity].description}</p>
          </Box>
        )}
      </Box>
      <Footer />
    </Container>
  );
};

export default App;
