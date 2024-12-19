import React, { useEffect, useState, useMemo } from "react";
import { Grid, Typography, Box } from "@mui/material";
import RestaurantCard from "../components/RestaurantCard";
import { useNavigate } from "react-router-dom";

const Tab3 = ({ handleRestaurantClick }) => {
  const [promotions, setPromotions] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);
  const navigate = useNavigate();

  const [filters, setFilters] = useState({});
  const [sortKey, setSortKey] = useState("default");
  const [searchValue, setSearchValue] = useState(""); // 儲存搜尋框的輸入值
  const [filteredSearch, setFilteredSearch] = useState(""); // 用來篩選的狀態
  const [showAllCuisines, setShowAllCuisines] = useState(false);
  const [hasDiscount, setHasDiscount] = useState(
    JSON.parse(localStorage.getItem("has_discount")) || false
  );

  const [isVoucherEnabled, setIsVoucherEnabled] = useState(
    JSON.parse(localStorage.getItem("is_voucher_enabled")) || false
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const hotSearches = [
    "24小時",
    "小紅帽",
    "內褲",
    "24小時出貨",
    "starbucks",
    "家樂福",
    "星巴克",
    "咖啡豆",
    "屈臣氏",
    "咖啡",
  ];

  const handleSearch = (term) => {
    setSearchTerm(term);
    setShowSuggestions(false);
    console.log(`搜尋：${term}`);
  };

  // Save state to localStorage on change
  useEffect(() => {
    localStorage.setItem("has_discount", JSON.stringify(hasDiscount));
  }, [hasDiscount]);

  useEffect(() => {
    localStorage.setItem(
      "is_voucher_enabled",
      JSON.stringify(isVoucherEnabled)
    );
  }, [isVoucherEnabled]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (name === "has_discount") {
      setHasDiscount(checked);
    } else if (name === "is_voucher_enabled") {
      setIsVoucherEnabled(checked);
    }
  };

  useEffect(() => {
    console.log(
      filters,
      sortKey,
      searchValue,
      filteredSearch,
      hasDiscount,
      isVoucherEnabled
    );
  }, [
    filters,
    sortKey,
    searchValue,
    filteredSearch,
    hasDiscount,
    isVoucherEnabled,
  ]);

  const handleClear = () => {
    setFilters({});
    handleSortChange("default");
    setHasDiscount(false);
    setIsVoucherEnabled(false);
  };

  const visibleCuisines = showAllCuisines
    ? [
        "便利商店",
        "外帶自取",
        "居家和禮品",
        "日用百貨",
        "時尚配件",
        "服務",
        "爽爽吃火鍋",
        "生鮮雜貨",
        "美妝保養",
        "美妝藥局",
        "花藝植栽",
        "超市",
        "運動流行",
        "電子3C",
      ]
    : [
        "便利商店",
        "外帶自取",
        "居家和禮品",
        "日用百貨",
        "時尚配件",
        "服務",
        "爽爽吃火鍋",
        "生鮮雜貨",
        "美妝保養",
        "美妝藥局",
      ];

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

  const filteredAndSortedRestaurants = useMemo(() => {
    let filtered = [...restaurantData];

    console.log(filtered);

    // 篩選 - 類型 (小吃，鹹酥雞/雞排，台式)
    // if (filters.type) {
    //   const types = filters.type; // 將類型以逗號分隔，並去除空格
    //   filtered = filtered.filter((res) => {
    //     const restaurantTypes = res.type.split("，").map((t) => t.trim()); // 餐廳的類型字串轉為陣列
    //     return restaurantTypes.some((type) => types.includes(type)); // 判斷是否有交集
    //   });
    // }

    console.log(filtered);

    console.log(filtered);

    return filtered;
  }, [filters, filteredSearch, restaurantData]);
  useEffect(() => {
    // Fetch promotions data from the backend
    const fetchPromotions = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/groceries_promotions`
        );
        const data = await response.json();
        setPromotions(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch promotions:", error);
      }
    };

    // Fetch restaurant data from the backend
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/groceries_restaurants`
        );
        const data = await response.json();
        setRestaurantData(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch restaurant data:", error);
      }
    };

    fetchPromotions();
    fetchRestaurants();
  }, []);

  const handleCardClick = (restaurantName) => {
    navigate(`/groceries/${encodeURIComponent(restaurantName)}`); // 跳转到商家详情页面
  };

  return (
    <div
      className="food-promotions-page"
      style={{
        padding: "20px 50px 20px 20px",
        display: "flex",
        gap: "80px",
        flexDirection: "row", // Ensure proper alignment
        width: "100%", // Allow it to stretch to the full width
        height: "100%", // Optional: Allow it to stretch vertically
        // flexGrow: 1, // Allow the children to grow within the flex layout
        boxSizing: "border-box", // Include padding/border in the dimensions
      }}
    >
      {/* 篩選和排序的側邊欄 */}
      <div className="sidebar">
        <div className="box-flex ai-center jc-space-between fd-row">
          <div className="boxx">
            <h3
              className="f-title-medium-font-size fw-title-medium-font-weight lh-title-medium-line-height ff-title-medium-font-family ffs-title-medium-font-feature-settings mb-xxs"
              data-testid="left-side-filters-panel__heading"
            >
              篩選
            </h3>
            <div className="bds-t1-btn-cursor bds-t1-btn-cursor--layout-default">
              <button
                className="bds-t1-btn bds-t1-btn-text bds-t1-btn--size-small bds-is-idle bds-t1-btn--layout-default bds-t1-btn--remove-side-spacing zi-surface-base"
                data-testid="left-side-filters-panel__clear-all-btn"
                onClick={handleClear} // 清除所有篩選條件
              >
                <span className="bds-t1-btn__idle-content">
                  <span className="bds-t1-btn__idle-content__label">
                    清除所有
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 優惠 */}
        <section className="box-flex offers-filter" data-testid="offers-filter">
          <h4
            className="cl-neutral-primary f-label-medium-font-size fw-label-medium-font-weight lh-label-medium-line-height ff-label-medium-font-family sm:mb-xs md:mb-sm lg:mb-sm xl:mb-sm mb-xs"
            data-testid="offers-filter__section-heading"
          >
            優惠
          </h4>
          <label
            className="bds-t1-checkbox bds-t1-checkbox--inline bds-t1-checkbox--align-items-start offers-filter__list-item"
            htmlFor="offers-filter-checkbox-has_discount"
          >
            <input
              id="offers-filter-checkbox-has_discount"
              className="bds-t1-checkbox__input"
              type="checkbox"
              data-testid="offers-filter-checkbox-has_discount"
              name="has_discount"
              value="has_discount"
              checked={hasDiscount}
              onChange={handleCheckboxChange}
            />
            <span className="bds-t1-checkbox__icon">
              <span className="bds-t1-checkbox__icon-checked">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  className="bds-t1-checkbox__icon-checked-icon"
                  fill="white"
                  width="10"
                  height="8"
                  viewBox="0 0 10 8"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8.72365 0.501836C9.01563 0.208942 9.48904 0.208942 9.78103 0.501836C10.0464 0.7681 10.0706 1.18477 9.8534 1.47838L9.78103 1.5625L3.64486 7.71783L0.218985 4.28125C-0.0729951 3.98835 -0.0729951 3.51348 0.218985 3.22059C0.484423 2.95432 0.899787 2.93011 1.19248 3.14797L1.27634 3.22059L3.64473 5.59579L8.72365 0.501836Z"></path>
                </svg>
              </span>
              <span className="bds-t1-checkbox__icon-unchecked"></span>
            </span>
            <span className="bds-t1-checkbox__text f-label-medium-font-size fw-label-medium-font-weight lh-label-medium-line-height ff-label-medium-font-family">
              免外送服務費
            </span>
          </label>

          <label
            className="bds-t1-checkbox bds-t1-checkbox--inline bds-t1-checkbox--align-items-start offers-filter__list-item"
            htmlFor="offers-filter-checkbox-is_voucher_enabled"
          >
            <input
              id="offers-filter-checkbox-is_voucher_enabled"
              className="bds-t1-checkbox__input"
              type="checkbox"
              data-testid="offers-filter-checkbox-is_voucher_enabled"
              name="is_voucher_enabled"
              value="is_voucher_enabled"
              checked={isVoucherEnabled}
              onChange={handleCheckboxChange}
            />
            <span className="bds-t1-checkbox__icon">
              <span className="bds-t1-checkbox__icon-checked">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  className="bds-t1-checkbox__icon-checked-icon"
                  fill="white"
                  width="10"
                  height="8"
                  viewBox="0 0 10 8"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8.72365 0.501836C9.01563 0.208942 9.48904 0.208942 9.78103 0.501836C10.0464 0.7681 10.0706 1.18477 9.8534 1.47838L9.78103 1.5625L3.64486 7.71783L0.218985 4.28125C-0.0729951 3.98835 -0.0729951 3.51348 0.218985 3.22059C0.484423 2.95432 0.899787 2.93011 1.19248 3.14797L1.27634 3.22059L3.64473 5.59579L8.72365 0.501836Z"></path>
                </svg>
              </span>
              <span className="bds-t1-checkbox__icon-unchecked"></span>
            </span>
            <span className="bds-t1-checkbox__text f-label-medium-font-size fw-label-medium-font-weight lh-label-medium-line-height ff-label-medium-font-family">
              接受優惠券
            </span>
          </label>
          <label
            className="bds-t1-checkbox bds-t1-checkbox--inline bds-t1-checkbox--align-items-start offers-filter__list-item"
            htmlFor="offers-filter-checkbox-has_discount"
          >
            <input
              id="offers-filter-checkbox-has_discount"
              className="bds-t1-checkbox__input"
              type="checkbox"
              data-testid="offers-filter-checkbox-has_discount"
              name="has_discount"
              value="has_discount"
              checked={hasDiscount}
              onChange={handleCheckboxChange}
            />
            <span className="bds-t1-checkbox__icon">
              <span className="bds-t1-checkbox__icon-checked">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  className="bds-t1-checkbox__icon-checked-icon"
                  fill="white"
                  width="10"
                  height="8"
                  viewBox="0 0 10 8"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8.72365 0.501836C9.01563 0.208942 9.48904 0.208942 9.78103 0.501836C10.0464 0.7681 10.0706 1.18477 9.8534 1.47838L9.78103 1.5625L3.64486 7.71783L0.218985 4.28125C-0.0729951 3.98835 -0.0729951 3.51348 0.218985 3.22059C0.484423 2.95432 0.899787 2.93011 1.19248 3.14797L1.27634 3.22059L3.64473 5.59579L8.72365 0.501836Z"></path>
                </svg>
              </span>
              <span className="bds-t1-checkbox__icon-unchecked"></span>
            </span>
            <span className="bds-t1-checkbox__text f-label-medium-font-size fw-label-medium-font-weight lh-label-medium-line-height ff-label-medium-font-family">
              折扣
            </span>
          </label>
        </section>

        {/* 店家類型 */}
        <div className="filter-group">
          <h4>店家類型</h4>
          {visibleCuisines.map((cuisine) => (
            <label key={cuisine} className="cuisines-filter__list-item">
              <input
                type="checkbox"
                className="bds-t1-checkbox__input"
                checked={filters.type === cuisine}
                onChange={() =>
                  handleFilterChange(
                    "type",
                    filters.type === cuisine ? "all" : cuisine
                  )
                }
              />
              <span className="bds-t1-checkbox__icon">
                <span className="bds-t1-checkbox__icon-checked">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    className="bds-t1-checkbox__icon-checked-icon"
                    fill="white"
                    width="10"
                    height="8"
                    viewBox="0 0 10 8"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.72365 0.501836C9.01563 0.208942 9.48904 0.208942 9.78103 0.501836C10.0464 0.7681 10.0706 1.18477 9.8534 1.47838L9.78103 1.5625L3.64486 7.71783L0.218985 4.28125C-0.0729951 3.98835 -0.0729951 3.51348 0.218985 3.22059C0.484423 2.95432 0.899787 2.93011 1.19248 3.14797L1.27634 3.22059L3.64473 5.59579L8.72365 0.501836Z"></path>
                  </svg>
                </span>
                <span className="bds-t1-checkbox__icon-unchecked"></span>
              </span>
              <span className="bds-t1-checkbox__text">{cuisine}</span>
            </label>
          ))}

          <button
            onClick={() => setShowAllCuisines((prev) => !prev)}
            className="toggle-cuisines-button"
          >
            <span className="bds-t1-btn__idle-content">
              <span className="bds-t1-btn__idle-content__label">
                {showAllCuisines ? "顯示更少" : "顯示更多"}
              </span>
              <span className="bds-t1-btn__idle-content__suffix">
                {showAllCuisines ? (
                  // 顯示更少的圖標
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    className="fl-interaction-primary"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.46971 14.7365C5.20343 14.4703 5.17918 14.0536 5.39702 13.76L5.46963 13.6759L11.6714 7.4731C11.8272 7.31728 12.0796 7.3168 12.236 7.47203L18.5284 13.7177C18.8223 14.0095 18.8241 14.4844 18.5323 14.7784C18.267 15.0456 17.8505 15.0714 17.556 14.8546L17.4716 14.7823L12.2398 9.59066C12.0835 9.43548 11.831 9.43597 11.6752 9.59174L6.53037 14.7364C6.26413 15.0027 5.84747 15.027 5.55384 14.8091L5.46971 14.7365Z"
                    ></path>
                  </svg>
                ) : (
                  // 顯示更多的圖標
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    className="fl-interaction-primary"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M18.5303 9.26347C18.7966 9.52971 18.8208 9.94638 18.603 10.24L18.5304 10.3241L12.3286 16.5269C12.1728 16.6827 11.9204 16.6832 11.764 16.528L5.47165 10.2823C5.17767 9.9905 5.1759 9.51563 5.4677 9.22165C5.73297 8.95439 6.14955 8.92864 6.44397 9.1454L6.52835 9.2177L11.7602 14.4093C11.9165 14.5645 12.169 14.564 12.3248 14.4083L17.4696 9.26356C17.7359 8.99727 18.1525 8.97303 18.4462 9.19086L18.5303 9.26347Z"
                    ></path>
                  </svg>
                )}
              </span>
            </span>
          </button>
        </div>
      </div>
      {/* Promotions Section */}
      <div className="select-dig-page">
        {/* 全屏遮罩 */}
        {showSuggestions && (
          <div
            onClick={() => setShowSuggestions(false)} // 點擊遮罩隱藏彈窗
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)", // 半透明背景
              zIndex: 5,
            }}
          ></div>
        )}
        <div
          style={{
            position: "relative", // 設置父元素為相對定位
            display: "flex",
            alignItems: "center",
            backgroundColor: "#f9f9f9",
            borderRadius: "30px",
            padding: "20px 20px",
            border: "1px solid #ccc",
            boxShadow: showSuggestions ? "0 0 5px #007bff" : "none",
            zIndex: 10,
            marginBottom: "20px",
          }}
        >
          {/* 搜尋框 */}
          <svg
            aria-hidden="true"
            focusable="false"
            class="fl-none"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: "absolute", // 設置圖標為絕對定位
              top: "50%", // 垂直居中
              left: "15px", // 距離左側15px
              transform: "translateY(-50%)", // 修正垂直偏移，真正居中
              fill: "#888",
            }}
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.5 2C15.1944 2 19 5.80558 19 10.5C19 12.4076 18.3716 14.1684 17.3106 15.5867C17.2902 15.614 17.2661 15.6455 17.2383 15.6811C17.1139 15.8403 17.1279 16.0674 17.2708 16.2102L20.8386 19.7747C21.1316 20.0675 21.1318 20.5424 20.839 20.8354C20.5728 21.1018 20.1562 21.1261 19.8625 20.9084L19.7783 20.8358L16.2103 17.2705C16.0675 17.1279 15.8408 17.114 15.6817 17.2381C15.655 17.2588 15.6311 17.2772 15.6099 17.2932C14.1876 18.3648 12.418 19 10.5 19C5.80558 19 2 15.1944 2 10.5C2 5.80558 5.80558 2 10.5 2ZM10.5 3.5C6.63401 3.5 3.5 6.63401 3.5 10.5C3.5 14.366 6.63401 17.5 10.5 17.5C14.366 17.5 17.5 14.366 17.5 10.5C17.5 6.63401 14.366 3.5 10.5 3.5Z"
            ></path>
          </svg>
          <input
            type="text"
            placeholder="搜尋店家或產品"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              fontSize: "16px",
              backgroundColor: "transparent",
              alignItems: "center",
              paddingLeft: "25px", // 確保文字不與圖標重疊
            }}
          />

          {/* 熱門搜尋彈窗 */}
          {showSuggestions && (
            <div
              style={{
                position: "absolute",
                top: "70px",
                left: "0",
                width: "100%",
                background: "#fff",
                borderRadius: "15px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                padding: "10px",
                zIndex: 10,
              }}
            >
              <div style={{ marginBottom: "20px", fontWeight: "bold" }}>
                熱門搜尋
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  padding: "10px",
                }}
              >
                {hotSearches.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(item)}
                    style={{
                      padding: "5px 10px",
                      border: "1px solid #ccc",
                      borderRadius: "20px",
                      background: "white",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="promotions-and-img-box">
          <div
            className="wehavegiftforyou"
            style={{
              fontSize: "32px", // 修改字體大小，例如設為 24px
              fontWeight: "bold", // 可以同時設定字重
            }}
          >
            精選優惠
          </div>
          <Box className="promotion-section" display="flex" gap={2} mb={4}>
            {promotions.length > 0 ? (
              promotions.map((promo) => (
                <Box
                  key={promo.id}
                  className="promo-card1"
                  borderRadius={2}
                  // bgcolor="#ffe4e1"
                  //flex={1}
                  textAlign="center"
                  sx={{
                    width: "280px", // 設置寬度
                    height: "120px",
                    backgroundImage: `url(${promo.image})`,
                    backgroundSize: "cover", // 覆蓋背景，無縫鋪滿
                    backgroundPosition: "center", // 中心對齊
                  }}
                >
                  <Typography variant="body1" fontWeight="bold">
                    {/* {promo.title} */}
                  </Typography>
                  {/* <Typography variant="body2">{promo.description}</Typography> */}
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                沒有可用的優惠。
              </Typography>
            )}
          </Box>
        </div>
        <div className="today-good-shit">
          {/* Today's Offers Section */}
          <div
            className="wehavegiftforyou"
            style={{
              fontSize: "32px", // 修改字體大小，例如設為 24px
              fontWeight: "bold", // 可以同時設定字重
            }}
          >
            今日好康
          </div>
          <Grid container spacing={2} className="today-offers">
            {restaurantData.length > 0 ? (
              restaurantData.map((restaurant, index) => (
                <Grid item xs={12} sm={4} md={3} key={index}>
                  <RestaurantCard
                    restaurant={restaurant}
                    onClick={() => handleCardClick(restaurant.name)} // 点击事件
                  />
                </Grid>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                沒有符合條件的餐廳。
              </Typography>
            )}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Tab3;
