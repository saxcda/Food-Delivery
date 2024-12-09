import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./DeliveryPage.css";
import HeaderLocation from "../components/HeaderLocation";

const DeliveryPage = ({ setlogin, setlogout }) => {
  const [timeLeft, setTimeLeft] = useState(30); // 倒數計時初始值
  const [progress, setProgress] = useState(0);
  const [orderStatus, setOrderStatus] = useState("訂單正在準備中...");
  const [showDetails, setShowDetails] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const address = queryParams.get("address");
  const remarks = queryParams.get("remarks");
  const restaurant = queryParams.get("restaurant");

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
        setProgress((prevProgress) => prevProgress + 3.33); // 每秒進度條增加
      }, 1000);

      return () => clearInterval(timer);
    } else {
      // 當倒數結束時，更新訂單狀態
      setOrderStatus("訂單完成");
    }
  }, [timeLeft]);


  return (
    <div>
      <HeaderLocation />
      <div className="delivery-page">
        {/* 左邊主要內容 */}
        <div className="left-section">
          {/* 預估外送時間 */}
          <div className="order-status-container">
            <div className="order-status-content">
              <div className="left-content">
                <h4 className="order-status-title">預估外送時間</h4>
                <div className="order-estimate-time">
                  <span className="time-highlight">{timeLeft}</span> 秒
                </div>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="order-status-primary">{orderStatus}</p>
                <h6 className="order-status-secondary">
                  請記得開啟手機通知，才能收到訂單最新進度喔！如需協助可點擊「與我們聊聊」。
                </h6>
              </div>
              <div className="right-content">
                <img
                  src="https://images.deliveryhero.io/image/pd-otp-illustrations/v2/FP_TW/illu-preparing.gif"
                  alt="準備中"
                  className="order-status-image"
                />
              </div>
            </div>
          </div>

          {/* 訂單詳情 */}
          <div className="order-details-container">
            <h2 className="order-cart-title">訂單詳情</h2>
            <div className="order-item">
              <img
                className="order-image"
                src="https://images.deliveryhero.io/image/fd-tw/LH/b5bm-listing.jpg?width=235&height=170"
                alt="Pasta Hut"
              />
              <div className="order-info">
                <p className="order-name">{restaurant}</p>
                <p className="order-id">訂單編號 #pn3u-2439-4yd8</p>
                <div className="deliveryAddress">
                  送餐地址: {address}
                </div>
                <div className="reMark">外送備註: {remarks || "無備註"}</div>
              </div>
              <p className="order-price">$ 221</p>
            </div>
            <button
              onClick={() => setShowDetails((prev) => !prev)}
              className="toggle-cuisines-button"
            >
              <span className="bds-c-btn__idle-content">
                <span className="bds-c-btn__idle-content__label">
                  {showDetails ? "顯示更少" : "查看細節"}
                </span>
                <span className="bds-c-btn__idle-content__suffix">
                  {showDetails ? (
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
                        fillRule="evenodd"
                        clipRule="evenodd"
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
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.5303 9.26347C18.7966 9.52971 18.8208 9.94638 18.603 10.24L18.5304 10.3241L12.3286 16.5269C12.1728 16.6827 11.9204 16.6832 11.764 16.528L5.47165 10.2823C5.17767 9.9905 5.1759 9.51563 5.4677 9.22165C5.73297 8.95439 6.14955 8.92864 6.44397 9.1454L6.52835 9.2177L11.7602 14.4093C11.9165 14.5645 12.169 14.564 12.3248 14.4083L17.4696 9.26356C17.7359 8.99727 18.1525 8.97303 18.4462 9.19086L18.5303 9.26347Z"
                      ></path>
                    </svg>
                  )}
                </span>
              </span>
            </button>
          </div>
        </div>

        {/* 右邊客服區域 */}
        <div className="right-section2">
          <div className="customer-support">
            <img
              src="https://images.deliveryhero.io/image/foodpanda/help-center/tw/help-center.png"
              alt="客服圖示"
              className="customer-support-logo"
            />
            <div className="customer-support-content">
              <h2 className="customer-support-title">你的訂單需要協助嗎？</h2>
              <div className="hello">
                <button className="chat-button">
                  <span className="chat-button__content">與我們聊聊</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;
