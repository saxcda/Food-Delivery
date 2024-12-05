import React, { useState, useMemo, useEffect } from "react";
import "./FoodDeliveryPage.css";
import restaurantData from "../data/restaurantData";
import RestaurantCard from "../components/RestaurantCard";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Grid, Typography } from "@mui/material";

const GOOGLE_MAPS_API_KEY = "";


const FoodDeliveryPage = () => {

  const navigate = useNavigate();
  const [city, setCity] = useState("未知城市");
  const [loadingLocation, setLoadingLocation] = useState(false);


  useEffect(() => {
    const fetchCity = async (latitude, longitude) => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
        );
        const address = response.data.results[0]?.formatted_address || "找不到地址";
    
        // 使用正則表達式提取完整的縣市名稱
        const cityMatch = address.match(/台灣(.+?[市縣])/);
        const cityName = cityMatch ? cityMatch[1] : "未知地區";
    
        setCity(cityName); // 設定縣市名稱
        console.log(address, cityName)
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
    console.log(city)
  }, []);

  useEffect(() => {
    console.log(city)
  }, [city]);
  

  const [filters, setFilters] = useState({});
  const [sortKey, setSortKey] = useState("default");

  const handleRestaurantClick = (restaurantName) => {
    navigate(`/restaurants/${city}/${encodeURIComponent(restaurantName)}`);
  };

  // 處理篩選條件改變
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // 處理排序條件改變
  const handleSortChange = (key) => {
    setSortKey(key);
  };

  // 篩選和排序邏輯
  const filteredAndSortedRestaurants = useMemo(() => {
    console.log(city)

    if (!Array.isArray(restaurantData)) return []; // 确保是数组

    let filtered = [...restaurantData];

    if (city) {
      filtered = filtered.filter((res) => res.city === city);
    }

    // 篩選 - 有無優惠
    if (filters.promotions === "withPromotions") {
      filtered = filtered.filter((res) => res.promotions && res.promotions.length > 0);
    } else if (filters.promotions === "noPromotions") {
      filtered = filtered.filter((res) => !res.promotions || res.promotions.length === 0);
    }

    // 篩選 - 菜式
    if (filters.type && filters.type !== "all") {
      filtered = filtered.filter((res) => res.type === filters.type);
    }

    // 篩選 - 價格
    if (filters.minPrice || filters.maxPrice) {
      filtered = filtered.filter((res) => {
        const items = res.categories.flatMap((cat) => cat.items);
        return items.some((item) => {
          const price = item.price;
          return (
            (!filters.minPrice || price >= filters.minPrice) &&
            (!filters.maxPrice || price <= filters.maxPrice)
          );
        });
      });
    }

    // 排序
    if (sortKey === "priceAsc") {
      filtered.sort((a, b) => a.categories[0].items[0].price - b.categories[0].items[0].price);
    } else if (sortKey === "priceDesc") {
      filtered.sort((a, b) => b.categories[0].items[0].price - a.categories[0].items[0].price);
    } else if (sortKey === "ratingDesc") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    console.log(filtered)
    return filtered;
  }, [filters, sortKey, city]);

  return (
    <div className="food-delivery-page">
      {/* 篩選和排序的側邊欄 */}
      <div className="sidebar">
  <h3>篩選選項</h3>

  {/* 排序依 */}
  <div className="filter-group">
    <h4>排序依</h4>
    <select onChange={(e) => handleSortChange(e.target.value)}>
      <option value="relevance">相關性</option>
      <option value="fastest">最快送達</option>
      <option value="distance">距離</option>
    </select>
  </div>

  {/* 快速篩選 */}
  <div className="filter-group">
    <h4>快速篩選</h4>
    <label>
      <input
        type="checkbox"
        onChange={(e) => handleFilterChange("freeDelivery", e.target.checked)}
      />
      免外送服務費
    </label>
    <label>
      <input
        type="checkbox"
        onChange={(e) => handleFilterChange("discount", e.target.checked)}
      />
      折扣
    </label>
    <label>
      <input
        type="checkbox"
        onChange={(e) => handleFilterChange("acceptCoupons", e.target.checked)}
      />
      接受優惠券
    </label>
  </div>

  {/* 菜式 */}
  <div className="filter-group">
    <h4>菜式</h4>
    <div className="search-section">
      <input
        type="text"
        placeholder="搜尋菜式"
        onChange={(e) => handleFilterChange("searchCuisine", e.target.value)}
      />
      <button>搜尋</button>
    </div>
    <label><input type="checkbox" /> 三明治 / 吐司</label>
    <label><input type="checkbox" /> 中式</label>
    <label><input type="checkbox" /> 丼飯/蓋飯</label>
    <label><input type="checkbox" /> 便當</label>
    <label><input type="checkbox" /> 健康餐</label>
    <label><input type="checkbox" /> 台式</label>
    <label><input type="checkbox" /> 咖哩</label>
    <label><input type="checkbox" /> 咖啡</label>
    <label><input type="checkbox" /> 壽司</label>
    <label><input type="checkbox" /> 小吃</label>
    <label><input type="checkbox" /> 披薩</label>
    <label><input type="checkbox" /> 拉麵</label>
    <label><input type="checkbox" /> 日式</label>
    <label><input type="checkbox" /> 早餐</label>
    <label><input type="checkbox" /> 東南亞</label>
    <label><input type="checkbox" /> 歐美</label>
    <label><input type="checkbox" /> 泰式</label>
    <label><input type="checkbox" /> 港式</label>
    <label><input type="checkbox" /> 湯品</label>
    <label><input type="checkbox" /> 滷味</label>
    <label><input type="checkbox" /> 漢堡</label>
    <label><input type="checkbox" /> 火鍋</label>
    <label><input type="checkbox" /> 炒飯</label>
    <label><input type="checkbox" /> 炸雞</label>
    <label><input type="checkbox" /> 燒烤</label>
    <label><input type="checkbox" /> 牛排</label>
    <label><input type="checkbox" /> 甜甜圈</label>
    <label><input type="checkbox" /> 甜點</label>
    <label><input type="checkbox" /> 異國</label>
    <label><input type="checkbox" /> 粥</label>
    <label><input type="checkbox" /> 素食</label>
    <label><input type="checkbox" /> 義大利麵</label>
    <label><input type="checkbox" /> 蛋糕</label>
    <label><input type="checkbox" /> 豆花</label>
    <label><input type="checkbox" /> 越式</label>
    <label><input type="checkbox" /> 鐵板燒</label>
    <label><input type="checkbox" /> 飲料</label>
    <label><input type="checkbox" /> 餃子</label>
    <label><input type="checkbox" /> 鹹酥雞/雞排</label>
    <label><input type="checkbox" /> 麵食</label>
  </div>

  {/* 價格 */}
  <div className="filter-group">
    <h4>價格</h4>
    <input
      type="number"
      placeholder="最低價格"
      onChange={(e) => handleFilterChange("minPrice", e.target.value)}
    />
    <input
      type="number"
      placeholder="最高價格"
      onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
    />
  </div>
        </div>


      {/* 餐廳列表 */}
      {/* <div className="restaurantData-list">
        {filteredAndSortedRestaurants.map((restaurantData, index) => (
          <div key={index} className="restaurantData-card">
            <img src={restaurantData.image} alt={restaurantData.name} />
            <h2>{restaurantData.name}</h2>
            <p>{restaurantData.details}</p>
            <span>評分：{restaurantData.rating}</span>
          </div>
        ))}
      </div> */}

    <Grid 
      container spacing={1} 
      justifyContent="flex-start" 
      minHeight={"450px"}
      padding={"0 8% 0 8%"}
      >
      {filteredAndSortedRestaurants.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          沒有找到符合條件的餐廳。
        </Typography>
      ) : (
        filteredAndSortedRestaurants.map((filteredAndSortedRestaurants, index) => (
          <Grid 
            item key={index} 
            md={4}
            >
            <RestaurantCard
              restaurant={filteredAndSortedRestaurants}
              onClick={() => handleRestaurantClick(filteredAndSortedRestaurants.name)} 
            />
          </Grid>
        ))
      )}
    </Grid>
    </div>
  );
};

export default FoodDeliveryPage;
