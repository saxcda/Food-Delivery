import React from "react";
import { Box, Typography, Grid, Link } from "@mui/material";
import linksConfig from "./linksConfig"; // 引入配置檔案
import Divider from '@mui/material/Divider';

const Footer = () => {
  const hotRestaurants = [
    "八方雲集",
    "麥味登",
    "路易莎咖啡",
    "Burger King 漢堡王",
    "BELLINI Pasta Pasta",
    "拉亞漢堡",
    "Subway",
    "TGI FRIDAYS",
    "大呼過癮",
    "肯德基",
    "鹿港小鎮",
    "Pizza Hut必勝客",
    "Isaac Toast & Coffee",
  ];

  const hotCuisines = [
    { city: "台北市", cuisines: ["日式料理", "中式料理", "美式料理"] },
    { city: "新北市", cuisines: ["中式料理", "日式料理", "義式料理"] },
    { city: "台中市", cuisines: ["日式料理", "中式料理", "美式料理"] },
    { city: "高雄市", cuisines: ["亞洲食物", "義式料理", "麵包蛋糕"] },
  ];

  const countries = [
    { name: "Laos", url: "https://www.foodpanda.la/" },
    { name: "Cambodia", url: "https://www.foodpanda.com.kh/" },
    { name: "Myanmar", url: "https://www.foodpanda.com.mm/" },
    { name: "Thailand", url: "https://www.foodpanda.co.th/" },
    { name: "Hong Kong", url: "https://www.foodpanda.hk/" },
    { name: "Malaysia", url: "https://www.foodpanda.my/" },
    { name: "Philippines", url: "https://www.foodpanda.ph/" },
    { name: "Singapore", url: "https://www.foodpanda.sg/" },
    { name: "Pakistan", url: "https://www.foodpanda.pk/" },
    { name: "Bangladesh", url: "https://www.foodpanda.com.bd/" },
  ];

  const nearbyLocations = [
    "Taoyuan City",
    "Zhongli",
    "Taipei City",
    "Hsinchu County",
    "Hsinchu City",
    "Keelung City",
  ];

  const sections = [
    {
      title: "© foodpanda",
      links: ["隱私權條款", "下載foodpanda App", "合作夥伴", "聯盟行銷合作"],
    },
    {
      title: "服務",
      links: [
        "客服中心",
        "店家合作",
        "企業徵才",
        "每月優惠餐廳",
        "退款帳戶條款與條件",
      ],
    },
    { title: "更多", links: ["服務條款", "所有城市"] },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "30px 80px",
        borderTop: "1px solid #ccc",
        bgcolor: "#f8f8f8",
      }}
    >
      {/* 熱門餐廳 */}
      <Box sx={{ mb: 2, width: "100%" }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: "bold", marginBottom: "20px" }}
        >
          熱門餐廳
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{ textDecoration: "underline", padding: "20px" }}
        >
          {hotRestaurants.map((restaurant, index) => (
            <Grid item xs={12} sm={3} key={index}>
              <Link href="#" underline="hover" color="inherit">
                {restaurant}
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Divider sx={{ width: "100%", borderColor: "#ccc", marginBottom: "35px" }} />
      {/* 熱門料理 */}
      <Box sx={{ mb: 2 , width: "100%"}}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: "bold", marginBottom: "20px" }}
        >
          熱門料理
        </Typography>
        <Grid container spacing={2} sx={{ padding: "20px" }}>
          {hotCuisines.map((item, index) => (
            <Grid item xs={12} sm={3} key={index}>
              <Typography variant="subtitle1" sx={{ marginBottom: "20px" }}>
                {item.city}
              </Typography>
              {item.cuisines.map((cuisine, i) => (
                <Link
                  href="#"
                  underline="hover"
                  color="inherit"
                  key={i}
                  display="block"
                  sx={{ textDecoration: "underline", marginBottom: "20px" }}
                >
                  {cuisine}
                </Link>
              ))}
            </Grid>
          ))}
        </Grid>
      </Box>
      <Divider sx={{ width: "100%", borderColor: "#ccc", marginBottom: "35px" }} />
      {/* 國家連結 */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 5,
          textDecoration: "underline",
          fontWeight: "bold",
        }}
      >
        {countries.map((country, index) => (
          <Link
            href={country.url}
            underline="hover"
            color="inherit"
            key={index}
            target="_blank" // 打開新分頁
            rel="noopener noreferrer" // 安全性建議
            sx={{ marginBottom: "40px" }}
          >
            {country.name}
          </Link>
        ))}
      </Box>
      <Divider sx={{ width: "100%", borderColor: "#ccc", marginBottom: "35px" }} />
      {/* 鄰近地區 */}
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: "bold", marginBottom: "20px" }}
        >
          鄰近地區
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            textDecoration: "underline",
            padding: "20px",
          }}
        >
          {nearbyLocations.map((location, index) => (
            <Link href="#" underline="hover" color="inherit" key={index} sx={{ marginBottom: "20px" }}>
              {location}
            </Link>
          ))}
        </Box>
      </Box>
      <Divider sx={{ width: "100%", borderColor: "#ccc", marginBottom: "35px" }} />
      {/* 使用 linksConfig 動態生成連結 */}
      <Grid container spacing={2} justifyContent="space-bttween" gap="15px" sx={{marginTop: "20px", marginBottom: "20px" }}>
        <div class="footer-contact_foodpanda">© foodpanda</div>
        {linksConfig.map((group, groupIndex) => (
          <Grid item xs={3} sm={3.6} key={groupIndex}>
            {group.links.map((link, linkIndex) => (
              <Link
                href={link.href}
                key={linkIndex}
                underline="hover"
                color="#555"
                sx={{
                  display: "block",
                  fontSize: "0.875rem",
                  marginBottom: "0.5rem",
                }}
              >
                {link.text}
              </Link>
            ))}
          </Grid>
        ))}
      </Grid>
      {/* 連結 */}
      <Box
        sx={{
          mt: 4,
          pt: 2,
          borderTop: "1px solid #ccc",
          display: "flex",
          justifyContent: "center",
          gap: 3,
          alignItems: "center",
          flexWrap: "wrap",
          marginBottom: "20px"
        }}
      >
        <Link
          href="https://www.facebook.com/foodpandaTaiwan/"
          target="_blank"
          underline="hover"
          color="#4267B2" // Facebook 的官方藍色
          sx={{ fontSize: "1rem", fontWeight: "bold", marginTop: "40px"}}
        >
          Facebook
        </Link>
        <Link
          href="https://www.instagram.com/foodpanda_taiwan/"
          target="_blank"
          underline="hover"
          color="#C13584" // Instagram 的官方粉紫色
          sx={{ fontSize: "1rem", fontWeight: "bold",  }}
        >
          Instagram
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
