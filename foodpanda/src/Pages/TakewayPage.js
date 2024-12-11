import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./TakewayPage.css";
import HeaderLocation from "../components/HeaderLocation";

const TakewayPage = ({setlogin, setlogout, loginState,  user, setUser}) => {
  const [showDetails, setShowDetails] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const address = queryParams.get("address");
  const remarks = queryParams.get("remarks");
  const restaurant = queryParams.get("restaurant");
  const totalprice = queryParams.get("totalprice");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [showChatBox, setShowChatBox] = useState(false);
  const [isCancelScreen, setIsCancelScreen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const deliveryPersonName = "郝慧送";
  const orderId = "123";
  const [messages, setMessages] = useState([
    {
      sender: "${deliveryPersonName}",
      text: `您好！我是您的外送員 ${deliveryPersonName}，很高興為您服務！`,
    },
  ]);
  const [userInput, setUserInput] = useState("");

  const handleSendMessage = () => {
    if (userInput.trim() === "") return;

    // 添加用戶訊息
    const newMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(newMessages);

    // 模擬外送員回復
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "delivery",
          text: "喜歡你😘😁🫵🫶耶✌️記住你每個訊息🥸🫵✉️想照顧你🥰👩‍❤️‍💋‍👨欸🤟偷偷希望能成為😙😮😮你的唯一🫵🫵❤️1️⃣耶✌️默默地支持着你😤😤💪🫵❣️喜歡你😘😁🫵🫶耶✌️我是真的❤️❤️❤️❤️❤️❗❗❗我是真的無法控制我自己❤️❤️❤️❤️❤️ 每天想你甚至出現在夢裡😘😘 把對你的情緒🥺🥺 全部哼成旋律🤟🤟🤙🤙",
        },
      ]);
    }, 1000);

    setUserInput("");
  };

  const handleCancelOrder = () => {
    if (!cancelReason) {
      alert("请选择取消订单的原因！");
      return;
    }

    // 调用后端 API
    fetch("http://your-api-endpoint/cancel-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: orderId,
        reason: cancelReason,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("订单取消成功！");
          setShowChatBox(false);
        } else {
          alert("取消订单失败，请稍后再试！");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("网络错误，请稍后再试！");
      });
  };

  const handleChatClick = () => {
    setShowChatBox(true);
  };

  const handleCloseChatBox = () => {
    setShowChatBox(false);
  };

  useEffect(() => {
    // 获取当前时间并加上 40 分钟
    const now = new Date();
    // 设置 start 时间为当前时间 + 40 分钟
    const start = new Date(now.getTime() + 40 * 60 * 1000);
    // 设置 end 时间为 start 时间 + 40 分钟
    const end = new Date(start.getTime() + 30 * 60 * 1000);
    // 格式化日期和时间
    const optionsDate = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    };
    const optionsTime = { hour: "2-digit", minute: "2-digit" };
    const formattedDate = start.toLocaleDateString("zh-TW", optionsDate); // 日期格式化为中文
    const formattedTimeStart = start.toLocaleTimeString("zh-TW", optionsTime); // 格式化 start 时间
    const formattedTimeEnd = end.toLocaleTimeString("zh-TW", optionsTime); // 格式化 end 时间
    setPickupDate(formattedDate); // 设置日期
    setPickupTime(`${formattedTimeStart} – ${formattedTimeEnd}`); // 设置时间范围
  }, []);

  return (
    <div>
      <HeaderLocation setlogin={setlogin} setlogout={setlogout} loginState={loginState}  user={user} setUser={setUser}/>
      <div className="takeaway-page">
        {/* 左側主要內容 */}
        <div className="main-section">
          <div className="status-container">
            <div className="status-content">
              <div className="status-left">
                <h4 className="status-title">外帶自取時間</h4>
                <div className="pickup-details">
                  <div className="pickup-date">{pickupDate}</div>
                  <div className="pickup-time">{pickupTime}</div>
                </div>
                <div className="pickup-code">
                  <span className="pickup-code-label">外帶自取號碼：</span>
                  <span className="pickup-code-value">8189</span>
                </div>
                <p className="status-primary">
                  <span className="wave">
                    <span className="waveText">訂</span>
                    <span className="waveText">單</span>
                    <span className="waveText">正</span>
                    <span className="waveText">在</span>
                    <span className="waveText">準</span>
                    <span className="waveText">備</span>
                    <span className="waveText">中</span>
                    <span className="waveText">.</span>
                    <span className="waveText">.</span>
                    <span className="waveText">.</span>
                  </span>
                </p>
                <h6 className="status-secondary">
                  領取時請檢查餐點是否正確。如需協助可點擊「與我們聊聊」！
                  此單為外帶訂單，不適用於餐廳內用。
                </h6>
              </div>
              <div className="status-right">
                <img
                  src="https://images.deliveryhero.io/image/pd-otp-illustrations/v2/FP_TW/illu-preparing.gif"
                  alt="準備中"
                  className="status-image"
                />
              </div>
            </div>
          </div>

          {/* 訂單詳情 */}
          <div className="details-container">
            <h2 className="details-title">訂單詳情</h2>
            <div className="details-item">
              <img
                className="details-image"
                src="https://images.deliveryhero.io/image/fd-tw/LH/b5bm-listing.jpg?width=235&height=170"
                alt="Pasta Hut"
              />
              <div className="details-info">
                <p className="details-restaurant">{restaurant}</p>
                <p className="details-id">訂單編號: {orderId}</p>
                <div className="details-address">送餐地址: {address}</div>
                <div className="details-remarks">
                  外送備註: {remarks || "無備註"}
                </div>
              </div>
              <p className="details-price">$ {totalprice}</p>
            </div>
            <button
              onClick={() => setShowDetails((prev) => !prev)}
              className="details-toggle-button"
            >
              <span className="button-content">
                <span className="button-label">
                  {showDetails ? "顯示更少" : "查看細節"}
                </span>
                <span className="button-icon">
                  {showDetails ? (
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      className="icon-primary"
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
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      className="icon-primary"
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

        {/* 右側客服區域 */}
        <div className="support-section">
          <div className="support-container">
            <img
              src="https://images.deliveryhero.io/image/foodpanda/help-center/tw/help-center.png"
              alt="客服圖示"
              className="support-logo"
            />
            <div className="support-content">
              <h2 className="support-title">你的訂單需要協助嗎？</h2>
              <button className="support-button">
                <span className="button-text" onClick={handleChatClick}>
                  與我們聊聊
                </span>
              </button>
            </div>
          </div>
        </div>
        {/* 客服中心弹窗 */}
        {showChatBox && (
          <div className="chat-box">
            <div className="chat-header">
              <span>{isCancelScreen ? "取消訂單" : "客服中心"}</span>
              <button className="close-button" onClick={handleCloseChatBox}>
                ×
              </button>
            </div>
            <div className="chat-content">
              {/* 客服中心内容 */}
              {!isCancelScreen && (
                <>
                  <h2 className="order-title">{restaurant}</h2>
                  <p className="order-status">
                    <span className="waveorder">
                      <span className="waveorderText">訂</span>
                      <span className="waveorderText">單</span>
                      <span className="waveorderText">正</span>
                      <span className="waveorderText">在</span>
                      <span className="waveorderText">準</span>
                      <span className="waveorderText">備</span>
                      <span className="waveorderText">中</span>
                      <span className="waveorderText">.</span>
                      <span className="waveorderText">.</span>
                      <span className="waveorderText">.</span>
                    </span>
                  </p>
                  <div className="message-area">
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`message ${
                          msg.sender === "user"
                            ? "user-message"
                            : "delivery-message"
                        }`}
                      >
                        {msg.text}
                      </div>
                    ))}
                  </div>
                  <div className="message-input">
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="輸入訊息..."
                    />
                    <button onClick={handleSendMessage}>傳送</button>
                  </div>
                  <div className="delivery-info">
                    <p>
                      外送員 {deliveryPersonName}{" "}
                      正在前往您的位置，請留意手機來電或訊息。
                    </p>
                  </div>
                  <div className="chat-actions">
                    <button
                      className="cancel-button"
                      onClick={() => setIsCancelScreen(true)}
                    >
                      取消訂單
                    </button>
                  </div>
                </>
              )}

              {/* 取消订单内容 */}
              {isCancelScreen && (
                <>
                  <div className="cancel-order">
                    <h3 className="cancel-title">訂單號：{orderId}</h3>
                    <p className="cancel-instructions">
                      訂單可取消。若店家已接單或外送夥伴已取單，則無法退款給您。
                    </p>
                    <div className="cancel-reason-container">
                      <h3>請選擇取消訂單的原因：</h3>
                      <div className="cancel-reason-option">
                        <label htmlFor="reason1">無法更改訂單</label>
                        <input
                          type="radio"
                          id="reason1"
                          name="cancel-reason"
                          value="無法更改訂單"
                        />
                      </div>
                      <div className="cancel-reason-option">
                        <label htmlFor="reason2">不小心按到下單</label>
                        <input
                          type="radio"
                          id="reason2"
                          name="cancel-reason"
                          value="不小心按到下單"
                        />
                      </div>
                      <div className="cancel-reason-option">
                        <label htmlFor="reason3">重複下了訂單</label>
                        <input
                          type="radio"
                          id="reason3"
                          name="cancel-reason"
                          value="重複下了訂單"
                        />
                      </div>
                    </div>
                    <div className="cancel-actions">
                      <button
                        className="back-button"
                        onClick={() => setIsCancelScreen(false)}
                      >
                        返回
                      </button>
                      <button
                        className="confirm-cancel"
                        onClick={handleCancelOrder}
                      >
                        立即取消訂單
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TakewayPage;
