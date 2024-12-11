import React from "react";
import { Box, Typography, Grid, Link } from "@mui/material";
import linksConfig from "./linksConfig"; // 引入配置檔案
import Divider from "@mui/material/Divider";
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
      <Divider
        sx={{ width: "100%", borderColor: "#ccc", marginBottom: "35px" }}
      />
      {/* 熱門料理 */}
      <Box sx={{ mb: 2, width: "100%" }}>
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
      <Divider
        sx={{ width: "100%", borderColor: "#ccc", marginBottom: "35px" }}
      />
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
      <Divider
        sx={{ width: "100%", borderColor: "#ccc", marginBottom: "35px" }}
      />
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
            <Link
              href="#"
              underline="hover"
              color="inherit"
              key={index}
              sx={{ marginBottom: "20px" }}
            >
              {location}
            </Link>
          ))}
        </Box>
      </Box>
      <Divider
        sx={{ width: "100%", borderColor: "#ccc", marginBottom: "35px" }}
      />
      {/* 使用 linksConfig 動態生成連結 */}
      <Grid
        container
        spacing={2}
        justifyContent="space-bttween"
        gap="15px"
        sx={{ marginTop: "20px", marginBottom: "20px" }}
      >
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
      <Divider
        sx={{ width: "100%", borderColor: "#ccc", marginBottom: "35px" }}
      />
      {/* 連結 */}
      {/* <Box
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
          sx={{ fontSize: "1rem", fontWeight: "bold",  marginTop: "40px" }}
        >
          Instagram
        </Link>
      </Box> */}
      <div className="link-bar">
        <span
          aria-label="foodpanda"
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
            width="28"
            height="28"
            data-testid="brand-icon-icon"
            aria-hidden="true"
            focusable="false"
            class="logo-icon"
          >
            <path
              d="M35 0H5C2.24 0 0 2.24 0 5v30c0 2.76 2.24 5 5 5h30c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5Z"
              fill="#ff2b85"
            ></path>
            <path
              d="M14.58 17.53c.41-.04.71-.4.68-.81a.756.756 0 0 0-.81-.68c-.39.03-.68.35-.68.74.02.43.38.76.81.75Zm10.44-1.33c.12-.09.25-.14.4-.16.43-.02.79.32.81.75 0 .41-.33.75-.75.75s-.75-.33-.75-.75c0-.23.11-.45.29-.59Z"
              fill="#fff"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M33.51 14.52v-.03c-.15-.3-.1-.65.12-.9a4.983 4.983 0 0 0 .89-4.78c-.06-.19-.34-.24-.61-.29-.26-.05-.52-.09-.62-.26-.09-.15-.06-.38 0-.63.02-.07.03-.13.04-.2.05-.26.07-.51-.06-.64s-.28-.26-.42-.37l-.09-.07c-1-.74-2.23-1.1-3.47-1.03-1.08.05-2.23.41-3.06 1.14-.4.29-.92.37-1.39.22l-.07-.02c-.84-.3-1.7-.52-2.58-.66a14.28 14.28 0 0 0-6.95.66h-.05c-.45.18-.96.1-1.35-.19-1.55-1.37-4.68-1.71-6.72.01-2.23 1.88-2.36 5.17-.71 7.1.22.25.26.6.12.9-.98 2-1.5 4.2-1.51 6.43 0 7.97 6.72 13.77 15 13.77 8.28 0 15-5.8 15-13.77 0-2.22-.52-4.41-1.49-6.41 0 0 0 .02-.01.02h-.01ZM19.9 20.19c1.19 0 2.15.26 2.15.72 0 .46-.96 1.5-2.15 1.5s-2.15-1.04-2.15-1.5c0-.46.96-.72 2.15-.72ZM7.86 11.8a.578.578 0 0 1-.18-.2c-.02-.03-.04-.07-.06-.1-.36-.66-.45-1.44-.23-2.16.42-1.41 1.92-2.24 3.35-2.05.37.05.74.17 1.07.35.14.08.26.17.37.28.04.04.08.09.1.15.02.09 0 .18-.07.25-.06.06-.14.11-.22.15-1.37.8-2.49 1.95-3.52 3.14-.17.19-.35.37-.61.19Zm3.66 11.33c-1.24-.14-2.32-1.45-2.73-2.77-.18-.58-.61-3.26 1.31-5.2.64-.64 1.54-1.21 2.79-1.59.41-.1.82-.15 1.24-.15.62 0 1.36.1 1.95.53 1.24.91 1.26 2.44.52 3.23s-2.4 2.59-2.83 4.06c-.42 1.47-1.01 2.04-2.26 1.9 0 0 .01-.01.01 0v-.01Zm8.4 4.43h-.04c-2.39-.01-4.32-1.7-4.32-3.4 0-.59.26-.89.89-.73.37.09 1.89.48 3.27.48h.35c1.35 0 2.82-.37 3.24-.48h.03c.64-.16.89.14.89.72 0 1.7-1.93 3.39-4.32 3.4h.01v.01Zm11.09-7.22c-.41 1.32-1.49 2.63-2.73 2.77-1.24.14-1.83-.42-2.26-1.9-.43-1.47-2.09-3.28-2.83-4.07-.74-.78-.72-2.32.52-3.23.58-.43 1.33-.53 1.95-.53.42 0 .83.05 1.24.15 1.25.38 2.15.94 2.79 1.58 1.92 1.94 1.49 4.62 1.31 5.2 0 0 .01.03 0 .03h.01Zm1.37-8.84-.06.1a.86.86 0 0 1-.18.2c-.26.18-.44 0-.61-.19-1.03-1.19-2.15-2.34-3.52-3.14a1.07 1.07 0 0 1-.22-.15.33.33 0 0 1-.08-.25c.02-.06.05-.11.1-.15.11-.11.23-.21.37-.28.33-.18.7-.3 1.07-.35 1.43-.19 2.93.64 3.35 2.05.21.72.13 1.5-.23 2.16h.01Z"
              fill="#fff"
            ></path>
          </svg>
          <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 126 27"
            height="22"
            data-testid="brand-icon-text"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M0 6.56h2.3V4.39C2.3 1.76 3.74 0 6.6 0l1.44.29v2.63l-1.57-.29c-.86 0-1.29.59-1.29 1.47v2.46h2.86v2.63H5.17v11.13H2.3V9.19H0V6.56Zm15.48-.29c3.73 0 7.03 2.92 7.03 7.17s-3.3 7.17-7.03 7.17c-3.73 0-7.03-2.92-7.03-7.17s3.3-7.17 7.03-7.17Zm0 11.7c2.73 0 4.16-2.04 4.16-4.54s-1.44-4.54-4.16-4.54-4.16 2.04-4.16 4.54c-.01 2.5 1.43 4.54 4.16 4.54ZM30.8 6.27c3.73 0 7.03 2.92 7.03 7.17s-3.3 7.17-7.03 7.17c-3.73 0-7.03-2.92-7.03-7.17s3.3-7.17 7.03-7.17Zm0 11.7c2.73 0 4.16-2.04 4.16-4.54s-1.44-4.54-4.16-4.54-4.16 2.04-4.16 4.54c-.01 2.5 1.43 4.54 4.16 4.54Zm22.06 2.34h-2.58L50 19.14l-.15-.15-.15.15c-.86.88-2.3 1.47-3.73 1.47-3.73 0-6.89-2.92-6.89-7.17s3.16-7.17 6.89-7.17c1.4 0 2.87.59 3.73 1.47l.15.15.15-.15V0h2.87v20.3l-.01.01ZM46.12 8.9c-2.73 0-4.19 2.04-4.19 4.54s1.46 4.54 4.19 4.54c2.44 0 4.16-2.04 4.16-4.54S48.56 8.9 46.12 8.9Zm9.62-2.35h2.58l.26 1.17.17.15.15-.15c.86-.88 2.3-1.47 3.73-1.47 3.73 0 6.89 2.92 6.89 7.17s-3.16 7.17-6.89 7.17c-1.4 0-2.87-.59-3.73-1.47l-.15-.15-.17.15v7.38h-2.84V6.55Zm6.74 11.41c2.73 0 4.16-2.04 4.16-4.54s-1.44-4.54-4.16-4.54c-2.44 0-4.16 2.04-4.16 4.54s1.72 4.54 4.16 4.54Zm14.26-6.2h2.35v-.6c0-1.65-1.11-2.42-2.64-2.42-1.24 0-2.08.6-2.53 1.84l-2.57-.55c.57-2.35 2.53-3.82 5.13-3.82 3.61 0 5.42 1.82 5.42 5.48v8.62h-2.37l-.27-1.82c-.95 1.35-2.35 2.04-4.22 2.04-2.4 0-4.18-1.45-4.18-4.21s2.35-4.55 5.89-4.55c0 0-.01-.01 0-.01h-.01Zm-1.22 6.22c.95 0 1.78-.3 2.49-.9.72-.64 1.08-1.49 1.08-2.62v-.3h-2.46c-1.73 0-2.8.83-2.8 2.14-.01.99.59 1.68 1.7 1.68h-.01Zm9.02-11.44h2.58l.28 1.17.15.15.15-.15c.58-.88 2-1.47 3.16-1.47 3.44 0 5.45 2.35 5.45 5.56v8.49h-2.87V11.8c-.09-1.87-.97-2.92-2.86-2.92-1.7 0-3.1 1.4-3.16 3.1v8.32h-2.87V6.56h-.01v-.02Zm27.39 13.76h-2.58l-.28-1.17-.15-.15-.15.15c-.86.88-2.3 1.47-3.73 1.47-3.73 0-6.89-2.92-6.89-7.17s3.16-7.17 6.89-7.17c1.4 0 2.87.59 3.73 1.47l.15.15.15-.15V0h2.86v20.31-.02.01Zm-6.74-11.41c-2.73 0-4.19 2.04-4.19 4.54s1.46 4.54 4.19 4.54c2.43 0 4.16-2.04 4.16-4.54s-1.72-4.54-4.16-4.54Zm14.9 2.87h2.35v-.6c0-1.65-1.11-2.42-2.64-2.42-1.24 0-2.08.6-2.53 1.84l-2.57-.55c.57-2.35 2.53-3.82 5.13-3.82 3.61 0 5.42 1.82 5.42 5.48v8.62h-2.37l-.27-1.82c-.95 1.35-2.35 2.04-4.22 2.04-2.4 0-4.18-1.45-4.18-4.21s2.35-4.55 5.89-4.55c0 0-.01-.01 0-.01h-.01Zm-1.22 6.22c.95 0 1.78-.3 2.48-.9.72-.64 1.08-1.49 1.08-2.62v-.3h-2.46c-1.74 0-2.8.83-2.8 2.14 0 .99.59 1.68 1.7 1.68Z"
              fill="#ff2b85"
            ></path>
          </svg>
        </span>
        <div class="vl"></div>
        <span aria-label="deliveryhero">
          <svg
            width="160"
            height="32"
            viewBox="0 0 300 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_1088_35094"
              maskUnits="userSpaceOnUse"
              x="0"
              y="10"
              width="62"
              height="45"
              style={{ maskType: "luminance" }}
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 10H61.7303V55H0V10Z"
                fill="white"
              ></path>
            </mask>
            <g mask="url(#mask0_1088_35094)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M52.503 31.1474C52.488 31.1544 52.48 31.1614 52.468 31.1664L46.336 33.6684L46.149 33.7534L44.655 40.5824C44.555 40.8154 44.257 40.8704 44.056 40.6754L39.589 35.3934L39.567 35.3784L14.379 46.1874C14.357 46.1994 14.332 46.2044 14.308 46.2044C14.214 46.2044 14.139 46.1294 14.139 46.0344C14.139 45.9804 14.165 45.9304 14.207 45.8994L35.984 29.5984L33.229 23.3084C33.091 23.0214 33.345 22.7164 33.682 22.8004H33.685L40.357 24.4454L45.538 19.8334V19.8344C45.763 19.6594 46.066 19.7844 46.122 20.0604L46.629 26.9904L52.604 30.4854C52.86 30.6494 52.823 31.0274 52.503 31.1474M49.458 11.3434C41.728 8.31042 33.226 10.5874 27.979 16.4184L7.50504 38.3504C7.23004 38.6454 7.35704 39.0154 7.69304 39.0654L13.147 39.4004C13.584 39.4274 13.638 39.8024 13.418 40.0604L0.0850411 54.4424C-0.145959 54.6924 0.133041 55.0834 0.451041 54.9844L19.487 48.9694C19.89 48.8314 20.2 49.1894 20.029 49.5034L17.483 54.0054C17.352 54.2624 17.599 54.6144 17.919 54.5904L45.363 48.4774C51.922 47.4394 57.776 43.0624 60.379 36.4354C64.298 26.4884 59.401 15.2554 49.458 11.3434"
                fill="#D61F26"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0 10H61.7303V55H0V10Z"
                  fill="white"
                ></path>
              </path>
            </g>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M123.031 44.7135H116.777L121.67 21.7975L128.49 19.2905L123.031 44.7135Z" fill="#D61F26"></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M109.598 31.5875C108.101 31.5875 107.24 32.8265 106.89 34.2645C109.851 34.2645 110.747 33.3395 110.747 32.5715C110.747 32.0325 110.265 31.5875 109.598 31.5875M106.19 38.2775C106.156 38.4355 106.124 38.7255 106.124 38.8825C106.124 39.9035 106.823 40.2525 108.675 40.2525C110.33 40.2525 112.687 39.8385 114.059 39.3615V44.0465C112.307 44.6835 109.563 45.0325 107.365 45.0325C102.202 45.0325 99.7168 43.6295 99.7168 38.9475C99.7168 34.3525 101.851 27.1855 110.077 27.1855C115.3 27.1855 116.861 29.5475 116.861 32.0325C116.861 35.2505 114.091 37.9905 106.19 38.2775"
              fill="#D61F26"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M134.389 26.365C132.257 26.365 130.885 24.995 130.885 23.114C130.885 20.66 132.607 19.29 134.739 19.29C136.907 19.29 138.247 20.66 138.247 22.509C138.247 24.995 136.557 26.365 134.389 26.365"
              fill="#D61F26"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M130.001 27.7627H136.438L133.183 44.4607H126.682L128.975 32.7347"
              fill="#D61F26"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M154.983 27.7627C152.751 33.3717 150.296 38.8517 147.174 44.4607H139.206C138.187 39.1687 137.74 33.5927 137.869 27.7627H144.372C144.241 30.5027 144.275 33.3087 144.431 35.9177C144.465 36.6197 144.531 37.2877 144.592 37.9617H144.629C144.913 37.2877 145.229 36.6197 145.517 35.9177C146.631 33.1737 147.651 30.1867 148.421 27.7627H154.983Z"
              fill="#D61F26"
            ></path>
          </svg>
        </span>
      </div>
    </Box>
  );
};

export default Footer;
