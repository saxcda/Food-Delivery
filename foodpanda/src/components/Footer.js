import React from "react";
import { Box, Typography, Grid, Link } from "@mui/material";

const Footer = () => {
  const countries = [
    "Laos",
    "Cambodia",
    "Myanmar",
    "Thailand",
    "Hong Kong",
    "Malaysia",
    "Philippines",
    "Singapore",
    "Pakistan",
    "Bangladesh",
  ];

  const sections = [
    {
      title: "資訊",
      links: ["新聞室", "隱私權條款", "下載foodpanda App", "合作夥伴", "聯盟行銷合作"],
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
    {
      title: "更多",
      links: [
        "服務條款",
        "pandago - 媒合外送夥伴",
        "foodpanda企業訂餐",
        "foodpanda生鮮雜貨外送到府",
        "所有城市",
      ],
    },
  ];

  return (
    <Box sx={{ mt: 4, p: 2, borderTop: "1px solid #ccc", bgcolor: "#f8f8f8" }}>
      {/* 顶部的国家链接 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          flexWrap: "wrap",
          mb: 2,
        }}
      >
        {countries.map((country, index) => (
          <Link
            href="#"
            key={index}
            underline="hover"
            color="inherit"
            sx={{ fontSize: "0.875rem", textDecoration: "none" }}
          >
            {country}
          </Link>
        ))}
      </Box>

      <Grid container spacing={2} justifyContent="center">
        {sections.map((section, idx) => (
          <Grid item xs={12} sm={4} key={idx}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              {section.title}
            </Typography>
            {section.links.map((link, i) => (
              <Link
                href="#"
                key={i}
                underline="hover"
                color="inherit"
                sx={{ display: "block", fontSize: "0.875rem", mb: 1 }}
              >
                {link}
              </Link>
            ))}
          </Grid>
        ))}
      </Grid>

      {/* 底部版权信息 */}
      <Box
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="body2" color="textSecondary">
          © foodpanda
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <img
            src="/path/to/foodpanda-logo.png"
            alt="foodpanda logo"
            style={{ height: 24 }}
          />
          <img
            src="/path/to/delivery-hero-logo.png"
            alt="delivery hero logo"
            style={{ height: 24 }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
