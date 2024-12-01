import React from "react";
import { Box, Typography } from "@mui/material";

const Note_foodpanda = () => {
  return (
    <Box sx={{ padding: "0 10% 5% 10%"}}>
      {/* Heading */}
      <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
        foodpanda外送美味：
      </Typography>

      {/* Checkmarks List */}
      <Box sx={{ marginBottom: "30px" }}>
        <Typography sx={{fontWeight: "100" }}>
          <span style={{ color: "#D70F64" }}>✓</span> 全台超過上萬間人氣店家－從美食到生鮮雜貨通通有，馬上點！
        </Typography>
        <Typography sx={{ fontWeight: "100" }}>
          <span style={{ color: "#D70F64" }}>✓</span> 專業的外送夥伴，將在最短的時間內將你愛的餐點與生鮮雜貨外送給你。
        </Typography>
        <Typography sx={{ fontWeight: "100" }}>
          <span style={{ color: "#D70F64" }}>✓</span> 最親切有禮的客服，在家吃用餐也像VIP
        </Typography>
      </Box>

      {/* Section Heading */}
      <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
        從美食到生鮮雜貨－在台灣，線上訂超簡單：
      </Typography>

      {/* Instructions */}
      <Box sx={{ marginBottom: "20px" }}>
        <Typography sx={{ fontWeight: "100" }}>
           輸入您想送達的地址，可能是家裡或公司
        </Typography>
        <Typography sx={{ fontWeight: "100" }}>
           點擊「顯示餐廳」或「顯示商店」，找到附近可以外送的餐點或生鮮雜貨。
        </Typography>
        <Typography sx={{ fontWeight: "100" }}>
           選擇你想訂購的餐廳或商店
        </Typography>
        <Typography sx={{ fontWeight: "100" }}>
           將菜單上的餐點或產品加入購物車
        </Typography>
        <Typography sx={{ fontWeight: "100" }}>
           按下「結帳」
        </Typography>
        <Typography sx={{ fontWeight: "100" }}>
           再次確認並填入送達地址細節，可能是家裡或公司
        </Typography>
        <Typography sx={{ fontWeight: "100" }}>
           付款成功後就可以期待訂單送到你手上囉
        </Typography>
      </Box>
    </Box>
  );
};

export default Note_foodpanda;
