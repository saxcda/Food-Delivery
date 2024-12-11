import React, { useState, useMemo, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import RestaurantCard from "./RestaurantCard";
import "./Tab1.css";

const Tab1 = ({ handleRestaurantClick, restaurantData }) => {
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
    "早餐",
    "mcdonalds",
    "宵夜",
    "滷味",
    "麥當勞",
    "麵線",
    "臭豆腐",
    "飲料",
    "kfc",
    "哈胖",
  ];

  const handleSearch = (term) => {
    setSearchTerm(term);
    setShowSuggestions(false);
    alert(`搜尋：${term}`);
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

  const filteredAndSortedRestaurants = useMemo(() => {
    let filtered = [...restaurantData];

    // 快速篩選 - 評分為4+
    if (filters.rating4Plus) {
      filtered = filtered.filter((res) => res.rating >= 4);
    }

    // 快速篩選 - 模範餐廳
    if (filters.superVendor) {
      filtered = filtered.filter((res) => res.isSuperVendor === true);
    }

    // 搜尋菜式
    if (filteredSearch) {
      filtered = filtered.filter((res) =>
        res.name.toLowerCase().includes(filteredSearch)
      );
    }

    // 篩選 - 價格
    if (filters.price) {
      const priceMapping = {
        $: (price) => price < 100,
        $$: (price) => price >= 100 && price < 300,
        $$$: (price) => price >= 300,
      };

      filtered = filtered.filter((res) =>
        res.categories.some((cat) =>
          cat.items.some((item) => priceMapping[filters.price](item.price))
        )
      );
    }

    console.log(filtered);

    // 篩選 - 類型 (小吃，鹹酥雞/雞排，台式)
    if (filters.type) {
      const types = filters.type; // 將類型以逗號分隔，並去除空格
      filtered = filtered.filter((res) => {
        const restaurantTypes = res.type.split("，").map((t) => t.trim()); // 餐廳的類型字串轉為陣列
        return restaurantTypes.some((type) => types.includes(type)); // 判斷是否有交集
      });
    }

    console.log(filtered);

    console.log(filtered);

    return filtered;
  }, [filters, filteredSearch, restaurantData]);

  return (
    <div
      className="food-delivery-page"
      style={{
        display: "flex",
        flexDirection: "row", // Ensure proper alignment
        width: "100%", // Allow it to stretch to the full width
        height: "100%", // Optional: Allow it to stretch vertically
        //flexGrow: 1, // Allow the children to grow within the flex layout
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
                className="bds-t1-radio-button bds-t1-radio-button--inline bds-t1-radio-button--align-items-start"
                id="sort_relevance-label"
              >
                <input
                  id="sort_relevance"
                  className="bds-t1-radio-button__input"
                  type="radio"
                  data-testid="sort_relevance"
                  name="sortOption"
                  checked={sortKey === "relevance"}
                  onChange={() => handleSortChange("relevance")}
                />
                <span className="bds-t1-radio-button__icon">
                  <span className="bds-t1-radio-button__icon-checked">
                    <span className="bds-t1-radio-button__icon-checked__inner"></span>
                  </span>
                  <span className="bds-t1-radio-button__icon-unchecked"></span>
                </span>
                <span className="bds-t1-radio-button__text sorting-filter__section__list-items__radio-button f-label-medium-font-size fw-label-medium-font-weight lh-label-medium-line-height ff-label-medium-font-family">
                  相關性
                </span>
              </label>
            </li>
            <li className="box-flex sorting-filter__section__list-items">
              <label
                className="bds-t1-radio-button bds-t1-radio-button--inline bds-t1-radio-button--align-items-start"
                id="delivery_time_asc-label"
              >
                <input
                  id="delivery_time_asc"
                  className="bds-t1-radio-button__input"
                  type="radio"
                  data-testid="delivery_time_asc"
                  name="sortOption"
                  checked={sortKey === "fastest"}
                  onChange={() => handleSortChange("fastest")}
                />
                <span className="bds-t1-radio-button__icon">
                  <span className="bds-t1-radio-button__icon-checked">
                    <span className="bds-t1-radio-button__icon-checked__inner"></span>
                  </span>
                  <span className="bds-t1-radio-button__icon-unchecked"></span>
                </span>
                <span className="bds-t1-radio-button__text sorting-filter__section__list-items__radio-button f-label-medium-font-size fw-label-medium-font-weight lh-label-medium-line-height ff-label-medium-font-family">
                  最快送達
                </span>
              </label>
            </li>
            <li className="box-flex sorting-filter__section__list-items">
              <label
                className="bds-t1-radio-button bds-t1-radio-button--inline bds-t1-radio-button--align-items-start"
                id="distance_asc-label"
              >
                <input
                  id="distance_asc"
                  className="bds-t1-radio-button__input"
                  type="radio"
                  data-testid="distance_asc"
                  name="sortOption"
                  checked={sortKey === "distance"}
                  onChange={() => handleSortChange("distance")}
                />
                <span className="bds-t1-radio-button__icon">
                  <span className="bds-t1-radio-button__icon-checked">
                    <span className="bds-t1-radio-button__icon-checked__inner"></span>
                  </span>
                  <span className="bds-t1-radio-button__icon-unchecked"></span>
                </span>
                <span className="bds-t1-radio-button__text sorting-filter__section__list-items__radio-button f-label-medium-font-size fw-label-medium-font-weight lh-label-medium-line-height ff-label-medium-font-family">
                  距離
                </span>
              </label>
            </li>
          </ul>
        </section>

        {/* 快速篩選 */}
        <section className="box-flex quick-filters" data-testid="quick-filters">
          <h4
            className="cl-neutral-primary f-label-medium-font-size fw-label-medium-font-weight lh-label-medium-line-height ff-label-medium-font-family sm:mb-xs md:mb-sm lg:mb-sm xl:mb-sm mb-xs"
            data-testid="quick-filters__section-heading"
          >
            快速篩選
          </h4>
          <ul className="box-flex quick-filters__section fw-wrap fd-row">
            <label htmlFor="rating" className="bds-t1-pill__label">
              <div
                className={`bds-t1-pill ${
                  filters.rating4Plus ? "bds-is-selected" : "bds-is-unselected"
                }`}
              >
                <input
                  id="rating"
                  className="bds-t1-pill__input"
                  type="checkbox"
                  data-testid="rating"
                  onClick={() =>
                    handleFilterChange("rating4Plus", !filters.rating4Plus)
                  }
                  checked={filters.rating4Plus || false}
                />
                <div className="bds-t1-pill__content bds-t1-pill__content--size-small">
                  評分為4+
                </div>
              </div>
            </label>
            <label htmlFor="is_super_vendor" className="bds-t1-pill__label">
              <div
                className={`bds-t1-pill ${
                  filters.superVendor ? "bds-is-selected" : "bds-is-unselected"
                }`}
              >
                <input
                  id="is_super_vendor"
                  className="bds-t1-pill__input"
                  type="checkbox"
                  data-testid="is_super_vendor"
                  onChange={(e) =>
                    handleFilterChange("superVendor", e.target.checked)
                  }
                  checked={filters.superVendor || false}
                />
                <div className="bds-t1-pill__content bds-t1-pill__content--size-small">
                  <span class="bds-t1-pill__leading-icon">
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
              折扣
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
        </section>

        {/* 菜式 */}
        <div className="filter-group">
          <h4>菜式</h4>
          <div className="bds-t1-search-input__search-control">
            <label
              className="bds-t1-search-input__label"
              htmlFor="search-input-cuisines-section"
            ></label>
            <span className="bds-t1-search-input__search-icon">
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
              className="bds-t1-search-input__field"
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

      <div className="pp" style={{display: "flex", flexDirection: "column", gap: "10px", marginLeft: "30px"}}>
        <div
          className="restaurants__tool-box-wrapper"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            borderRadius: "8px",
            width: "100%",
            height: "10%",
            padding: "15px",
            backgroundImage: `url("https://micro-assets.foodora.com/img/img-map-background.jpg")`,
            backgroundSize: "cover", // 背景圖案填滿區域
            backgroundPosition: "center", // 背景圖案居中
            gap: "20px", // gap 的值需要包含單位
            marginBottom: "20px",
          }}
        >
          {/* 地圖入口區域 */}
          <div
            className="map-and-input-box"
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              padding: "8px",
              gap: "10px",
            }}
          >
            <div
              className="cl-neutral-primary"
              style={{ fontSize: "16px", fontWeight: "bold" }}
            >
              探索附近的美食
            </div>
            <a
              href="#"
              style={{
                width: "100px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px 16px",
                backgroundColor: "#fff",
                borderRadius: "20px",
                textDecoration: "none",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // 添加按鈕陰影
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#333",
                  marginRight: "8px", // 與箭頭之間的間距
                }}
              >
                顯示地圖
              </span>
              <svg
                aria-hidden="true"
                focusable="false"
                class="fl-interaction-primary"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#ff3366"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.6032 4.39702L12.6874 4.46963L19.8828 11.6639C20.0386 11.8197 20.0391 12.0722 19.8839 12.2286L12.6382 19.5284C12.3464 19.8223 11.8716 19.8241 11.5776 19.5323C11.3103 19.267 11.2846 18.8505 11.5013 18.556L11.5736 18.4716L17.0818 12.9204C17.1207 12.8812 17.1205 12.8179 17.0813 12.779C17.0625 12.7604 17.0372 12.75 17.0108 12.75L4.75 12.75C4.33579 12.75 4 12.4142 4 12C4 11.5858 4.33579 11.25 4.75 11.25L17.1055 11.25C17.1607 11.25 17.2055 11.2052 17.2055 11.15C17.2055 11.1235 17.195 11.098 17.1762 11.0793L11.6268 5.53037C11.3605 5.26413 11.3363 4.84747 11.5541 4.55384L11.6267 4.46971C11.8929 4.20343 12.3096 4.17918 12.6032 4.39702Z"
                ></path>
              </svg>
            </a>
          </div>
        </div>
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
        <Grid
          container
          spacing={1}
          justifyContent="flex-start"
          minHeight={"450px"}
          padding={"30px"}
          style={{ flexGrow: 1 }}
        >
          {filteredAndSortedRestaurants.length === 0 ? (
            <Typography variant="h6" color="textSecondary">
              沒有找到符合條件的餐廳。
            </Typography>
          ) : (
            filteredAndSortedRestaurants.map(
              (filteredAndSortedRestaurants, index) => (
                <Grid item key={index} md={3}>
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
      </div>
    </div>
  );
};

export default Tab1;
