import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import "./VerifyEmail.css";

const VerifyEmail = ({ email, onBack, onClose, setlogin, setlogout }) => {
  const [countdown, setCountdown] = useState(3); // 設定初始倒數秒數
  const [isCompleted, setIsCompleted] = useState(false); // 是否完成倒數

  useEffect(() => {
    if (countdown === 0) {
      setIsCompleted(true); // 當倒數結束，顯示其他內容
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1); // 每秒減少倒數時間
    }, 1000);

    return () => clearInterval(timer); // 清除計時器，防止內存洩漏
  }, [countdown]);

  const verifyEmail = async () => {
    if (!email) {
      alert("無法發送, 請稍後再試。");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/verify_email",
        {
          email: email,
        }
      );
      if (response.status === 200) {
        setIsCompleted(false);
        setCountdown(3);
      } else {
        alert("發送失敗，請稍後再試！");
      }
    } catch (error) {
      console.error(
        "檢查郵件時發生錯誤：",
        error.response?.data || error.message
      );
      alert("檢查失敗，請稍後再試！");
    }
  };

  return (
    <Box className="verifyEmailWrapper" display="flex" flexDirection="column">
      <Box
        className="verifyEmailHeader"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <IconButton className="verifyEmailBackButton" onClick={onBack}>
          <ArrowBackIcon />
        </IconButton>
        <IconButton className="verifyEmailCloseButton" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box display="flex" flexDirection="column">
        <Box className="verifyEmailIcon" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="78"
          height="60"
          data-testid="icon-login-email-default"
        >
          <g fill="none" fillRule="evenodd">
            <path
              fill="#FBE7EF"
              d="M.137 30.733C-1.74 44.425 16.084 56.826 27.485 59.12c11.329 2.293 29.476.825 41.562-13.835 12.12-14.625 9.957-33.476 4.474-38.851-5.484-5.375-10.964-5.298-19.447-.25-8.478 5.053-22.007 7.096-37.699 8.137C.642 15.323.137 30.733.137 30.733"
            ></path>
            <path fill="#D70F64" d="M9.649 17.349L40.18 2l28.5 18.754z"></path>
            <path
              fill="#D70F64"
              d="M9.65 17.2l26.584 18.102 3.946.227 28.5-14.934L9.65 17.2z"
            ></path>
            <path
              fill="#DFEAF6"
              d="M59.206 55.162l-44.33-2.554 2.746-47.434L23.444 0 62.27 2.237l-3.064 52.925z"
            ></path>
            <path
              fill="#BED3EB"
              d="M7.237 53.715L35.947 35.2l3.947.226 26.374 21.675z"
            ></path>
            <path
              fill="#93B7DF"
              d="M9.776 17.2l26.716 18.158L7.639 53.979zM68.677 20.8L40.206 35.781l26.347 21.798z"
            ></path>
            <path fill="#5D93CF" d="M17.691 5.041l5.68.886L23.713 0z"></path>
            <path
              fill="#D70F64"
              fillRule="nonzero"
              d="M40.617 10.842c.311.277.554.62.73 1.027.175.408.263.88.263 1.417 0 .35-.034.65-.101.9a2.18 2.18 0 01-.264.625 1.056 1.056 0 01-.371.362.879.879 0 01-.425.115c-.144 0-.918 1.208-.54 1.208.135 0 .303-.015.506-.047.202-.03.414-.087.634-.167.221-.081.442-.197.662-.35.22-.152.419-.349.594-.59.176-.242.32-.538.432-.887.113-.35.169-.761.169-1.236 0-.707-.137-1.336-.412-1.887a4.268 4.268 0 00-1.087-1.39c-.45-.376-1.1.622-.79.9z"
            ></path>
            <path
              fill="#D70F64"
              fillRule="nonzero"
              d="M34.616 12.292c.18-.465.434-.868.763-1.209.329-.34.722-.604 1.181-.792a3.989 3.989 0 011.526-.282c.513 0 .986.07 1.418.208.432.139.803.347 1.113.625.311.277 1.24-.524.79-.9-.45-.376-.96-.66-1.532-.853a5.443 5.443 0 00-1.748-.289 5.256 5.256 0 00-3.646 1.437 4.94 4.94 0 00-1.107 1.585c-.27.61 1.062.936 1.242.47z"
            ></path>
            <path
              fill="#D70F64"
              fillRule="nonzero"
              d="M38.208 18.793c.828 0 1.604-.172 2.328-.517a4.761 4.761 0 001.816-1.51h-1.485c-.333.259-.713.46-1.14.604a4.418 4.418 0 01-1.411.214 4.639 4.639 0 01-1.58-.261 3.736 3.736 0 01-1.262-.746 3.331 3.331 0 01-.83-1.182c-.199-.466-.298-.994-.298-1.585 0-.546.09-1.052.27-1.518.18-.465-.972-1.079-1.242-.47a4.848 4.848 0 00-.405 1.988c0 .725.137 1.395.412 2.008.274.614.65 1.14 1.127 1.578a5.232 5.232 0 001.668 1.028c.634.246 1.311.37 2.032.37z"
            ></path>
            <path
              fill="#D70F64"
              fillRule="nonzero"
              d="M38.74 11.392c-.238-.116-.537-.174-.897-.174-.423 0-.801.083-1.134.248-.333.166-.614.39-.844.672-.23.282-.407.604-.533.967a3.433 3.433 0 00-.19 1.135c0 .331.048.636.143.913.094.278.227.515.398.712.17.197.376.352.614.464.239.112.502.167.79.167.432 0 .783-.076 1.053-.228a3.13 3.13 0 00.675-.497h.027c.01.18.137-4.262-.101-4.379z"
            ></path>
            <path
              fill="#D70F64"
              fillRule="nonzero"
              d="M40.449 15.288c-.144 0-.241-.038-.29-.115a.47.47 0 01-.075-.261c0-.126.014-.274.04-.444.028-.17.055-.318.082-.443l.5-2.646h-1.27l-.108.604h-.027c-.135-.277-.322-.474-.56-.59-.239-.117-.106 4.557.074 4.378.081.23.176.396.284.497.162.152.432.228.81.228.135 0 .684-1.208.54-1.208z"
            ></path>
            <path
              fill="#DFEAF6"
              fillRule="nonzero"
              d="M37.503 15.156a.906.906 0 01-.458-.104.774.774 0 01-.278-.265 1.09 1.09 0 01-.14-.369 2.188 2.188 0 01-.04-.414c0-.448.12-.828.359-1.138.239-.31.562-.466.969-.466.336 0 .583.112.743.336.159.225.239.51.239.854 0 .181-.02.365-.06.55-.04.186-.113.354-.22.505a1.19 1.19 0 01-.43.368c-.182.095-.41.143-.684.143z"
            ></path>
          </g>
        </svg>
      </Box>
      <div>
        <Typography variant="h5" className="verifyEmailModalTitle">
          我們已發送一個驗證連結至{email}
        </Typography>
        <Typography variant="body1" className="verifyEmailDescription">
          請點擊信箱內的驗證連結
        </Typography>
      </div>
      <div className="verifyEmailPrimaryButton">
        <Button
          className={`verifyEmailButton ${isCompleted ? "completed" : ""}`}
          variant="contained"
          onClick={verifyEmail}
          disabled={!isCompleted}
        >
          {isCompleted ? (
            <span>重新傳送驗證連結</span> // 當倒數結束後顯示這個文字
          ) : (
            <span>請於 {countdown} 秒後再次傳送</span> // 顯示倒數
          )}
        </Button>
      </div>
    </Box>
  );
};

export default VerifyEmail;
