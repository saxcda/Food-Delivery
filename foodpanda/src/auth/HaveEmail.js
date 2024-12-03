import React, { useState, useEffect } from "react";
import "./HaveEmail.css";
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import icHide from "../assets/icons/ic-hide.svg";
import icShow from "../assets/icons/ic-show.svg";
import "./HaveEmail.css";
import axios from "axios";

const HaveEmail = ({ email, onClose, onBack }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleInputChange = (e) => {
    setPassword(e.target.value); // 更新密碼狀態
  };

  useEffect(() => {
    console.log(`密碼顯示狀態：${showPassword ? "顯示" : "隱藏"}`);
  }, [showPassword]);

  const checkpassword = async () => {
    if (!password) {
      alert("請輸入密碼!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/check_password",
        {
          email,
          password,
        }
      );
      if (response.status === 200) {
        alert("登入成功");
      } else {
        alert("密碼錯誤");
      }
    } catch (error) {
      console.error(
        "檢查郵件時發生錯誤：",
        error.response?.data || error.message
      );
      alert("檢查失敗，請稍後再試！");
    }
  };
  useEffect(() => {
    console.log(password); // 當 step 改變時顯示新的狀態
  }, [checkpassword]);

  return (
    <Box className="haveEmailContainer">
      <Box className="header">
        <IconButton className="backButton" onClick={onBack}>
          <ArrowBackIcon />
        </IconButton>
        <IconButton className="closeButton" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="77"
            height="60"
            data-testid="icon-login-password-default"
            class="iconSvg"
          >
            <g fill="none" fill-rule="evenodd">
              <path
                fill="#FBE7EF"
                d="M76.474 31.538C78.32 17.966 60.794 5.674 49.585 3.4c-11.14-2.273-28.983-.818-40.866 13.713C-3.2 31.611-1.071 50.297 4.32 55.625c5.392 5.327 10.78 5.252 19.121.248 8.336-5.01 21.638-7.034 37.068-8.066 15.47-.994 15.965-16.269 15.965-16.269"
              ></path>
              <path
                fill="#D70F64"
                d="M38.46 12.775c-.586-4.421-4.655-7.54-9.07-6.952-4.414.587-7.528 4.662-6.941 9.082l2.146 16.174 16.011-2.131-2.146-16.173zM17.753 15.53c-.93-7.013 4.01-13.478 11.014-14.41a12.716 12.716 0 019.475 2.53 12.751 12.751 0 014.914 8.5l2.77 20.876-25.403 3.38-2.77-20.876z"
              ></path>
              <path
                fill="#D70F64"
                d="M20.132 55.43l32.473-4.322a4.371 4.371 0 003.753-4.91l-3.455-26.044a4.245 4.245 0 00-4.766-3.653l-32.715 4.353a4.249 4.249 0 00-3.648 4.773l3.455 26.044a4.367 4.367 0 004.903 3.758"
              ></path>
              <path
                fill="#5D93CF"
                d="M41.167 11.769c-.587-4.421-4.656-7.54-9.07-6.952-4.414.587-7.528 4.661-6.942 9.082l2.146 16.174 16.011-2.131-2.145-16.173zM20.46 14.524C19.53 7.51 24.47 1.046 31.473.114a12.716 12.716 0 019.476 2.53 12.751 12.751 0 014.913 8.5l2.77 20.876-25.403 3.38-2.77-20.876z"
              ></path>
              <path
                fill="#93B7DF"
                d="M21.922 52.66l32.473-4.321a4.371 4.371 0 003.752-4.91l-3.455-26.044a4.245 4.245 0 00-4.766-3.654l-32.715 4.354a4.249 4.249 0 00-3.648 4.773L17.02 48.9a4.367 4.367 0 004.903 3.759"
              ></path>
              <path
                fill="#276FBF"
                d="M32.295 29.65a4.19 4.19 0 013.586-4.716 4.186 4.186 0 014.71 3.59 4.192 4.192 0 01-1.52 3.825l1.749 8.208-5.714.775-.37-8.418a4.188 4.188 0 01-2.44-3.264"
              ></path>
              <path
                fill="#5D93CF"
                d="M62.519 35.961l.623-1.684-4.938-1.585-1.346.486-1.37-.44-.002-.001-2.53-.812a.253.253 0 00-.32.164l-.203.635-3.735-1.207a.263.263 0 01-.17-.33l.184-.573a.207.207 0 00-.133-.26l-2.102-.675a.512.512 0 00-.446.064l-2.32 1.576-.794.538a.544.544 0 00.138.969l22.034 7.239.951-2.973-3.521-1.13z"
              ></path>
              <path
                fill="#276FBF"
                d="M63.341 37.787l-.23.719-20.194-6.649.793-.538z"
              ></path>
              <path
                fill="#5D93CF"
                d="M76.244 41c-1.281 4.003-5.56 6.207-9.555 4.924-3.997-1.282-6.198-5.567-4.917-9.569 1.28-4.002 5.559-6.207 9.555-4.924 3.996 1.283 6.198 5.567 4.917 9.57"
              ></path>
              <path
                fill="#276FBF"
                d="M74.752 40.47a6.052 6.052 0 01-7.613 3.923 6.064 6.064 0 01-3.917-7.623 6.052 6.052 0 017.613-3.923 6.064 6.064 0 013.917 7.624"
              ></path>
              <path
                fill="#FBE7EF"
                d="M72.704 39.538a1.133 1.133 0 11-2.158-.692 1.133 1.133 0 112.158.692"
              ></path>
            </g>
          </svg>
        </div>
        <Typography variant="h5" className="welcomeTitle">
          歡迎回來！
        </Typography>
        <Typography variant="body1" className="emailDescription">
          輸入密碼登入，我們也可以將登入連結寄到你的 email 信箱。
        </Typography>
        <Typography variant="body2" className="emailAddress">
          {email}
        </Typography>
        <div className="input-box input-box">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder=" "
            className="valid"
            aria-label="密碼"
            aria-labelledby="password-label"
            aria-controls="password"
            aria-describedby="password-label"
            aria-autocomplete="none"
            data-testid="login-view-field-password"
            required
            value={password}
            onChange={handleInputChange} // 更新密碼狀態
          />
          <label htmlFor="password" id="password-label">
            密碼
          </label>
          <a
            href="#"
            data-testid="text-field-input-label"
            tabIndex="-1"
            onClick={(e) => {
              e.preventDefault(); // 阻止默認跳轉行為
              togglePasswordVisibility(); // 切換密碼顯示狀態
            }}
          >
            <img
              src={showPassword ? icHide : icShow}
              alt={showPassword ? "隱藏密碼" : "顯示密碼"}
              width="24"
              height="24"
              style={{
                display: "block",
                visibility: "visible",
                opacity: 1,
                zIndex: 100,
              }}
            />
          </a>
        </div>
        <Typography variant="body2" className="forgotPassword">
          忘記密碼？
        </Typography>
        <div
          style={{
            cursor: password.trim() ? "pointer" : "not-allowed",
          }}
        >
          <Button
            variant="contained"
            className="loginBtn"
            disabled={!password.trim()}
            onClick={checkpassword}
          >
            使用密碼登入
          </Button>
        </div>
        <Button variant="outlined" className="emailLinkBtn">
          將登入連結寄給我
        </Button>
      </Box>
    </Box>
  );
};

export default HaveEmail;
