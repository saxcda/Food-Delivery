import React, { useState, useMemo } from "react";
import "./FoodDeliveryPage.css";
import restaurantData from "../data/restaurantData";

const FoodDeliveryPage = () => {

console.log("Restaurant Data:", restaurantData);
  const [filters, setFilters] = useState({});
  const [sortKey, setSortKey] = useState("default");

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
    console.log("Restaurant Data Type:", typeof restaurantData);
    console.log("Is Array:", Array.isArray(restaurantData));
    console.log("Restaurant Data Content:", restaurantData);

    if (!Array.isArray(restaurantData)) return []; // 确保是数组

    let filtered = [...restaurantData];

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

    return filtered;
  }, [filters, sortKey]);

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
      <div className="restaurantData-list">
        {filteredAndSortedRestaurants.map((restaurantData, index) => (
          <div key={index} className="restaurantData-card">
            <img src={restaurantData.image} alt={restaurantData.name} />
            <h2>{restaurantData.name}</h2>
            <p>{restaurantData.details}</p>
            <span>評分：{restaurantData.rating}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodDeliveryPage;