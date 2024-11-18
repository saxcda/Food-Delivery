// restaurantData.js
export const restaurantData = [
  {
    name: "小吉咖哩 (台北八德店)",
    image: "path/to/image1.png", // 替換為有效的圖片路徑
    rating: 4.7,
    type: "台式",
    details: "這是一家提供經典台式咖哩的餐廳，餐點豐富多樣，特別適合午餐和晚餐。",
    promotions: ["滿 $100 享 95 折", "迎新禮：免外送服務費"],
    location: "台北市八德路",
    city: "台北市",
    menu: [
      { name: "經典咖哩飯", price: 162, originalPrice: 180, image: "path/to/menu1.png" },
      { name: "辣味咖哩飯", price: 171, originalPrice: 190, image: "path/to/menu2.png" },
      { name: "炸雞排咖哩飯", price: 181, originalPrice: 200, image: "path/to/menu3.png" },
    ],
  },
  {
    name: "樂炒炒物專門店",
    image: "path/to/image2.png", // 替換為有效的圖片路徑
    rating: 4.8,
    type: "台式",
    details: "樂炒提供多種特色炒飯，搭配各式小菜，是快速便捷的選擇。",
    promotions: ["滿 $300 享 85 折", "迎新禮：免外送服務費"],
    location: "新北市板橋區",
    city: "新北市",
  },
  {
    name: "讚:美食pasta焗烤專賣店",
    image: "path/to/image3.png", // 替換為有效的圖片路徑
    rating: 4.5,
    type: "歐美料理",
    details: "主打多種口味的焗烤與義大利麵，適合喜歡西式美食的顧客。",
    promotions: ["滿 $100 折 $10", "迎新禮：免外送服務費"],
    location: "台中市南區",
    city: "台中市",
  },
];
