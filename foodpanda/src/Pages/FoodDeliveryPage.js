import React, { useState, useMemo, useEffect } from "react";
import "./FoodDeliveryPage.css";
import RestaurantCard from "../components/RestaurantCard";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Grid, Typography, Tabs, Tab, Box } from "@mui/material";
import HeaderLocation from "../components/HeaderLocation";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining"; // 外送圖示
import TakeoutDiningIcon from "@mui/icons-material/TakeoutDining"; // 外帶自取圖示
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore"; // 生鮮雜貨圖示
import Tab1 from "../components/Tab1";
import Tab2 from "../components/Tab2";
import Tab3 from "../components/Tab3";

const GOOGLE_MAPS_API_KEY = "AIzaSyAqqcudDyo4itlY1bqbDyByPh_L6GMy9cs";

const FoodDeliveryPage = ({
  restaurantData,
  setlogin,
  setlogout,
  loginState,
  user,
  setUser,
}) => {
  const navigate = useNavigate();
  const [city, setCity] = useState("未知城市");
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [filters, setFilters] = useState({});
  const [sortKey, setSortKey] = useState("default");
  const [searchValue, setSearchValue] = useState(""); // 儲存搜尋框的輸入值
  const [filteredSearch, setFilteredSearch] = useState(""); // 用來篩選的狀態
  const [showAllCuisines, setShowAllCuisines] = useState(false);

  const [activeTab, setActiveTab] = useState(0); // 用於追蹤當前選中的 tab

  const handleRestaurantClick = (restaurantName) => {
    navigate(`/restaurants/${city}/${encodeURIComponent(restaurantName)}`);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    const fetchCity = async (latitude, longitude) => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
        );
        const address =
          response.data.results[0]?.formatted_address || "找不到地址";

        // 使用正則表達式提取完整的縣市名稱
        const cityMatch = address.match(/台灣(.+?[市縣])/);
        const cityName = cityMatch ? cityMatch[1] : "未知地區";

        setCity(cityName); // 設定縣市名稱
        console.log(address, cityName);
      } catch (error) {
        console.error("Error fetching address:", error);
        setCity("無法取得地址資訊，請稍後再試");
      }
    };

    const fetchLocation = () => {
      setLoadingLocation(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            await fetchCity(latitude, longitude);
            setLoadingLocation(false);
          },
          (error) => {
            console.error("無法取得地理位置", error);
            setCity("無法取得地理位置資訊，請檢查權限或網路");
            setLoadingLocation(false);
          }
        );
      } else {
        console.error("瀏覽器不支援地理位置功能");
        setCity("瀏覽器不支援地理位置功能");
        setLoadingLocation(false);
      }
    };

    fetchLocation();
    console.log(city);
  }, []);

  useEffect(() => {
    console.log(city);
  }, [city]);

  const visibleCuisines = showAllCuisines
    ? [
        "三明治 / 吐司",
        "中式",
        "丼飯/蓋飯",
        "便當",
        "健康餐",
        "台式",
        "咖哩",
        "咖啡",
        "壽司",
        "小吃",
        "披薩",
        "拉麵",
        "日式",
        "早餐",
        "東南亞",
        "歐美",
        "泰式",
        "港式",
        "湯品",
        "滷味",
        "漢堡",
        "火鍋",
        "炒飯",
        "炸雞",
        "燒烤",
        "牛排",
        "甜甜圈",
        "甜點",
        "異國",
        "粥",
        "素食",
        "義大利麵",
        "蛋糕",
        "豆花",
        "越式",
        "鐵板燒",
        "飲料",
        "餃子",
        "鹹酥雞/雞排",
        "麵食",
      ]
    : [
        "三明治 / 吐司",
        "中式",
        "丼飯/蓋飯",
        "便當",
        "健康餐",
        "台式",
        "咖哩",
        "咖啡",
        "壽司",
      ]; // 只顯示前 9 個菜式

  useEffect(() => {
    setFilteredSearch(searchValue.trim().toLowerCase());
  }, [searchValue]);

  // 處理篩選條件改變
  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => {
      return {
        ...prevFilters,
        [key]: value, // 單選篩選條件直接更新
      };
    });
  };

  // 處理排序條件改變
  const handleSortChange = (key) => {
    setSortKey(key);
  };

  const handlePriceFilter = (price) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      price: prevFilters.price === price ? null : price,
    }));
  };

  // 篩選和排序邏輯
  const filteredAndSortedRestaurants = useMemo(() => {
    console.log(city);

    if (!Array.isArray(restaurantData)) return []; // 确保是数组

    let filtered = [...restaurantData];

    if (city) {
      filtered = filtered.filter((res) => res.city === city);
    }

    // 快速篩選 - 評分為4+
    if (filters.rating4Plus) {
      filtered = filtered.filter((res) => res.rating >= 4);
    }

    // 快速篩選 - 模範餐廳
    if (filters.superVendor) {
      filtered = filtered.filter((res) => res.isSuperVendor === true);
    }

    // 篩選 - 有無優惠
    if (filters.promotions === "withPromotions") {
      filtered = filtered.filter(
        (res) => res.promotions && res.promotions.length > 0
      );
    } else if (filters.promotions === "noPromotions") {
      filtered = filtered.filter(
        (res) => !res.promotions || res.promotions.length === 0
      );
    }

    // 搜尋菜式
    if (filteredSearch) {
      filtered = filtered.filter((res) =>
        res.name.toLowerCase().includes(filteredSearch)
      );
    }

    // 篩選 - 菜式
    if (filters.type && filters.type !== "all") {
      filtered = filtered.filter((res) => res.type === filters.type);
    }

    // 篩選 - 價格
    if (filters.price) {
      // 計算所有商品價格的最小值和最大值
      const allPrices = restaurantData
        .flatMap((res) =>
          res.categories.flatMap((cat) => cat.items.map((item) => item.price))
        )
        .filter((price) => typeof price === "number");

      const minPrice = Math.min(...allPrices);
      const maxPrice = Math.max(...allPrices);
      const rangeSize = (maxPrice - minPrice) / 3;

      // 分成三個價格區間
      const priceMapping = {
        $: (price) => price >= minPrice && price < minPrice + rangeSize,
        $$: (price) =>
          price >= minPrice + rangeSize && price < minPrice + 2 * rangeSize,
        $$$: (price) => price >= minPrice + 2 * rangeSize && price <= maxPrice,
      };

      // 篩選符合價格區間的餐廳
      filtered = filtered.filter((res) =>
        res.categories
          .flatMap((cat) => cat.items)
          .some((item) => priceMapping[filters.price](item.price))
      );
    }

    // 排序
    if (sortKey === "priceAsc") {
      filtered.sort(
        (a, b) =>
          a.categories[0].items[0].price - b.categories[0].items[0].price
      );
    } else if (sortKey === "priceDesc") {
      filtered.sort(
        (a, b) =>
          b.categories[0].items[0].price - a.categories[0].items[0].price
      );
    } else if (sortKey === "ratingDesc") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    console.log(filtered);
    return filtered;
  }, [filters, sortKey, city, filteredSearch, restaurantData]);

  return (
    <div style={{ width: "100%" }}>
      <HeaderLocation
        setlogin={setlogin}
        setlogout={setlogout}
        loginState={loginState}
        user={user}
        setUser={setUser}
      />
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        aria-label="Food delivery tabs"
        indicatorColor="primary"
        textColor="primary"
        sx={{
          width: "100%",
          marginLeft: "100px",
          "& .MuiTabs-indicator": {
            height: "3px", // 改為細條狀指示器
            backgroundColor: "#333", // 指示器顏色
            borderRadius: "4px", // 圓角效果
            transition: "all 0.3s ease-in-out", // 切換時的過渡效果
          },
        }}
      >
        <Tab
          label={
            <Box
              display="flex"
              alignItems="center"
              sx={{ gap: "10px", fontSize: "12px", color: "#000" }}
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
                  d="M14.4729 5C14.0587 5 13.7229 5.33566 13.7229 5.74971C13.7229 6.16376 14.0587 6.49941 14.4729 6.49941H17.1729C17.2833 6.49941 17.3729 6.58896 17.3729 6.69941V9.38586C17.3729 9.42859 17.3592 9.4702 17.3338 9.50458L14.154 13.8153C14.1163 13.8664 14.0566 13.8965 13.9931 13.8965H10.3729C10.2624 13.8965 10.1729 13.807 10.1729 13.6965V9.69816C10.1729 9.28411 9.83708 8.94846 9.42287 8.94846H6.02287C5.01565 8.94846 4.19446 9.18295 3.55495 9.62085C2.91419 10.0596 2.51456 10.6624 2.28321 11.297C1.833 12.5318 1.99469 13.9438 2.25118 14.8503C2.34251 15.1731 2.63726 15.3959 2.97287 15.3959H3.57306C3.52524 15.6066 3.5 15.8259 3.5 16.0511C3.5 17.6797 4.82076 18.9999 6.45 18.9999C8.07924 18.9999 9.4 17.6797 9.4 16.0511C9.4 15.8259 9.37476 15.6066 9.32694 15.3959H14.3718C14.6736 15.3959 14.9574 15.2527 15.1365 15.0099L18.6875 10.196C18.8079 10.0328 18.8729 9.83526 18.8729 9.63243V5.94963C18.8729 5.42516 18.4475 5 17.9229 5H14.4729ZM7.74379 15.3959H5.15621C5.05631 15.5927 5 15.8153 5 16.0511C5 16.8516 5.64919 17.5005 6.45 17.5005C7.25081 17.5005 7.9 16.8516 7.9 16.0511C7.9 15.8153 7.84369 15.5927 7.74379 15.3959ZM8.67287 13.8565C8.67287 13.8786 8.65496 13.8965 8.63287 13.8965H3.57325C3.46237 13.2317 3.45914 12.4506 3.69253 11.8104C3.83701 11.4141 4.06488 11.0892 4.40266 10.8579C4.74169 10.6257 5.25009 10.4479 6.02287 10.4479H8.63287C8.65496 10.4479 8.67287 10.4658 8.67287 10.4879V13.8565Z"
                ></path>
                <path d="M4.52344 5.99961C4.10922 5.99961 3.77344 6.3354 3.77344 6.74961C3.77344 7.16382 4.10922 7.49961 4.52344 7.49961H9.42344C9.83765 7.49961 10.1734 7.16382 10.1734 6.74961C10.1734 6.3354 9.83765 5.99961 9.42344 5.99961H4.52344Z"></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16.0957 16.0512C16.0957 14.4225 17.4165 13.1023 19.0457 13.1023C20.6749 13.1023 21.9957 14.4225 21.9957 16.0512C21.9957 17.6798 20.6749 19 19.0457 19C17.4165 19 16.0957 17.6798 16.0957 16.0512ZM19.0457 14.6017C18.2449 14.6017 17.5957 15.2507 17.5957 16.0512C17.5957 16.8517 18.2449 17.5006 19.0457 17.5006C19.8465 17.5006 20.4957 16.8517 20.4957 16.0512C20.4957 15.2507 19.8465 14.6017 19.0457 14.6017Z"
                ></path>
              </svg>
              外送
            </Box>
          }
        />
        <Tab
          label={
            <Box
              display="flex"
              alignItems="center"
              sx={{ gap: "10px", fontSize: "12px", color: "#000" }}
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
                  d="M10.978 7.6715C11.3804 7.76979 11.6269 8.17567 11.5286 8.57805L10.4015 13.1922C10.1984 14.0233 10.5609 14.8897 11.2953 15.3287L12.4349 16.0098C13.5296 16.6641 14.4352 17.592 15.0627 18.7022L16.1529 20.631C16.3567 20.9916 16.2296 21.4492 15.869 21.653C15.5084 21.8568 15.0509 21.7297 14.8471 21.3691L13.7569 19.4403C13.2574 18.5566 12.5366 17.8181 11.6654 17.2974L10.5258 16.6162C9.22642 15.8396 8.5851 14.3067 8.94431 12.8362L10.0714 8.2221C10.1697 7.81972 10.5756 7.57321 10.978 7.6715Z"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.3325 8.36177C14.7402 8.43496 15.0114 8.8248 14.9382 9.23249L14.2 9.09997C14.9382 9.23249 14.9382 9.23239 14.9382 9.23249L14.9375 9.23651L14.9357 9.24613L14.9292 9.2815C14.9235 9.31205 14.9151 9.35628 14.9042 9.41253C14.8824 9.52499 14.8502 9.68571 14.8085 9.8813C14.7253 10.2717 14.6033 10.8048 14.4485 11.3723C14.2945 11.9371 14.1041 12.5502 13.882 13.0954C13.6695 13.6168 13.3926 14.1679 13.0302 14.5302C12.7373 14.8231 12.2625 14.8231 11.9696 14.5302C11.6767 14.2373 11.6767 13.7624 11.9696 13.4695C12.1072 13.3319 12.2928 13.0205 12.4929 12.5294C12.6833 12.0621 12.8554 11.5127 13.0014 10.9776C13.1466 10.445 13.2622 9.9407 13.3415 9.56861C13.381 9.38297 13.4114 9.2312 13.4317 9.12647C13.4419 9.07413 13.4496 9.0336 13.4546 9.00653L13.4602 8.97626L13.4615 8.96909L13.4618 8.96757C13.535 8.55993 13.9249 8.28859 14.3325 8.36177Z"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.2 5.8999C13.7523 5.8999 14.2 5.45219 14.2 4.8999C14.2 4.34762 13.7523 3.8999 13.2 3.8999C12.6477 3.8999 12.2 4.34762 12.2 4.8999C12.2 5.45219 12.6477 5.8999 13.2 5.8999ZM13.2 7.3999C14.5807 7.3999 15.7 6.28061 15.7 4.8999C15.7 3.51919 14.5807 2.3999 13.2 2.3999C11.8193 2.3999 10.7 3.51919 10.7 4.8999C10.7 6.28061 11.8193 7.3999 13.2 7.3999Z"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.7518 9.03582C8.43465 8.66945 7.3 10.1419 7.3 11.3C7.3 11.7142 6.96421 12.05 6.55 12.05C6.13579 12.05 5.8 11.7142 5.8 11.3C5.8 9.12931 7.85651 7.04201 11.0211 7.55986L11.0491 7.56444L14.3767 8.37112C14.7793 8.46871 15.0265 8.87416 14.9289 9.27671C14.8313 9.67926 14.4259 9.92649 14.0233 9.8289L10.7518 9.03582Z"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.9319 9.72425C14.9407 9.52054 14.95 9.30432 14.95 9.0999C14.95 8.68569 14.6142 8.3499 14.2 8.3499C13.7858 8.3499 13.45 8.68569 13.45 9.0999C13.45 9.26992 13.4422 9.45254 13.4332 9.66234C13.4322 9.68501 13.4312 9.708 13.4302 9.73132C13.4204 9.96302 13.4104 10.2211 13.4138 10.4846C13.4206 11.006 13.4791 11.6116 13.7361 12.1827C14.0036 12.7772 14.4656 13.2886 15.1906 13.638C15.8945 13.9773 16.8156 14.1499 18 14.1499C18.4142 14.1499 18.75 13.8141 18.75 13.3999C18.75 12.9857 18.4142 12.6499 18 12.6499C16.9444 12.6499 16.2705 12.4934 15.8419 12.2868C15.4344 12.0904 15.2264 11.8393 15.1039 11.5671C14.9709 11.2715 14.9194 10.9063 14.9137 10.4652C14.9109 10.2474 14.919 10.0264 14.9289 9.79504C14.9298 9.77164 14.9309 9.74803 14.9319 9.72425Z"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.95777 16.366C9.3355 16.536 9.50392 16.98 9.33394 17.3578L9.15059 17.7652C8.64057 18.8986 7.93609 19.934 7.06905 20.8244L6.43735 21.4732C6.14839 21.77 5.67356 21.7763 5.37679 21.4873C5.08002 21.1984 5.07368 20.7235 5.36265 20.4268L5.99434 19.778C6.73926 19.013 7.34452 18.1234 7.78271 17.1497L7.96606 16.7422C8.13604 16.3645 8.58004 16.1961 8.95777 16.366Z"
                ></path>
              </svg>
              外帶自取
            </Box>
          }
        />
        <Tab
          label={
            <Box
              display="flex"
              alignItems="center"
              sx={{ gap: "10px", fontSize: "12px", color: "#000" }}
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
                  d="M21.2585 11.1816L21.2573 19.6567C21.2573 20.3522 20.7369 20.9243 20.07 20.9931L19.9347 21H4.0644C3.37964 21 2.81642 20.4714 2.7487 19.7941L2.74187 19.6567L2.74152 11.1824C2.28063 10.667 1.99976 9.98246 1.99976 9.23132L2.00695 9.02552L2.02848 8.82077L2.68496 4.15331C2.77183 3.53567 3.2637 3.0663 3.86401 3.00646L3.9942 3H20.0049C20.6192 3 21.1463 3.42819 21.2895 4.02333L21.3142 4.15331L21.9707 8.82077C22.0958 9.71058 21.8095 10.5637 21.2585 11.1816ZM10.677 19.5H13.3221V15.8955C13.3221 15.2464 12.8688 14.7048 12.2661 14.5795L12.1348 14.5592L11.9996 14.5522C11.3148 14.5522 10.7516 15.0808 10.6839 15.7582L10.677 15.8955V19.5ZM19.7583 11.9525L19.7573 19.5H14.8221V15.8955C14.8221 14.5372 13.8714 13.3811 12.5713 13.1109L12.5338 13.1031L12.2885 13.0651L12.038 13.0522H11.9996C10.5176 13.0522 9.33304 14.1915 9.19132 15.6089L9.18758 15.6463L9.17705 15.8583V19.5H4.24186L4.24155 11.953C4.34993 11.9777 4.46088 11.9961 4.57404 12.0078L4.6125 12.0118L4.81947 12.0224H5.12242C5.9724 12.0224 6.72457 11.6476 7.23825 11.0605C7.69253 11.5794 8.33373 11.9321 9.06539 12.0075L9.10385 12.0115L9.31607 12.0224H9.88353C10.7335 12.0224 11.4857 11.6476 11.9994 11.0605C12.4536 11.5794 13.0948 11.9321 13.8265 12.0075L13.865 12.0115L14.0772 12.0224H14.6446C15.4946 12.0224 16.2468 11.6476 16.7605 11.0605C17.2147 11.5794 17.8559 11.9321 18.5876 12.0075L18.6261 12.0115L18.8383 12.0224H19.1412C19.2735 12.0224 19.4055 12.0129 19.5364 11.9939C19.6116 11.983 19.6856 11.9691 19.7583 11.9525ZM8.03155 5.04175C8.03155 4.80435 8.22102 4.6119 8.45476 4.61194H10.7824C11.0161 4.61198 11.2056 4.80441 11.2057 5.04179L11.2061 9.1791L11.1992 9.31645C11.1315 9.99381 10.5683 10.5224 9.88353 10.5224H9.35452L9.21929 10.5155C8.5524 10.4467 8.03199 9.87461 8.03199 9.1791L8.03155 5.04175ZM17.5538 5.04175C17.5538 4.80435 17.7432 4.6119 17.977 4.61194H19.4086C19.6192 4.61194 19.7977 4.76924 19.8275 4.98101L20.3996 9.04873L20.4115 9.18035C20.4377 9.83419 19.9725 10.4149 19.321 10.5094C19.2615 10.5181 19.2014 10.5224 19.1412 10.5224H18.8767L18.7415 10.5155C18.0746 10.4467 17.5542 9.87461 17.5542 9.1791L17.5538 5.04175ZM3.58679 9.23132L3.59398 9.09418L4.15793 5.07347C4.19507 4.80867 4.41831 4.61194 4.68165 4.61194H5.9155C6.20765 4.61199 6.44448 4.85252 6.44456 5.14925L6.44495 9.1791L6.43812 9.31645C6.3704 9.99381 5.80718 10.5224 5.12242 10.5224H4.85792L4.72795 10.5157C4.08698 10.4496 3.58679 9.89979 3.58679 9.23132ZM12.7931 9.1791L12.7927 5.04175C12.7927 4.80435 12.9821 4.6119 13.2159 4.61194H15.5435C15.7772 4.61198 15.9667 4.80441 15.9668 5.04179L15.9672 9.1791L15.9603 9.31645C15.8926 9.99381 15.3294 10.5224 14.6446 10.5224H14.1156L13.9804 10.5155C13.3135 10.4467 12.7931 9.87461 12.7931 9.1791Z"
                ></path>
              </svg>
              生鮮雜貨
            </Box>
          }
        />
      </Tabs>
      <div className="food-delivery-page">
        {activeTab === 0 && (
          <Tab1
            handleRestaurantClick={handleRestaurantClick}
            handleSortChange={handleSortChange}
            handleFilterChange={handleFilterChange}
            handlePriceFilter={handlePriceFilter}
            restaurantData={filteredAndSortedRestaurants}
          />
        )}
        {activeTab === 1 && (
          <Tab2
            handleRestaurantClick={handleRestaurantClick}
            handleSortChange={handleSortChange}
            handleFilterChange={handleFilterChange}
            handlePriceFilter={handlePriceFilter}
            restaurantData={filteredAndSortedRestaurants}
          />
        )}
        {activeTab === 2 && (
          <Tab3
            handleRestaurantClick={handleRestaurantClick}
            handleSortChange={handleSortChange}
            handleFilterChange={handleFilterChange}
            handlePriceFilter={handlePriceFilter}
            restaurantData={filteredAndSortedRestaurants}
          />
        )}
        {/* Add other tab content here */}
      </div>
    </div>
  );
};
export default FoodDeliveryPage;
