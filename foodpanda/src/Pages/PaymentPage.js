import React, { useState, useEffect } from "react";
import "./PaymentPage.css";
import HeaderLocation from "../components/HeaderLocation";
import AddressDialog from "../components/AddressDialog";

const PaymentPage = ({ setlogin, setlogout }) => {
  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [deliveryFee, setDeliveryFee] = useState(35);
  const [contactless, setContactless] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [selectedTip, setSelectedTip] = useState(0);
  const [saveTip, setSaveTip] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [addressDialogOpen, setAddressDialogOpen] = useState(false); // 控制地址彈窗顯示
  const [currentAddress, setCurrentAddress] = useState("");

  // 餐點價格及費用
  const [mealPrice, setMealPrice] = useState(65); // 預設餐點價格
  const platformFee = 60; // 平台費用

  // 外送選項處理邏輯
  useEffect(() => {
    if (deliveryOption === "priority") {
      setDeliveryFee(35 + 29); // 優先專送
    } else {
      setDeliveryFee(35); // 標準方案
    }
  }, [deliveryOption]);

  // 計算總費用
  const calculateTotal = () => {
    const subtotal = mealPrice; // 小計為餐點價格
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
    alert(`統一編號: ${inputValue} 使用成功`);
  };

  const handlePayment = () => {
    alert("完成並付款");
  };

  const handleAddressChange = (newAddress) => {
    setCurrentAddress(newAddress);
    setAddressDialogOpen(false);
  };

  return (
    <div>
      <HeaderLocation setlogin={setlogin} setlogout={setlogout} />
      <div className="payment-page">
        <div className="main">
          {/* Left Section */}
          <div className="left-section">
            {/* Delivery Address Section */}
            <section
              className="card delivery-address bg-white"
              data-testid="delivery-details"
            >
              <h4
                class="address-header box-flex ai-center jc-space-between"
                id="checkout-delivery-information-address"
              >
                <h2 class="delivery-title">送餐地址</h2>
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
            </section>

            {/* 外送選項 */}
            <section className="card delivery-options">
              <h2>外送選項</h2>
              <div
                className={`option ${
                  deliveryOption === "standard" ? "selected" : ""
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
                className={`option ${
                  deliveryOption === "priority" ? "selected" : ""
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

            <div className="right-section">
              {/* 個人資料 */}
              <section className="card personal-info">
                <h2>個人資料</h2>
                <input
                  type="email"
                  placeholder="n930827@gmail.com"
                  className="email-input"
                  disabled
                />
              </section>
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
                  className={`tip-option ${
                    selectedTip === 0 ? "selected" : ""
                  }`}
                  onClick={() => setSelectedTip(0)}
                >
                  下次再說
                </button>
                {[15, 30, 50, 100].map((amount) => (
                  <button
                    key={amount}
                    className={`tip-option ${
                      selectedTip === amount ? "selected" : ""
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
              <p1>老王炸烤 (桃園龜山店)</p1>
              <ul className="order-items">
                <li>1 x 餐點: ${mealPrice}</li>
              </ul>
              <div className="order-costs">
                <p>小計: ${subtotal}</p>
                <p>外送服務費: ${deliveryFee}</p>
                <p>平台費: ${platformFee}</p>
                <p>外送夥伴小費: ${selectedTip}</p>
              </div>
              <h3 className="order-total">${total}</h3>
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
