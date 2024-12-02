const restaurantData = [
  {
    name: "香滿樓燒臘飯店",
    image: "path/to/image4.png",
    rating: 4.6,
    type: "港式",
    details: "提供多款燒臘便當，餐點份量充足，是午餐的好選擇。",
    promotions: ["滿 $200 折 $20", "迎新禮：贈送特製飲料"],
    location: "台北市信義區",
    city: "台北市",
    categories: [
      {
        name: "roasted",
        displayName: "燒臘 🍖",
        items: [
          { name: "叉燒飯", price: 140, originalPrice: 150, image: "path/to/menu8.png" },
          { name: "油雞飯", price: 130, originalPrice: 140, image: "path/to/menu9.png" },
        ],
      },
    ],
  },
  {
    name: "日食便當專賣",
    image: "path/to/image5.png",
    rating: 4.3,
    type: "日式",
    details: "日食便當專賣提供多種經典日式便當，價格實惠。",
    promotions: ["滿 $100 享 9 折", "迎新禮：贈送味噌湯"],
    location: "新北市新莊區",
    city: "新北市",
    categories: [
      {
        name: "bento",
        displayName: "日式便當 🍱",
        items: [
          { name: "鰻魚便當", price: 220, originalPrice: 230, image: "path/to/menu10.png" },
          { name: "鮭魚便當", price: 200, originalPrice: 210, image: "path/to/menu11.png" },
        ],
      },
    ],
  },
  {
    name: "阿春台菜海鮮",
    image: "path/to/image6.png",
    rating: 4.9,
    type: "台式",
    details: "阿春主打新鮮的台式海鮮與家常菜，是全家聚餐的好地方。",
    promotions: ["滿 $500 享 85 折", "迎新禮：贈送小菜"],
    location: "台南市安平區",
    city: "台南市",
    categories: [
      {
        name: "seafood",
        displayName: "海鮮 🦐",
        items: [
          { name: "炒花枝", price: 320, originalPrice: 340, image: "path/to/menu12.png" },
          { name: "蒜香蝦仁", price: 280, originalPrice: 300, image: "path/to/menu13.png" },
        ],
      },
    ],
  },
  {
    name: "健康蔬食工坊",
    image: "path/to/image7.png",
    rating: 4.4,
    type: "素食",
    details: "專為素食愛好者設計的健康蔬食餐點，滿足您的健康需求。",
    promotions: ["滿 $300 折 $30", "迎新禮：贈送沙拉"],
    location: "高雄市左營區",
    city: "高雄市",
    categories: [
      {
        name: "vegetarian",
        displayName: "蔬食 🥗",
        items: [
          { name: "蔬菜焗烤", price: 180, originalPrice: 200, image: "path/to/menu14.png" },
          { name: "素食壽司", price: 160, originalPrice: 170, image: "path/to/menu15.png" },
        ],
      },
    ],
  },
  {
    name: "豬腳大王",
    image: "path/to/image8.png",
    rating: 4.7,
    type: "台式",
    details: "專賣多種口味的豬腳飯，使用獨家秘製滷汁燉煮。",
    promotions: ["滿 $100 享 95 折", "迎新禮：贈送滷蛋"],
    location: "新竹市東區",
    city: "新竹市",
    categories: [
      {
        name: "pork",
        displayName: "豬腳 🐷",
        items: [
          { name: "經典豬腳飯", price: 150, originalPrice: 160, image: "path/to/menu16.png" },
          { name: "麻辣豬腳飯", price: 160, originalPrice: 170, image: "path/to/menu17.png" },
        ],
      },
    ],
  },
  {
    name: "三十秒熱炒",
    image: "path/to/image9.png",
    rating: 4.6,
    type: "台式",
    details: "快速出餐的熱炒餐廳，提供多種人氣菜色。",
    promotions: ["滿 $500 享 9 折", "迎新禮：免外送服務費"],
    location: "桃園市中壢區",
    city: "桃園市",
    categories: [
      {
        name: "stir-fry",
        displayName: "熱炒 🍲",
        items: [
          { name: "宮保雞丁", price: 200, originalPrice: 220, image: "path/to/menu18.png" },
          { name: "三杯雞", price: 220, originalPrice: 240, image: "path/to/menu19.png" },
        ],
      },
    ],
  },
  {
    name: "無敵拉麵",
    image: "path/to/image10.png",
    rating: 4.8,
    type: "日式",
    details: "提供多款濃厚湯頭的拉麵，味道鮮美。",
    promotions: ["滿 $300 折 $50", "迎新禮：贈送糖心蛋"],
    location: "台中市北屯區",
    city: "台中市",
    categories: [
      {
        name: "ramen",
        displayName: "拉麵 🍜",
        items: [
          { name: "豚骨拉麵", price: 240, originalPrice: 260, image: "path/to/menu20.png" },
          { name: "味噌拉麵", price: 220, originalPrice: 230, image: "path/to/menu21.png" },
        ],
      },
    ],
  },
  {
    name: "披薩宅急送",
    image: "path/to/image11.png",
    rating: 4.5,
    type: "歐美料理",
    details: "主打多種口味的手工披薩，外酥內軟，適合分享。",
    promotions: ["滿 $500 享 85 折", "迎新禮：贈送大蒜麵包"],
    location: "台北市中山區",
    city: "台北市",
    categories: [
      {
        name: "pizza",
        displayName: "披薩 🍕",
        items: [
          { name: "瑪格麗特披薩", price: 320, originalPrice: 340, image: "path/to/menu22.png" },
          { name: "夏威夷披薩", price: 300, originalPrice: 320, image: "path/to/menu23.png" },
        ],
      },
    ],
  },
  {
    name: "印度風味館",
    image: "path/to/image12.png",
    rating: 4.7,
    type: "異國料理",
    details: "專賣印度風味的咖哩與烤餅，味道正宗。",
    promotions: ["滿 $300 享 9 折", "迎新禮：贈送奶茶"],
    location: "新北市中和區",
    city: "新北市",
    categories: [
      {
        name: "indian",
        displayName: "印度料理 🥘",
        items: [
          { name: "咖哩雞", price: 250, originalPrice: 270, image: "path/to/menu24.png" },
          { name: "印度烤餅", price: 100, originalPrice: 110, image: "path/to/menu25.png" },
        ],
      },
    ],
  },
  {
    name: "小吉咖哩 (台北八德店)",
    image: "path/to/image1.png", // 替換為有效的圖片路徑
    rating: 4.7,
    type: "台式",
    details: "這是一家提供經典台式咖哩的餐廳，餐點豐富多樣，特別適合午餐和晚餐。",
    promotions: ["滿 $100 享 95 折", "迎新禮：免外送服務費"],
    location: "台北市八德路",
    city: "台北市",
    categories: [
      {
        name: "curry",
        displayName: "咖哩 🍛",
        items: [
          { name: "經典咖哩飯", price: 162, originalPrice: 180, image: "path/to/menu1.png" },
          { name: "辣味咖哩飯", price: 171, originalPrice: 190, image: "path/to/menu2.png" },
          { name: "炸雞排咖哩飯", price: 181, originalPrice: 200, image: "path/to/menu3.png" },
        ],
      },
      {
        name: "beef",
        displayName: "牛肉",
        items: [
          { name: "經典牛肉飯", price: 162, originalPrice: 180, image: "path/to/menu1.png" },
          { name: "辣味牛肉飯", price: 171, originalPrice: 190, image: "path/to/menu2.png" },
          { name: "炸牛肉飯", price: 181, originalPrice: 200, image: "path/to/menu3.png" },
        ],
      },
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
    categories: [
      {
        name: "fried",
        displayName: "炒飯 🍚",
        items: [
          { name: "炒飯", price: 150, originalPrice: 160, image: "path/to/menu4.png" },
          { name: "炒麵", price: 140, originalPrice: 150, image: "path/to/menu5.png" },
        ],
      },
    ],
  },
  {
    name: "讚:美食pasta焗烤專賣店",
    image: "path/to/image3.png", // 替換為有效的圖片路徑
    rating: 4.5,
    type: "歐美料理",
    details: "主打多種口味的焗烤與義大利麵，適合喜歡西式美食的顧客。",
    promotions: ["滿 $100 折 $10", "迎新禮：免外送服務費"],
    location: "台中市南區",
    city: "桃園市",
    categories: [
      {
        name: "pasta",
        displayName: "義大利麵 🍝",
        items: [
          { name: "焗烤義大利麵", price: 220, originalPrice: 230, image: "path/to/menu6.png" },
          { name: "海鮮焗烤", price: 250, originalPrice: 260, image: "path/to/menu7.png" },
        ],
      },
    ],
  },
];

export default restaurantData