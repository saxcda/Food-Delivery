import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  Button,
  Box,
  Typography,
  DialogContent,
  Divider,
  IconButton,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EmailConfirm from "./EmailConfirm"; // 引入 EmailConfirm 組件
import "./LoginDialog.css";

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="down" ref={ref} {...props} />
));

const LoginDialog = ({ open, onClose }) => {
  const [showEmailConfirm, setShowEmailConfirm] = useState(false); // 狀態管理

  // 切換到 EmailConfirm
  const handleProceed = () => {
    setShowEmailConfirm(true);
  };

  // 返回 LoginDialog
  const handleBack = () => {
    setShowEmailConfirm(false);
  };

  const handleClose = () => {
    setShowEmailConfirm(false);
    onClose(); // 通知父組件關閉對話框
  };

  if (showEmailConfirm) {
    // 如果状态为 true，显示 EmailConfirm
    return (
      <EmailConfirm
        open={showEmailConfirm}
        onClose={handleClose} // 更新父組件狀態
        onBack={handleBack} // 返回到 LoginDialog
      />
    );
  }

  // 預設顯示 LoginDialog
  return (
    <Dialog
      open={open}
      onClose={onClose} // 打叉直接關閉
      TransitionComponent={Transition}
      PaperProps={{
        style: {
          borderRadius: "15px",
          padding: "10px 5px",
        },
      }}
    >
      <DialogTitle className="dialogTitleContainer">
        <Box className="titleBox">
          <Typography variant="h5" className="dialogTitle">
            歡迎 !
          </Typography>
          <Typography variant="subtitle1" className="dialogSubtitle">
            註冊或登入
          </Typography>
        </Box>
        <IconButton onClick={onClose} className="closeButton">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} alignItems="center">
          <Button
            variant="contained"
            color="secondary"
            className="loginButton"
            onClick={handleProceed} // 點擊切換到 EmailConfirm
          >
            登入
          </Button>

          <Divider className="horizontalDivider">或</Divider>

          <Button
            variant="outlined"
            className="registerButton"
            onClick={handleProceed} // 點擊切換到 EmailConfirm
          >
            註冊
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
