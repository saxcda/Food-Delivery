import React, { useState } from "react";
import { IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./ForgetPassword.css";

const ForgetPassword = ({ onClose, onBack }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // 防止預設的表單提交行為
    if (!email) {
      console.log("請輸入電子郵件");
      return;
    }
    try {
      // 發送 POST 請求到後端
      const response = await axios.post(
        "http://localhost:5000/api/forgot_password",
        {
          email: email,
        }
      );
      // 檢查回應狀態
      if (response.status === 200) {
        console.log("密碼修改成功，請至 Email 查看新密碼!");
        onClose();
      } else {
        console.log(`錯誤: ${response.data.message}`);
      }
    } catch (error) {
      // 處理錯誤
      console.log("無法連接到伺服器，請稍後再試");
      console.error("檢查郵件時發生錯誤：", error);
    }
  };

  return (
    <div className="modal-content">
      <Box className="modal-header">
        <IconButton className="back-button" onClick={onBack}>
          <ArrowBackIcon />
        </IconButton>
        <IconButton className="close-button" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <div className="modal-body">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="81"
          height="60"
          data-testid="icon-reset-password-default"
        >
          <g fill="none" fill-rule="evenodd">
            <path
              fill="#FBE7EF"
              d="M.142 29.393c-1.95 14.205 16.571 27.07 28.417 29.45 11.773 2.379 30.63.855 43.188-14.353C84.342 29.317 82.094 9.76 76.396 4.185c-5.699-5.576-11.393-5.497-20.208-.26-8.809 5.243-22.867 7.362-39.173 8.442C.667 13.407.142 29.393.142 29.393"
            ></path>
            <path
              fill="#5D93CF"
              d="M8.155 52.265c-2.966 0-5.379-2.392-5.379-5.334v-9.696c0-2.941 2.413-5.334 5.379-5.334h41.023l5.26-7.24 5.26 7.24h8.895c2.966 0 5.379 2.393 5.379 5.334v9.696c0 2.942-2.413 5.334-5.379 5.334H8.155z"
            ></path>
            <path
              fill="#FFF"
              d="M68.593 34.294h-10.13l-4.025-5.54-4.024 5.54H8.155c-1.638 0-2.966 1.317-2.966 2.941v9.696c0 1.625 1.328 2.942 2.966 2.942h60.438c1.638 0 2.966-1.317 2.966-2.942v-9.696c0-1.624-1.328-2.941-2.966-2.941"
            ></path>
            <path
              fill="#D70F64"
              d="M14.745 42.487c0 1.02-.834 1.848-1.863 1.848a1.855 1.855 0 01-1.862-1.848c0-1.02.834-1.847 1.862-1.847 1.029 0 1.863.827 1.863 1.847m12.746 0c0 1.02-.834 1.848-1.863 1.848a1.855 1.855 0 01-1.862-1.848c0-1.02.834-1.847 1.862-1.847 1.029 0 1.863.827 1.863 1.847m12.746 0c0 1.02-.834 1.848-1.863 1.848a1.855 1.855 0 01-1.862-1.848c0-1.02.834-1.847 1.862-1.847 1.029 0 1.863.827 1.863 1.847m12.745 0c0 1.02-.833 1.848-1.862 1.848a1.855 1.855 0 01-1.862-1.848c0-1.02.833-1.847 1.862-1.847 1.029 0 1.862.827 1.862 1.847m12.746 0c0 1.02-.834 1.848-1.862 1.848a1.855 1.855 0 01-1.863-1.848c0-1.02.834-1.847 1.863-1.847 1.028 0 1.862.827 1.862 1.847"
            ></path>
            <path
              fill="#5D93CF"
              d="M36.969 13.496l.579-2.577 7.428 1.992 1.287 1.676 2.06.552h.005l3.806 1.021a.372.372 0 01.265.457l-.258.946 5.626 1.497a.39.39 0 00.477-.272l.232-.853a.307.307 0 01.376-.215l3.163.847c.226.061.412.222.502.436l1.625 3.8.555 1.298v.001c.262.614-.304 1.258-.952 1.084l-33.281-8.68 1.207-4.43 5.298 1.42z"
            ></path>
            <path
              fill="#276FBF"
              d="M34.475 15.091l-.292 1.071 30.514 7.939-.555-1.298z"
            ></path>
            <path
              fill="#5D93CF"
              d="M15.811 8.742c-1.625 5.963 1.931 12.103 7.943 13.715s12.203-1.916 13.828-7.878C39.208 8.616 35.652 2.476 29.64.864 23.627-.748 17.436 2.78 15.811 8.742"
            ></path>
            <path
              fill="#93B7DF"
              d="M18.097 9.281c-1.295 4.75 1.538 9.643 6.328 10.927 4.79 1.284 9.722-1.526 11.016-6.277 1.295-4.75-1.538-9.642-6.328-10.926-4.79-1.284-9.722 1.526-11.016 6.276"
            ></path>
            <path
              fill="#276FBF"
              d="M27.251 5.3c-3.065 0-5.603 2.278-5.985 5.216l-.467-.533a.905.905 0 00-1.269-.089.887.887 0 00-.09 1.26l1.958 2.237a.903.903 0 001.331.031l2.03-2.112a.887.887 0 00-.03-1.261.905.905 0 00-1.273.03l-.358.373a4.236 4.236 0 014.153-3.368c2.337 0 4.238 1.885 4.238 4.203 0 2.317-1.901 4.203-4.238 4.203-.497 0-.9.4-.9.892 0 .493.403.893.9.893 3.33 0 6.038-2.686 6.038-5.988 0-3.302-2.709-5.988-6.038-5.988"
            ></path>
          </g>
        </svg>
        <h2 className="modal-title">忘記密碼了嗎？</h2>
        <p className="modal-description">輸入你的email，我們發送重設密碼連結</p>
        <div className="input-group">
          <input
            type="email"
            id="email"
            name="email"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="email-input"
          />
          <label htmlFor="email">電子郵件</label>
        </div>
        <button type="submit" className="reset-button" onClick={handleSubmit}>
          重設密碼
        </button>
        <button className="login-button" onClick={onBack}>
          回到登入頁
        </button>
      </div>
    </div>
  );
};

export default ForgetPassword;
