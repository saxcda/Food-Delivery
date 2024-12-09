import React, { useState, useMemo, useEffect } from "react";
import "./FoodDeliveryPage.css";
import RestaurantCard from "../components/RestaurantCard";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Grid, Typography } from "@mui/material";
import HeaderLocation from "../components/HeaderLocation";
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

  const handleRestaurantClick = (restaurantName) => {
    navigate(`/restaurants/${city}/${encodeURIComponent(restaurantName)}`);
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
      <div className="food-delivery-page">
        
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
              <div className="bds-c-btn-cursor bds-c-btn-cursor--layout-default">
                <button
                  className="bds-c-btn bds-c-btn-text bds-c-btn--size-small bds-is-idle bds-c-btn--layout-default bds-c-btn--remove-side-spacing zi-surface-base"
                  data-testid="left-side-filters-panel__clear-all-btn"
                  onClick={() => setFilters({})} // 清除所有篩選條件
                >
                  <span className="bds-c-btn__idle-content">
                    <span className="bds-c-btn__idle-content__label">
                      清除所有
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>

          <section
            className="box-flex sorting-filter__section"
            data-testid="sorting-filter__section"
          >
            <h4
              className="cl-neutral-primary f-label-medium-font-size fw-label-medium-font-weight lh-label-medium-line-height ff-label-medium-font-family sm:mb-xs md:mb-sm lg:mb-sm xl:mb-sm mb-xs"
              data-testid="sorting-filter__section__section-heading"
            >
              排序依
            </h4>
            <ul className="box-flex sorting-filter__section__list">
              <li className="box-flex sorting-filter__section__list-items">
                <label
                  className="bds-c-radio-button bds-c-radio-button--inline bds-c-radio-button--align-items-start"
                  id="sort_relevance-label"
                >
                  <input
                    id="sort_relevance"
                    className="bds-c-radio-button__input"
                    type="radio"
                    data-testid="sort_relevance"
                    name="sortOption"
                    checked={sortKey === "relevance"}
                    onChange={() => handleSortChange("relevance")}
                  />
                  <span className="bds-c-radio-button__icon">
                    <span className="bds-c-radio-button__icon-checked">
                      <span className="bds-c-radio-button__icon-checked__inner"></span>
                    </span>
                    <span className="bds-c-radio-button__icon-unchecked"></span>
                  </span>
                  <span className="bds-c-radio-button__text sorting-filter__section__list-items__radio-button f-label-medium-font-size fw-label-medium-font-weight lh-label-medium-line-height ff-label-medium-font-family">
                    相關性
                  </span>
                </label>
              </li>
              <li className="box-flex sorting-filter__section__list-items">
                <label
                  className="bds-c-radio-button bds-c-radio-button--inline bds-c-radio-button--align-items-start"
                  id="delivery_time_asc-label"
                >
                  <input
                    id="delivery_time_asc"
                    className="bds-c-radio-button__input"
                    type="radio"
                    data-testid="delivery_time_asc"
                    name="sortOption"
                    checked={sortKey === "fastest"}
                    onChange={() => handleSortChange("fastest")}
                  />
                  <span className="bds-c-radio-button__icon">
                    <span className="bds-c-radio-button__icon-checked">
                      <span className="bds-c-radio-button__icon-checked__inner"></span>
                    </span>
                    <span className="bds-c-radio-button__icon-unchecked"></span>
                  </span>
                  <span className="bds-c-radio-button__text sorting-filter__section__list-items__radio-button f-label-medium-font-size fw-label-medium-font-weight lh-label-medium-line-height ff-label-medium-font-family">
                    最快送達
                  </span>
                </label>
              </li>
              <li className="box-flex sorting-filter__section__list-items">
                <label
                  className="bds-c-radio-button bds-c-radio-button--inline bds-c-radio-button--align-items-start"
                  id="distance_asc-label"
                >
                  <input
                    id="distance_asc"
                    className="bds-c-radio-button__input"
                    type="radio"
                    data-testid="distance_asc"
                    name="sortOption"
                    checked={sortKey === "distance"}
                    onChange={() => handleSortChange("distance")}
                  />
                  <span className="bds-c-radio-button__icon">
                    <span className="bds-c-radio-button__icon-checked">
                      <span className="bds-c-radio-button__icon-checked__inner"></span>
                    </span>
                    <span className="bds-c-radio-button__icon-unchecked"></span>
                  </span>
                  <span className="bds-c-radio-button__text sorting-filter__section__list-items__radio-button f-label-medium-font-size fw-label-medium-font-weight lh-label-medium-line-height ff-label-medium-font-family">
                    距離
                  </span>
                </label>
              </li>
            </ul>
          </section>

          {/* 快速篩選 */}
          <section
            className="box-flex quick-filters"
            data-testid="quick-filters"
          >
            <h4
              className="cl-neutral-primary f-label-medium-font-size fw-label-medium-font-weight lh-label-medium-line-height ff-label-medium-font-family sm:mb-xs md:mb-sm lg:mb-sm xl:mb-sm mb-xs"
              data-testid="quick-filters__section-heading"
            >
              快速篩選
            </h4>
            <ul className="box-flex quick-filters__section fw-wrap fd-row">
              <label htmlFor="rating" className="bds-c-pill__label">
                <div
                  className={`bds-c-pill ${
                    filters.rating4Plus
                      ? "bds-is-selected"
                      : "bds-is-unselected"
                  }`}
                >
                  <input
                    id="rating"
                    className="bds-c-pill__input"
                    type="checkbox"
                    data-testid="rating"
                    onClick={() =>
                      handleFilterChange("rating4Plus", !filters.rating4Plus)
                    }
                    checked={filters.rating4Plus || false}
                  />
                  <div className="bds-c-pill__content bds-c-pill__content--size-small">
                    評分為4+
                  </div>
                </div>
              </label>
              <label htmlFor="is_super_vendor" className="bds-c-pill__label">
                <div
                  className={`bds-c-pill ${
                    filters.superVendor
                      ? "bds-is-selected"
                      : "bds-is-unselected"
                  }`}
                >
                  <input
                    id="is_super_vendor"
                    className="bds-c-pill__input"
                    type="checkbox"
                    data-testid="is_super_vendor"
                    onChange={(e) =>
                      handleFilterChange("superVendor", e.target.checked)
                    }
                    checked={filters.superVendor || false}
                  />
                  <div className="bds-c-pill__content bds-c-pill__content--size-small">
                    <span class="bds-c-pill__leading-icon">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        class="fl-neutral-primary"
                        width="16"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M8.58324 1.22852C8.44085 1.05238 8.22648 0.950012 7.99998 0.950012C7.77348 0.950012 7.5591 1.05238 7.41671 1.22852L6.44878 2.42592L4.9619 2.02614C4.74316 1.96733 4.50957 2.01052 4.32632 2.14366C4.14308 2.27679 4.02981 2.48561 4.01815 2.71181L3.9389 4.24946L2.501 4.8C2.28947 4.88099 2.12587 5.05324 2.05588 5.26866C1.98588 5.48407 2.01699 5.71958 2.14052 5.90944L2.98021 7.20001L2.14052 8.49058C2.01699 8.68044 1.98588 8.91595 2.05588 9.13137C2.12587 9.34679 2.28947 9.51903 2.501 9.60002L3.9389 10.1506L4.01815 11.6882C4.02981 11.9144 4.14308 12.1232 4.32632 12.2564C4.50957 12.3895 4.74316 12.4327 4.9619 12.3739L6.44878 11.9741L7.41671 13.1715C7.5591 13.3476 7.77348 13.45 7.99998 13.45C8.22648 13.45 8.44085 13.3476 8.58324 13.1715L9.55117 11.9741L11.0381 12.3739C11.2568 12.4327 11.4904 12.3895 11.6736 12.2564C11.8569 12.1232 11.9701 11.9144 11.9818 11.6882L12.0611 10.1506L13.499 9.60002C13.7105 9.51903 13.8741 9.34679 13.9441 9.13137C14.0141 8.91595 13.983 8.68044 13.8594 8.49059L13.0198 7.20001L13.8594 5.90944C13.983 5.71958 14.0141 5.48407 13.9441 5.26866C13.8741 5.05324 13.7105 4.88099 13.499 4.8L12.0611 4.24946L11.9818 2.71181C11.9701 2.48561 11.8569 2.27679 11.6736 2.14366C11.4904 2.01052 11.2568 1.96733 11.0381 2.02614L9.55117 2.42592L8.58324 1.22852ZM7.93556 9.01689L6.26016 9.86918C6.12491 9.93798 5.95764 9.88767 5.88654 9.75681C5.85822 9.7047 5.84845 9.64501 5.85874 9.58698L6.17871 7.7818C6.18641 7.73838 6.17153 7.69407 6.13893 7.66332L4.7835 6.38489C4.67409 6.28169 4.67185 6.11221 4.7785 6.00634C4.82097 5.96418 4.87661 5.93674 4.93683 5.92828L6.80999 5.6649C6.85504 5.65857 6.89399 5.63119 6.91414 5.59168L7.75185 3.94927C7.81947 3.81669 7.98536 3.76226 8.12237 3.82769C8.17693 3.85375 8.22109 3.89648 8.24802 3.94927L9.08573 5.59168C9.10587 5.63119 9.14482 5.65857 9.18988 5.6649L11.063 5.92828C11.2142 5.94954 11.319 6.08538 11.297 6.23169C11.2883 6.28995 11.2599 6.34379 11.2164 6.38489L9.86093 7.66332C9.82833 7.69407 9.81345 7.73838 9.82115 7.7818L10.1411 9.58698C10.167 9.7327 10.0658 9.87109 9.91522 9.89608C9.85525 9.90603 9.79356 9.89658 9.73971 9.86918L8.0643 9.01689C8.024 8.99639 7.97586 8.99639 7.93556 9.01689ZM1.80326 12.5656L3.02615 10.4474C3.28697 10.5738 3.46092 10.8331 3.47602 11.1261L3.54062 12.3793C3.56684 12.8879 4.05541 13.2429 4.54728 13.1107L5.75908 12.7848C6.0008 12.7199 6.25485 12.7724 6.44895 12.919L5.44057 14.6656C5.29698 14.9142 4.94589 14.9351 4.77387 14.7052L3.8713 13.4987C3.80572 13.4111 3.70708 13.3541 3.59838 13.3412L2.1023 13.1627C1.81715 13.1287 1.65968 12.8142 1.80326 12.5656ZM10.4966 14.6656L9.50825 12.9536C9.70681 12.781 9.98094 12.715 10.2408 12.7848L11.4526 13.1107C11.9445 13.2429 12.4331 12.8879 12.4593 12.3793L12.5239 11.1261C12.538 10.8515 12.6917 10.6065 12.9257 10.4728L14.134 12.5656C14.2775 12.8142 14.1201 13.1287 13.8349 13.1627L12.3388 13.3412C12.2301 13.3541 12.1315 13.4111 12.0659 13.4987L11.1633 14.7052C10.9913 14.9351 10.6402 14.9142 10.4966 14.6656Z"
                        ></path>
                      </svg>
                    </span>
                    模範餐廳
                  </div>
                </div>
              </label>
            </ul>
          </section>
          {/* 優惠 */}
          <section
            className="box-flex offers-filter"
            data-testid="offers-filter"
          >
            <h4
              className="cl-neutral-primary f-label-medium-font-size fw-label-medium-font-weight lh-label-medium-line-height ff-label-medium-font-family sm:mb-xs md:mb-sm lg:mb-sm xl:mb-sm mb-xs"
              data-testid="offers-filter__section-heading"
            >
              優惠
            </h4>
            <label
              className="bds-c-checkbox bds-c-checkbox--inline bds-c-checkbox--align-items-start offers-filter__list-item"
              htmlFor="offers-filter-checkbox-has_discount"
            >
              <input
                id="offers-filter-checkbox-has_discount"
                className="bds-c-checkbox__input"
                type="checkbox"
                data-testid="offers-filter-checkbox-has_discount"
                name="has_discount"
                value="has_discount"
              />
              <span className="bds-c-checkbox__icon">
                <span className="bds-c-checkbox__icon-checked">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    className="bds-c-checkbox__icon-checked-icon"
                    fill="white"
                    width="10"
                    height="8"
                    viewBox="0 0 10 8"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.72365 0.501836C9.01563 0.208942 9.48904 0.208942 9.78103 0.501836C10.0464 0.7681 10.0706 1.18477 9.8534 1.47838L9.78103 1.5625L3.64486 7.71783L0.218985 4.28125C-0.0729951 3.98835 -0.0729951 3.51348 0.218985 3.22059C0.484423 2.95432 0.899787 2.93011 1.19248 3.14797L1.27634 3.22059L3.64473 5.59579L8.72365 0.501836Z"></path>
                  </svg>
                </span>
                <span className="bds-c-checkbox__icon-unchecked"></span>
              </span>
              <span className="bds-c-checkbox__text f-label-medium-font-size fw-label-medium-font-weight lh-label-medium-line-height ff-label-medium-font-family">
                折扣
              </span>
            </label>
            <label
              className="bds-c-checkbox bds-c-checkbox--inline bds-c-checkbox--align-items-start offers-filter__list-item"
              htmlFor="offers-filter-checkbox-is_voucher_enabled"
            >
              <input
                id="offers-filter-checkbox-is_voucher_enabled"
                className="bds-c-checkbox__input"
                type="checkbox"
                data-testid="offers-filter-checkbox-is_voucher_enabled"
                name="is_voucher_enabled"
                value="is_voucher_enabled"
              />
              <span className="bds-c-checkbox__icon">
                <span className="bds-c-checkbox__icon-checked">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    className="bds-c-checkbox__icon-checked-icon"
                    fill="white"
                    width="10"
                    height="8"
                    viewBox="0 0 10 8"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.72365 0.501836C9.01563 0.208942 9.48904 0.208942 9.78103 0.501836C10.0464 0.7681 10.0706 1.18477 9.8534 1.47838L9.78103 1.5625L3.64486 7.71783L0.218985 4.28125C-0.0729951 3.98835 -0.0729951 3.51348 0.218985 3.22059C0.484423 2.95432 0.899787 2.93011 1.19248 3.14797L1.27634 3.22059L3.64473 5.59579L8.72365 0.501836Z"></path>
                  </svg>
                </span>
                <span className="bds-c-checkbox__icon-unchecked"></span>
              </span>
              <span className="bds-c-checkbox__text f-label-medium-font-size fw-label-medium-font-weight lh-label-medium-line-height ff-label-medium-font-family">
                接受優惠券
              </span>
            </label>
          </section>

          {/* 菜式 */}
          <div className="filter-group">
            <h4>菜式</h4>
            <div className="bds-c-search-input__search-control">
              <label
                className="bds-c-search-input__label"
                htmlFor="search-input-cuisines-section"
              ></label>
              <span className="bds-c-search-input__search-icon">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  className="fl-none"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.96564 11.0279C9.13594 11.6401 8.11023 12.002 7 12.002C4.23858 12.002 2 9.76338 2 7.00195C2 4.24053 4.23858 2.00195 7 2.00195C9.76142 2.00195 12 4.24053 12 7.00195C12 8.11221 11.6381 9.13795 11.0259 9.96766C11.031 9.97246 11.036 9.97734 11.0409 9.9823L13.7803 12.7216C14.0732 13.0145 14.0732 13.4894 13.7803 13.7823C13.4874 14.0752 13.0125 14.0752 12.7196 13.7823L9.98029 11.043C9.97532 11.038 9.97044 11.033 9.96564 11.0279ZM10.5 7.00195C10.5 8.93495 8.933 10.502 7 10.502C5.067 10.502 3.5 8.93495 3.5 7.00195C3.5 5.06896 5.067 3.50195 7 3.50195C8.933 3.50195 10.5 5.06896 10.5 7.00195Z"
                  ></path>
                </svg>
              </span>
              <input
                id="search-input-cuisines-section"
                className="bds-c-search-input__field"
                type="search"
                placeholder="搜尋菜式"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            {visibleCuisines.map((cuisine) => (
              <label key={cuisine} className="cuisines-filter__list-item">
                <input
                  type="checkbox"
                  className="bds-c-checkbox__input"
                  checked={filters.type === cuisine}
                  onChange={() =>
                    handleFilterChange(
                      "type",
                      filters.type === cuisine ? "all" : cuisine
                    )
                  }
                />
                <span className="bds-c-checkbox__icon">
                  <span className="bds-c-checkbox__icon-checked">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      className="bds-c-checkbox__icon-checked-icon"
                      fill="white"
                      width="10"
                      height="8"
                      viewBox="0 0 10 8"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8.72365 0.501836C9.01563 0.208942 9.48904 0.208942 9.78103 0.501836C10.0464 0.7681 10.0706 1.18477 9.8534 1.47838L9.78103 1.5625L3.64486 7.71783L0.218985 4.28125C-0.0729951 3.98835 -0.0729951 3.51348 0.218985 3.22059C0.484423 2.95432 0.899787 2.93011 1.19248 3.14797L1.27634 3.22059L3.64473 5.59579L8.72365 0.501836Z"></path>
                    </svg>
                  </span>
                  <span className="bds-c-checkbox__icon-unchecked"></span>
                </span>
                <span className="bds-c-checkbox__text">{cuisine}</span>
              </label>
            ))}
            <button
              onClick={() => setShowAllCuisines((prev) => !prev)}
              className="toggle-cuisines-button"
            >
              <span className="bds-c-btn__idle-content">
                <span className="bds-c-btn__idle-content__label">
                  {showAllCuisines ? "顯示更少" : "顯示更多"}
                </span>
                <span className="bds-c-btn__idle-content__suffix">
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

          {/* 價格 */}
          <div className="filter-group">
            <h4>價格</h4>
            <ul className="price-filter-list">
              {["$", "$$", "$$$"].map((price, index) => (
                <li key={index} className="price-filter-item">
                  <label
                    htmlFor={`filter-budget-${index + 1}`}
                    className={`bds-m-pill ${
                      filters.price === price
                        ? "bds-is-selected"
                        : "bds-is-unselected"
                    }`}
                  >
                    <input
                      id={`filter-budget-${index + 1}`}
                      className="bds-m-pill__input"
                      type="checkbox"
                      data-testid={`filter-budget-${index + 1}`}
                      name="filter-budget"
                      value={price}
                      checked={filters.price === price}
                      onChange={() => handlePriceFilter(price)}
                    />
                    <span className="bds-m-pill__content bds-m-pill__content--size-small">
                      {price}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
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
          container
          spacing={1}
          justifyContent="flex-start"
          minHeight={"450px"}
          padding={"0 8% 0 8%"}
        >
          {filteredAndSortedRestaurants.length === 0 ? (
            <Typography variant="h6" color="textSecondary">
              沒有找到符合條件的餐廳。
            </Typography>
          ) : (
            filteredAndSortedRestaurants.map(
              (filteredAndSortedRestaurants, index) => (
                <Grid item key={index} md={4}>
                  <RestaurantCard
                    restaurant={filteredAndSortedRestaurants}
                    onClick={() =>
                      handleRestaurantClick(filteredAndSortedRestaurants.name)
                    }
                  />
                </Grid>
              )
            )
          )}
        </Grid>
      </div></div>
    );
  };
export default FoodDeliveryPage;
