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

const GOOGLE_MAPS_API_KEY = "AIzaSyAqqcudDyo4itlY1bqbDyByPh_L6GMy9cs";

const FoodDeliveryPage = ({ setlogin, setlogout, restaurantData}) => {
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
          $$$: (price) =>
            price >= minPrice + 2 * rangeSize && price <= maxPrice,
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
    <div>
      <HeaderLocation setlogin={setlogin} setlogout={setlogout} />
      <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="Food delivery tabs"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab
            label={
              <Box display="flex" alignItems="center">
                <DeliveryDiningIcon style={{ marginRight: 8 }} />
                外送
              </Box>
            }
          />
          <Tab
            label={
              <Box display="flex" alignItems="center">
                <TakeoutDiningIcon style={{ marginRight: 8 }} />
                外帶自取
              </Box>
            }
          />
          <Tab
            label={
              <Box display="flex" alignItems="center">
                <LocalGroceryStoreIcon style={{ marginRight: 8 }} />
                生鮮雜貨
              </Box>
            }
          />
        </Tabs>
        <div className="food-delivery-page">
        {(activeTab === 0 || activeTab === 1)&& (
          <Tab1
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
