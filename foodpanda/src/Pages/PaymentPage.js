import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { Chip, Switch } from "@mui/material";


const PaymentPage = () => {
  const location = useLocation();
  const { cart, deliveryType } = location.state || {};
  const totalPrice = cart?.reduce((total, item) => total + item.price, 0) || 0;

  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState({
    email: "ericli9222@gmail.com",
    firstName: "eric",
    lastName: "li",
    phone: "+886 28365770",
  });
  const [formValues, setFormValues] = useState({ ...details });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFormValues({ ...details }); // Reset form values to original details
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    setDetails({ ...formValues }); // Update details with form values
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#FAFAFA", minHeight: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {/* 左側內容 */}
        <Box sx={{ flex: 3 }}>
        <Box
  sx={{
    backgroundColor: "#FFFFFF",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  }}
>
  {/* 標題與右上角連結 */}
  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <Typography variant="h6" fontWeight="bold">
      送餐地址
    </Typography>
    <Typography
      variant="body2"
      color="blue"
      sx={{ cursor: "pointer", textDecoration: "underline" }}
    >
      查看儲存地址
    </Typography>
  </Box>

  {/* 地圖區域 */}
  <Box
    sx={{
      height: "200px",
      backgroundColor: "#EDEDED",
      borderRadius: "10px",
      marginTop: "10px",
      marginBottom: "20px",
    }}
  >
    <Typography
      variant="body2"
      color="text.secondary"
      textAlign="center"
      sx={{ padding: "80px 0" }}
    >
      地圖顯示區域
    </Typography>
  </Box>

  {/* 地址文字 */}
  <Typography variant="body1" fontWeight="bold">
    333 桃園市
  </Typography>
  <Typography variant="body2" color="text.secondary">
    青山路二段
  </Typography>
  <Button variant="text" sx={{ color: "blue" }}>
    編輯
  </Button>

  {/* 門牌號碼輸入 */}
  <Typography variant="body1" fontWeight="bold" sx={{ marginTop: "20px", marginBottom: "10px" }}>
    缺少你的門牌號碼
  </Typography>
  <Box sx={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
    <TextField
      label="門牌號碼"
      placeholder="請輸入門牌號碼"
      fullWidth
      size="small"
    />
  </Box>

  {/* 樓層與公司名稱 */}
  <Box sx={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
    <TextField
      label="樓層"
      placeholder="請輸入樓層"
      fullWidth
      size="small"
    />
    <TextField
      label="公司 / 大樓名稱"
      placeholder="請輸入公司名稱"
      fullWidth
      size="small"
    />
  </Box>

  {/* 備註欄位 */}
  <TextField
    label="外送備註"
    placeholder="請輸入備註（例如：放置於管理室）"
    fullWidth
    multiline
    rows={2}
    size="small"
    sx={{ marginBottom: "20px" }}
  />

  {/* 標籤 */}
  <Typography variant="body2" fontWeight="bold" sx={{ marginBottom: "10px" }}>
    新增標籤
  </Typography>
  <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
    <Chip label="家" clickable />
    <Chip label="工作" clickable />
    <Chip label="夥伴" clickable />
    <Chip label="其他" clickable />
  </Box>

  {/* 送出按鈕 */}
  <Button
    variant="contained"
    sx={{
      backgroundColor: "#D70F64",
      "&:hover": { backgroundColor: "#C00E58" },
      width: "100%",
      padding: "10px",
      fontSize: "1rem",
    }}
  >
    送出
  </Button>

  {/* 優先電話提示 */}
  <Box sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
    <Typography variant="body2" color="text.secondary">
      送達時優先電話通知：如未回應外送夥伴將致電
    </Typography>
    <Switch />
  </Box>
</Box>

          {/* 個人資料 */}
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              marginBottom: "20px",
              position: "relative",
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              個人資料
            </Typography>

            {isEditing ? (
              <Box component="form">
                {/* Email */}
                <TextField
                  label="電子郵件"
                  value={formValues.email}
                  name="email"
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                {/* Name */}
                <Box sx={{ display: "flex", gap: "10px" }}>
                  <TextField
                    label="名"
                    value={formValues.firstName}
                    name="firstName"
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="姓"
                    value={formValues.lastName}
                    name="lastName"
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                </Box>
                {/* Phone */}
                <TextField
                  label="手機號碼"
                  value={formValues.phone}
                  name="phone"
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />

                {/* Save and Cancel Buttons */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "20px",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#D70F64",
                      "&:hover": { backgroundColor: "#C00E58" },
                    }}
                    onClick={handleSaveClick}
                  >
                    儲存
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ color: "blue" }}
                    onClick={handleCancelClick}
                  >
                    取消
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box>
                {/* Display Details */}
                <Typography variant="body1">
                  {details.firstName} {details.lastName}
                </Typography>
                <Typography variant="body2">{details.email}</Typography>
                <Typography variant="body2">{details.phone}</Typography>

                {/* Edit Button */}
                <Button
                  variant="outlined"
                  sx={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    borderColor: "blue",
                    color: "blue",
                  }}
                  onClick={handleEditClick}
                >
                  編輯
                </Button>
              </Box>
            )}
          </Box>

          {/* 付款方式 */}
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              marginBottom: "20px",
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
    付款方式
            </Typography>
            <RadioGroup defaultValue="cash" name="payment-options">
                {/* 現金付款 */}
                <FormControlLabel
                value="cash"
                control={<Radio />}
                label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <img
                        src="https://via.placeholder.com/40"
                        alt="現金圖示"
                        style={{ width: "40px", height: "40px" }}
                    />
                    <Typography variant="body2">現金付款</Typography>
                    </Box>
                }
                />

                {/* 信用卡 */}
                <FormControlLabel
                value="creditCard"
                control={<Radio />}
                label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <img
                        src="https://via.placeholder.com/40"
                        alt="信用卡圖示"
                        style={{ width: "40px", height: "40px" }}
                    />
                    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <img
                        src="https://via.placeholder.com/100x20"
                        alt="信用卡標誌"
                        style={{ width: "100px" }}
                        />
                    </Box>
                    </Box>
                }
                />

                {/* LINE PAY */}
                <FormControlLabel
                value="linePay"
                control={<Radio />}
                label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <img
                        src="https://via.placeholder.com/40"
                        alt="LINE PAY圖示"
                        style={{ width: "40px", height: "40px" }}
                    />
                    <Typography variant="body2">LINE PAY</Typography>
                    </Box>
                }
                />
            </RadioGroup>
            {/* 促銷廣告 */}
        <Box
            sx={{
            backgroundColor: "#FDF3F5",
            borderRadius: "10px",
            padding: "20px",
            marginTop: "20px",
            textAlign: "center",
            }}
        >
            <Typography variant="h6" fontWeight="bold" color="#D70F64" gutterBottom>
            別再錯過！最高享回饋30%
            </Typography>
            <img
            src="https://via.placeholder.com/300x150"
            alt="促銷廣告圖片"
            style={{ width: "100%", borderRadius: "10px" }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ marginTop: "10px" }}>
            *本活動細節請見官網
            </Typography>
        </Box>

        {/* 使用優惠券 */}
        <Box
            sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "20px",
            }}
        >
            <img
            src="https://via.placeholder.com/24"
            alt="優惠券圖示"
            style={{ width: "24px", height: "24px" }}
            />
            <Typography variant="body2" sx={{ color: "blue" }}>
            使用優惠券
            </Typography>
        </Box>

          </Box>
        </Box>

        {/* 右側訂單摘要 */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#FFFFFF",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            您的訂單
          </Typography>
          {cart.map((item, index) => (
            <Box key={index} sx={{ marginBottom: "10px" }}>
              <Typography variant="body1">{item.name}</Typography>
            </Box>
          ))}
          <Divider sx={{ marginY: "10px" }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              小計
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              ${totalPrice}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              總計
            </Typography>
            <Typography variant="h6" fontWeight="bold" sx={{ color: "#D70F64" }}>
              ${totalPrice + 2 /* 平台費 */}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
  sx={{
    backgroundColor: "#FFFFFF",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  }}
>
  

        
    </Box>


      {/* 確認按鈕 */}
      <Box textAlign="center" sx={{ marginTop: "30px" }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#D70F64",
            "&:hover": { backgroundColor: "#C00E58" },
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "1rem",
          }}
        >
          確認下單
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentPage;
