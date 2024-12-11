import React, { useState, useEffect } from "react";
import "./Register.css";
import icHide from "../assets/icons/ic-hide.svg";
import icShow from "../assets/icons/ic-show.svg";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);
  // 成功註冊 navigate("/");
  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
    else {
      console.log('no email')
    }
  }, [searchParams]);

  // 判斷密碼強度
  const passwordStrength = () => {
    console.log("計算密碼強度");
    const conditions = [
      password.length >= 8, // 至少8個字
      /[a-z]/.test(password), // 至少包含一個小寫字母
      /[0-9]/.test(password), // 至少包含一個數字
      /[!@#$%^&*(),.?":{}|<>]/.test(password), // 至少包含一個特殊符號
    ];

    const matchedConditions = conditions.filter(Boolean).length;

    if (matchedConditions >= 4) return { level: "強", color: "green" };
    if (matchedConditions === 3) return { level: "中等", color: "orange" };
    return { level: "弱", color: "red" };
  };
  const strength = password ? passwordStrength() : null;

  const isFormValid =
    firstName.trim() &&
    lastName.trim() &&
    password.trim() &&
    (!showPasswordField || (strength && strength.level !== "弱"));

  const handleCheckboxChange = (e) => {
    setShowPasswordField(e.target.checked);
    if (!e.target.checked) setPassword(""); // 清空密碼輸入框
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const registerAccount = async () => {
    try {
      const fullName = `${firstName} ${lastName}`;
      const response = await axios.post("http://localhost:5000/api/register_account", {
        email,
        fullName,
        password,
      });
      if (response.status === 200) {
        alert("註冊成功！");
        navigate("/"); // 成功後跳轉到首頁或其他頁面
      } else {
        alert(response.data.error || "註冊失敗，請稍後再試！");
      }
    } catch (error) {
      console.error("註冊時發生錯誤：", error.response?.data || error.message);
      alert("註冊失敗，請稍後再試！");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="registerSvg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="76"
            height="60"
            data-testid="icon-create-default"
          >
            <g fill="none" fill-rule="evenodd">
              <path
                fill="#FBE7EF"
                d="M75.696 28.442C77.522 15.132 60.176 3.077 49.08.847 38.054-1.383 20.393.045 8.63 14.295-3.166 28.513-1.061 46.838 4.276 52.063c5.337 5.225 10.67 5.15 18.927.244 8.25-4.913 21.417-6.9 36.69-7.91 15.312-.975 15.803-15.955 15.803-15.955"
              ></path>
              <path
                fill="#D70F64"
                d="M50.6 59.479H23.671c-2.247 0-4.069-1.808-4.069-4.037V4.616c0-2.23 1.822-4.038 4.07-4.038h26.926c2.247 0 4.069 1.808 4.069 4.038v50.826c0 2.23-1.822 4.037-4.069 4.037"
              ></path>
              <path
                fill="#5D93CF"
                d="M51.856 59.479H24.929c-2.247 0-4.069-1.808-4.069-4.037V4.616c0-2.23 1.822-4.038 4.069-4.038h26.927c2.247 0 4.069 1.808 4.069 4.038v50.826c0 2.23-1.822 4.037-4.07 4.037"
              ></path>
              <path
                fill="#FFF"
                d="M51.677 52.123H24.562c-.585 0-1.06-.471-1.06-1.052V7.968c0-.58.475-1.052 1.06-1.052h27.115c.585 0 1.06.471 1.06 1.052v43.103c0 .58-.475 1.052-1.06 1.052"
              ></path>
              <path
                fill="#BED3EB"
                d="M34.563 56.295h6.878v-1.063h-6.878zM36.861 4.513h6.878V3.449h-6.878zM35.262 4.038c0 .37-.302.67-.675.67a.673.673 0 01-.675-.67c0-.37.302-.67.675-.67.373 0 .675.3.675.67"
              ></path>
              <path
                fill="#93B7DF"
                d="M46.7 27.648c0 4.679-3.822 8.472-8.537 8.472-4.716 0-8.538-3.793-8.538-8.472 0-4.678 3.822-8.47 8.538-8.47 4.715 0 8.537 3.792 8.537 8.47"
              ></path>
              <path
                fill="#5D93CF"
                d="M40.511 24.343a2.34 2.34 0 01-2.348 2.33 2.34 2.34 0 01-2.349-2.33 2.34 2.34 0 012.349-2.33 2.34 2.34 0 012.348 2.33m1.584 8.942H34.23V31.09c0-2.155 1.76-3.902 3.933-3.902 2.171 0 3.932 1.747 3.932 3.902v2.195z"
              ></path>
              <path
                fill="#D70F64"
                d="M38.163 38.642a2.532 2.532 0 01-2.543-2.522 2.532 2.532 0 012.543-2.523 2.532 2.532 0 012.542 2.523 2.532 2.532 0 01-2.542 2.522z"
              ></path>
              <path
                fill="#FFF"
                d="M36.808 35.811h1.043v-1.035h.623v1.035h1.043v.618h-1.043v1.034h-.623v-1.034h-1.043z"
              ></path>
            </g>
          </svg>
        </div>
        <div className="registerTittle">
          <p className="start">讓我們開始吧！</p>
          <p className="first">
            首先，用{email}建立你的 foodpanda 帳號。
          </p>
        </div>
        <div className="input-container">
          <div className="floating-input">
            <input
              type="text"
              id="lastName"
              placeholder=" "
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor="lastName">姓</label>
          </div>
          <div className="floating-input">
            <input
              type="text"
              id="firstName"
              placeholder=" "
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="firstName">名</label>
          </div>
        </div>

        {showPasswordField ? (
          <div className="password-input-container">
            <div className="floating-password">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password">密碼</label>
              <img
                src={showPassword ? icHide : icShow}
                alt={showPassword ? "隱藏密碼" : "顯示密碼"}
                className="password-toggle"
                onClick={togglePasswordVisibility}
              />
            </div>
            {password && (
              <div className="password-strength">
                <div
                  className="reg-strength"
                  style={{ color: strength?.color }}
                >
                  密碼強度: {strength?.level || "弱"}
                </div>
                <div className="strength-meter">
                  <div
                    className="strength-bar"
                    style={{
                      width: `${
                        strength?.level === "強"
                          ? 100
                          : strength?.level === "中等"
                          ? 75
                          : 25
                      }%`,
                      backgroundColor: strength?.color || "red",
                    }}
                  ></div>
                </div>
                <ul className="password-requirements">
                  <div className="reg1-strength">密碼必須包含:</div>
                  <li style={{ color: password.length >= 8 ? "green" : "red" }}>
                    {password.length >= 8 ? "✓" : "✕"} 至少需要8個字
                  </li>
                  <li
                    style={{ color: /[a-z]/.test(password) ? "green" : "red" }}
                  >
                    {/[a-z]/.test(password) ? "✓" : "✕"} 至少需要一個小寫字母
                    (a-z)
                  </li>
                  <li
                    style={{ color: /[0-9]/.test(password) ? "green" : "red" }}
                  >
                    {/[0-9]/.test(password) ? "✓" : "✕"} 至少需要一個數字 (0-9)
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="password-info">
            <div className="infoText">
              <svg
                aria-hidden="true"
                focusable="false"
                class="fl-none"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.64898 14.429L5.45289 11.0031C5.23872 10.8283 4.92305 10.8598 4.74783 11.0735L4.11327 11.8474C3.93804 12.0611 3.96961 12.3761 4.18378 12.5509L9.67845 17.037C9.88596 17.2064 10.1903 17.1828 10.3691 16.9834L18.8724 7.5001C19.0569 7.29432 19.0393 6.97825 18.833 6.79413L18.0863 6.12738C17.88 5.94326 17.5633 5.96082 17.3788 6.1666L9.99432 14.4022C9.90493 14.5019 9.75273 14.5137 9.64898 14.429Z"></path>
              </svg>
              無需記得你的密碼
            </div>
            <div className="infoText">
              <svg
                aria-hidden="true"
                focusable="false"
                class="fl-none"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.64898 14.429L5.45289 11.0031C5.23872 10.8283 4.92305 10.8598 4.74783 11.0735L4.11327 11.8474C3.93804 12.0611 3.96961 12.3761 4.18378 12.5509L9.67845 17.037C9.88596 17.2064 10.1903 17.1828 10.3691 16.9834L18.8724 7.5001C19.0569 7.29432 19.0393 6.97825 18.833 6.79413L18.0863 6.12738C17.88 5.94326 17.5633 5.96082 17.3788 6.1666L9.99432 14.4022C9.90493 14.5019 9.75273 14.5137 9.64898 14.429Z"></path>
              </svg>{" "}
              使用你的email登入
            </div>
            <div className="infoText">
              <svg
                aria-hidden="true"
                focusable="false"
                class="fl-none"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.64898 14.429L5.45289 11.0031C5.23872 10.8283 4.92305 10.8598 4.74783 11.0735L4.11327 11.8474C3.93804 12.0611 3.96961 12.3761 4.18378 12.5509L9.67845 17.037C9.88596 17.2064 10.1903 17.1828 10.3691 16.9834L18.8724 7.5001C19.0569 7.29432 19.0393 6.97825 18.833 6.79413L18.0863 6.12738C17.88 5.94326 17.5633 5.96082 17.3788 6.1666L9.99432 14.4022C9.90493 14.5019 9.75273 14.5137 9.64898 14.429Z"></path>
              </svg>{" "}
              每次均享快速、可靠及安全的體驗
            </div>
          </div>
        )}
        <div className="checkbox-container">
          <label htmlFor="setPassword" className="custom-checkbox-label">
            <input
              type="checkbox"
              id="setPassword"
              checked={showPasswordField}
              onChange={handleCheckboxChange}
              className="bds-r-checkbox__input"
            />
            <span class="bds-r-checkbox__icon">
              <span class="bds-r-checkbox__icon-checked">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  class="bds-r-checkbox__icon-checked-icon"
                  fill="white"
                  width="10"
                  height="8"
                  viewBox="0 0 10 8"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8.72365 0.501836C9.01563 0.208942 9.48904 0.208942 9.78103 0.501836C10.0464 0.7681 10.0706 1.18477 9.8534 1.47838L9.78103 1.5625L3.64486 7.71783L0.218985 4.28125C-0.0729951 3.98835 -0.0729951 3.51348 0.218985 3.22059C0.484423 2.95432 0.899787 2.93011 1.19248 3.14797L1.27634 3.22059L3.64473 5.59579L8.72365 0.501836Z"></path>
                </svg>
              </span>
              <span class="bds-r-checkbox__icon-unchecked"></span>
            </span>
            接著設定密碼
          </label>
        </div>
        <button
          className={`register-button ${!isFormValid ? "disabled" : ""}`}
          disabled={!isFormValid}
          onClick={registerAccount}
        >
          建立帳戶
        </button>
      </div>
    </div>
  );
};

export default Register;
