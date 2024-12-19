import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./PaymentPage.css";
import HeaderLocation from "../components/HeaderLocation";
import AddressDialog from "../components/AddressDialog";

const GOOGLE_MAPS_API_KEY = "AIzaSyAqqcudDyo4itlY1bqbDyByPh_L6GMy9cs";


const PaymentPage = ({ setlogin, setlogout, loginState, user, setUser }) => {
  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [deliveryFee, setDeliveryFee] = useState(35);
  const [contactless, setContactless] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [selectedTip, setSelectedTip] = useState(0);
  const [saveTip, setSaveTip] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [addressDialogOpen, setAddressDialogOpen] = useState(false); // 控制地址彈窗顯示
  const [currentAddress, setCurrentAddress] = useState(
    "33301 桃園市, 文化一路259號"
  );

  const [remarks, setRemarks] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // 接收的總金額
  const navigate = useNavigate();
  const location = useLocation();

  const handleRemarksChange = (e) => {
    setRemarks(e.target.value); // 更新输入框=内容
  };
  // 餐點價格及費用
  const [mealPrice, setMealPrice] = useState(65); // 預設餐點價格
  const platformFee = 60; // 平台費用
  const [restaurantaddress, setrestaurantaddress] = useState(null);


  const [latlng2, setLatlng1] = useState(null); // 儲存 currentAddress 經緯度
  const [latlng1, setLatlng2] = useState(null); // 儲存 restaurantAddress 經緯度


  const fetchCoordinates = async (address) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
      }
      return null;
    } catch (err) {
      console.error('Error fetching coordinates:', err.message);
      return null;
    }
  };

  useEffect(() => {
    const fetchAllCoordinates = async () => {
      if (currentAddress) {
        console.log(currentAddress)
        const coords1 = await fetchCoordinates(currentAddress);
        setLatlng1(coords1);
      }
      if (restaurantaddress) {
        console.log(restaurantaddress)

        const coords2 = await fetchCoordinates(restaurantaddress);
        setLatlng2(coords2);
      }
    };

    fetchAllCoordinates();
  }, [currentAddress, restaurantaddress]);

  useEffect(() => {
    console.log('Current Address Coordinates:', latlng1);
    console.log('Restaurant Address Coordinates:', latlng2);
  }, [latlng1, latlng2]);



  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await fetch(`http://localhost:5000/restaurant_address?restaurantName=${encodeURIComponent(restaurantName)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data)
        setrestaurantaddress(data.address);


      } catch (err) {
        console.log(err.message);
      }
    };

    if (restaurantName) {
      fetchAddress();
    }
  }, [currentAddress, restaurantName]);

  const [imgUrl, setImageurl] = useState('')
  const [deliveryType, setDeliveryType] = useState('')

  useEffect(() => {
    if (location.state) {
      // 从 location.state 中提取数据
      const { restaurant_name, total_price, items, address, remarks, deliveryType, imgUrl } =
        location.state;

      setRestaurantName(restaurant_name || "");
      setTotalPrice(total_price || 0);
      setCart(items || []);
      setCurrentAddress(address || "33301 桃園市, 文化一路259號");
      setRemarks(remarks || "");
      setImageurl(imgUrl || "");
      setDeliveryType(deliveryType || "");

      if (total_price > 149) {
        setDeliveryFee(0); // 外送服務費為 0
      }
    } else {
      // 从查询字符串中提取数据（如果未使用 state）
      const queryParams = new URLSearchParams(location.search);
      const restaurant = queryParams.get("restaurant");
      const total = queryParams.get("totalprice");

      setRestaurantName(restaurant || "");
      setTotalPrice(total ? parseFloat(total) : 0);
      if (parseFloat(total) > 149) {
        setDeliveryFee(0); // 外送服務費為 0
      }
    }
  }, [location]);

  // 外送選項處理邏輯
  useEffect(() => {
    if (totalPrice <= 149) {
      // 如果餐點價格小於等於 149，則按外送選項計算服務費
      if (deliveryOption === "priority") {
        setDeliveryFee(35 + 29); // 優先專送
      } else {
        setDeliveryFee(35); // 標準方案
      }
    }
  }, [deliveryOption, totalPrice]);

  // 計算總費用
  const calculateTotal = () => {
    console.log(cart)
    const subtotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const total = subtotal + deliveryFee + platformFee + selectedTip; // 總計
    return { subtotal, total };
  };

  const { subtotal, total } = calculateTotal(); // 計算價格

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleApply = () => {
    console.log(`統一編號: ${inputValue} 使用成功`);
  };

  const handlePayment = async () => {
    try {
      const response = await fetch('http://localhost:5000/setHistory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({

          address: currentAddress,
          remarks: remarks,
          restaurant: restaurantName,
          totalprice: total,
          user_id: user.id,
          cart: cart
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Order created successfully:', data);
        // Navigate to the delivery page with query parameters
        const orderDetails = {
          total_price: parseFloat(totalPrice), // 總金額
          restaurant_name: restaurantName, // 店家名稱
          items: cart.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })), // 訂單的產品列表
        };

        // 打印或传递订单内容
        console.log("Order Details:", orderDetails);

        const query = new URLSearchParams({
          address: currentAddress,
          remarks: remarks,
          restaurant: restaurantName,
          totalprice: total,
          lat1: latlng1.lat,
          lng1: latlng1.lng,
          lat2: latlng2.lat,
          lng2: latlng2.lng,
          restaurantaddress: restaurantaddress,
        }).toString();
        navigate(`/delivery?${query}`, {
          state: { ...orderDetails, imgUrl, deliveryType },
        });
      } else {
        const errorData = await response.json();
        console.error('Error creating order:', errorData);
      }
    } catch (error) {
      console.error('Error during payment handling:', error);
    }
  };


  const handleAddressChange = (newAddress) => {
    setCurrentAddress(newAddress);
    setAddressDialogOpen(false);
  };

  return (
    <div>
      <HeaderLocation
        setlogin={setlogin}
        setlogout={setlogout}
        loginState={loginState}
        user={user}
        setUser={setUser}
      />
      <div className="payment-page">
        <div className="main">
          {/* Left Section */}
          <div className="left-section">
            {/* Delivery Address Section */}{deliveryType === '外送' ? (
              <section
                className="card delivery-address bg-white"
                data-testid="delivery-details"
              >
                <h4
                  class="address-header box-flex ai-center jc-space-between"
                  id="checkout-delivery-information-address"
                ><h2 class="delivery-title">送餐地址</h2>
                  <button
                    class="btn-change-address"
                    data-testid="checkout-button-link"
                    onClick={() => setAddressDialogOpen(true)}
                  >
                    更改
                  </button>
                </h4>
                <div className="address-info">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    class="fl-interaction-secondary"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.3224 2C16.9186 2 20.6446 5.72596 20.6446 10.3222C20.6446 11.8203 20.2487 13.226 19.5559 14.4404L18.4715 15.8911C17.8726 16.5162 16.6838 17.706 14.9052 19.4602L13.0213 21.313C12.6322 21.6947 12.0092 21.6946 11.6203 21.3128L7.91833 17.6571L6.59648 16.3282C6.2846 16.0104 5.78156 15.3801 5.08734 14.4375C4.3955 13.2238 4.00024 11.8192 4.00024 10.3222C4.00024 5.72596 7.72621 2 12.3224 2ZM12.3224 3.5C8.55463 3.5 5.50024 6.55439 5.50024 10.3222C5.50024 11.4141 5.75604 12.466 6.23886 13.4136L6.37241 13.66L6.96356 14.5436L7.18196 14.7804L7.77128 15.385C8.23371 15.8535 8.88147 16.5011 9.70239 17.3151C10.6866 18.2861 11.4247 19.0143 11.9168 19.4998C11.9577 19.5401 11.9986 19.5805 12.0395 19.6209C12.1953 19.7745 12.4456 19.7745 12.6013 19.6209L12.6754 19.5478L15.3017 16.9571L17.2047 15.0461C17.3404 14.9068 17.4503 14.7925 17.5337 14.7039L17.6874 14.534L18.2724 13.659L18.4049 13.4158C18.84 12.5624 19.0911 11.6245 19.1369 10.6487L19.1446 10.3222C19.1446 6.55439 16.0902 3.5 12.3224 3.5ZM12.3224 6.75C14.3935 6.75 16.0724 8.42893 16.0724 10.5C16.0724 12.5711 14.3935 14.25 12.3224 14.25C10.2513 14.25 8.57241 12.5711 8.57241 10.5C8.57241 8.42893 10.2513 6.75 12.3224 6.75ZM12.3224 8.25C11.0798 8.25 10.0724 9.25736 10.0724 10.5C10.0724 11.7426 11.0798 12.75 12.3224 12.75C13.5651 12.75 14.5724 11.7426 14.5724 10.5C14.5724 9.25736 13.5651 8.25 12.3224 8.25Z"
                    ></path>
                  </svg>
                  <p>{currentAddress}</p>
                </div>
                <textarea
                  className="remarks-input"
                  id="delivery_instructions"
                  name="delivery_instructions"
                  placeholder="外送備註：請放置社區管理室謝謝"
                  maxLength={300}
                  value={remarks} // 绑定输入框内容到 state
                  onChange={handleRemarksChange} // 更新输入框内容
                ></textarea>
                <label className="toggle-option">
                  <span>送達時優先傳訊息：如未回覆外送夥伴將致電</span>
                  <input
                    type="checkbox"
                    checked={contactless}
                    onChange={() => setContactless(!contactless)}
                  />
                  <div
                    className={`toggle-switch ${contactless ? "checked" : ""}`}
                  >
                    <div className="toggle-button"></div>
                  </div>
                </label>
              </section>) : (<div className="card lbb" >
                <h2 class="delivery-title">外送自取地址</h2>
                <h4 class="delivery-lbb" style={{ fontSize: "14px", }}>{restaurantaddress}</h4>
              </div>)}
            {/* 外送選項 */}
            <section className="card delivery-options">
              <h2>外送選項</h2>
              <div
                className={`option ${deliveryOption === "standard" ? "selected" : ""
                  }`}
                onClick={() => setDeliveryOption("standard")}
              >
                <label>
                  <input
                    type="radio"
                    name="delivery"
                    value="standard"
                    checked={deliveryOption === "standard"}
                    onChange={() => setDeliveryOption("standard")}
                  />
                  標準 約 50 - 70 mins
                </label>
              </div>
              <div
                className={`option ${deliveryOption === "priority" ? "selected" : ""
                  }`}
                onClick={() => setDeliveryOption("priority")}
              >
                <label className="delivery-option">
                  <input
                    type="radio"
                    name="delivery"
                    value="priority"
                    checked={deliveryOption === "priority"}
                    onChange={() => setDeliveryOption("priority")}
                  />
                  優先專送 約 20 - 35 mins
                  <span className="delivery-price">+ $29</span>
                </label>
              </div>
            </section>

            <div className="card sbb-input">
              {/* 個人資料 */}
              <h2>個人資料</h2>
              <div className="sbbANDlbb">
                <input
                  type="email"
                  placeholder="n930827@gmail.com"
                  className="email-input"
                  disabled
                /></div>
            </div>
            {/* 支付方式 */}
            <aside className="card payment-method">
              <h2 className="payment-title">付款方式</h2>
              <div className="payment-option">
                <label className="payment-option-label">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={() => setPaymentMethod("cash")}
                  />
                  <img
                    src="https://images.deliveryhero.io/image/foodpanda/payment_icons/payment_method/ic-payments-payment_on_delivery-xs.png"
                    alt="現金付款"
                    width="40"
                  />
                  <span>現金付款</span>
                </label>
                <p className="payment-note">
                  請考慮使用電子付款方式代替現金，減少直接接觸及保障健康安全。
                </p>
                <img
                  class="cobranded-banner-clickable-img"
                  src="https://images.deliveryhero.io/image/foodpanda/pandapay/tw/ctbc/ctbc_promo_banner.png"
                  alt="Promotion banner"
                ></img>
              </div>
            </aside>
            {/* 新增外送夥伴小費部分 */}
            <section className="card rider-tip">
              <h3>提供外送夥伴小費</h3>
              <p>外送夥伴可獲得全額小費</p>
              <div className="tip-options">
                <button
                  className={`tip-option ${selectedTip === 0 ? "selected" : ""
                    }`}
                  onClick={() => setSelectedTip(0)}
                >
                  下次再說
                </button>
                {[15, 30, 50, 100].map((amount) => (
                  <button
                    key={amount}
                    className={`tip-option ${selectedTip === amount ? "selected" : ""
                      }`}
                    onClick={() => setSelectedTip(amount)}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
              <label className="save-tip">
                <input
                  type="checkbox"
                  checked={saveTip}
                  onChange={() => setSaveTip(!saveTip)}
                />
                <span class="checkbox-icon">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    class="bds-c-checkbox__icon-checked-icon"
                    fill="white"
                    width="10"
                    height="8"
                    viewBox="0 0 10 8"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.72365 0.501836C9.01563 0.208942 9.48904 0.208942 9.78103 0.501836C10.0464 0.7681 10.0706 1.18477 9.8534 1.47838L9.78103 1.5625L3.64486 7.71783L0.218985 4.28125C-0.0729951 3.98835 -0.0729951 3.51348 0.218985 3.22059C0.484423 2.95432 0.899787 2.93011 1.19248 3.14797L1.27634 3.22059L3.64473 5.59579L8.72365 0.501836Z"></path>
                  </svg>
                </span>
                設為常用小費金額
              </label>
            </section>
            {/* 統一編號 */}
            <div className="unified-number-section">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <span class="checkbox-icon">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    class="bds-c-checkbox__icon-checked-icon"
                    fill="white"
                    width="10"
                    height="8"
                    viewBox="0 0 10 8"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.72365 0.501836C9.01563 0.208942 9.48904 0.208942 9.78103 0.501836C10.0464 0.7681 10.0706 1.18477 9.8534 1.47838L9.78103 1.5625L3.64486 7.71783L0.218985 4.28125C-0.0729951 3.98835 -0.0729951 3.51348 0.218985 3.22059C0.484423 2.95432 0.899787 2.93011 1.19248 3.14797L1.27634 3.22059L3.64473 5.59579L8.72365 0.501836Z"></path>
                  </svg>
                </span>
                增加統一編號
              </label>
              {isChecked && (
                <div className="input-container">
                  <div
                    className={`input-wrapper ${inputValue ? "has-value" : ""}`}
                  >
                    <label
                      htmlFor="unified-number"
                      className={`input-label ${inputValue ? "active" : ""}`}
                    >
                      統一編號
                    </label>
                    <input
                      id="unified-number"
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange}
                      className="unified-number-input"
                      placeholder=""
                    />
                  </div>
                  <button
                    onClick={handleApply}
                    className={`apply-button ${inputValue ? "active" : ""}`}
                    disabled={!inputValue}
                  >
                    使用
                  </button>
                </div>
              )}
            </div>

            <div className="payment-confirmation">
              <button
                className="confirm-button"
                onClick={handlePayment}
                data-testid="pay-button"
              >
                完成並付款
              </button>
              <div className="terms-and-conditions">
                <div className="terms">
                  你下訂單的同時，即自動同意
                  <a>本條款規則</a>
                </div>
                <div className="note">
                  我同意並要求在取消訂單期限未滿前進行送餐，注意：完成此選項後將無法取消。
                </div>
              </div>
            </div>
          </div>
          {/* Right Section */}
          <div className="right-section">
            {/* 訂單摘要 */}
            <section className="card order-summary">
              <h2>您的訂單</h2>
              <p1>{restaurantName}</p1>
              <ul className="order-items">
                {cart.map((item, index) => (
                  <li key={index}>
                    {item.quantity} x {item.name} - $
                    {item.price * item.quantity}
                  </li>
                ))}
              </ul>
              <div className="order-costs">
                <p>小計: ${subtotal.toFixed(2)}</p>
                <p>外送服務費: ${deliveryFee}</p>
                <p>平台費: ${platformFee}</p>
                <p>外送夥伴小費: ${selectedTip}</p>
              </div>
              <h3 className="order-total">總計: ${total.toFixed(2)}</h3>
            </section>
          </div>
        </div>
      </div>
      <AddressDialog
        open={addressDialogOpen}
        onClose={() => setAddressDialogOpen(false)}
        onSubmit={handleAddressChange}
        defaultAddress={currentAddress}
      />
    </div>
  );
};

export default PaymentPage;
