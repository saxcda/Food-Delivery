import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./DeliveryPage.css";
import HeaderLocation from "../components/HeaderLocation";
import GoogleMapAnimation from "../components/GoogleMapAnimation";

const DeliveryPage = ({ setlogin, setlogout, loginState, user, setUser }) => {
  const [timeLeft, setTimeLeft] = useState(60); // 倒數計時初始值
  const [progress, setProgress] = useState(0);
  const [orderStatus, setOrderStatus] = useState("訂單正在準備中...");
  const [showDetails, setShowDetails] = useState(false);
  const location = useLocation();
  const [cart, setCart] = useState(null)


  const queryParams = new URLSearchParams(location.search);
  const address = queryParams.get("address");
  const remarks = queryParams.get("remarks");
  const restaurant = queryParams.get("restaurant");
  const totalprice = queryParams.get("totalprice");
  const lat1 = queryParams.get("lat1");
  const lng1 = queryParams.get("lng1");
  const lat2 = queryParams.get("lat2");
  const lng2 = queryParams.get("lng2");
  console.log(cart)
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

  useEffect(() => {
    if (location.state) {
      // 从 location.state 中提取数据
      const { restaurant_name, total_price, items, address, remarks } =
        location.state;
      setCart(items || []);
      
    }
  }, [location]);

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
          text: "有位帥哥開著一輛敞篷的賓士😎😎一手握著方向盤還一手拿沙士🍺🍺又飛過一輛閃閃發亮的ＢＭＷ🥺🥺我卻站在人行道上飲豆奶😭😭每個人的心中都有一輛夢幻車😍😍不要跟我說她只是代步的工具🙄🙄引擎發動之後就要人車一體😎😎🤟🤟趕快踩下油門帶我貼地飛行🛩🛩轟隆隆隆🤣🤣隆隆隆隆衝衝衝衝😏😏😏拉風😎😎😎引擎發動🔑🔑🔑引擎發動+🚗+👉+🚗一瞬間踩下油門🚗💨💨催乎盡磅(台)😤😤乘風💨衝🤣衝🤣讓窗外的📢📢風 💨💨 吹動每一個毛孔👩🦲🧔 我是今夜🌙🌙 最😎 稀有的品種🤓🤓 讓😯 看到的人以為是夢😱😱 還沒醒來😴😴 就已經無影無蹤👻👻 風 💨💨 敲醒每一個面孔😲😲 我是明天🤙🤙 被 贊嘆的驚悚😵😵 讓😨😨 看到的人全部感動😭😭 0⃣到💯K only 4⃣秒鐘😏😏紅燈停 綠燈行🚥🚥 看到行人要當心🚶♀🚶♀ 快車道 慢車道😈😈 平安回家才是王道 💪💪 開車🚗🚗不是騎車🏍🏍不怕沒戴安全帽👲👲只怕警察👮♂👮♂BI BI BI 叫我路邊靠 😩😩 BI BI BI BI BI 大燈忘了開😏😏 BI BI BI BI BI 駕照沒有帶 🤫🤫 BI BI BI BI BI 偷偷講電話😎😎 BI BI BI BI BI 沒繫安全帶 😬😬 我的夢幻車子🚗🚗就是最辣🌶🌶的美女👸👸 有她陪伴😏😏哪怕車上只有收音機 📻📻 我就像隻野狼🐺🐺身上披著羊🐑🐑的皮 我的心情🤪🤪好比開著一架戰鬥機🛩🛩轟隆隆隆🤣🤣隆隆隆隆衝衝衝衝😏😏😏拉風😎😎😎引擎發動🔑🔑🔑引擎發動+🚗+👉+🚗一瞬間踩下油門🏎💨💨催乎盡磅(台)😤😤乘風💨衝🤣衝🤣讓窗外的📢📢風 💨💨 吹動每一個毛孔👩🦲🧔 我是今夜🌙🌙 最😎 稀有的品種🤓🤓 讓😯 看到的人以為是夢😱😱 還沒醒來😴😴 就已經無影無蹤👻👻 風 💨💨 敲醒每一個面孔😲😲 我是明天🤙🤙 被 贊嘆的驚悚😵😵 讓😨😨 看到的人全部感動😭😭 0⃣到💯K only 4⃣秒鐘😏😏",
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
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
        setProgress((prevProgress) => prevProgress + 0.8); // 每秒進度條增加
      }, 1000);

      return () => clearInterval(timer);
    } else {
      // 當倒數結束時，更新訂單狀態
      setOrderStatus("訂單完成");
    }
  }, [timeLeft]);

  return (
    <div>
      <HeaderLocation setlogin={setlogin} setlogout={setlogout} loginState={loginState} user={user} setUser={setUser} />
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
          <GoogleMapAnimation startLat={lat1} startLng={lng1} endLat={lat2} endLng={lng2} duration={60} />

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
                <div className="deliveryAddress">送餐地址: {address}</div>
                <div className="reMark">外送備註: {remarks || "無備註"}</div>
              </div>
              <p className="order-price">$ {totalprice}</p>
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
                <button className="chat-button" onClick={handleChatClick}>
                  <span className="chat-button__content">與我們聊聊</span>
                </button>
              </div>
            </div>
          </div>
        </div>
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
                        className={`message ${msg.sender === "user"
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
                      取消订单
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

export default DeliveryPage;
