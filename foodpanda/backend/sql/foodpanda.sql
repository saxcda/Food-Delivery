CREATE TABLE users (
    user_id INT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(15),
    address VARCHAR(255),
    user_type TEXT NOT NULL CHECK(user_type IN ('會員', '外送員')), -- 用戶類型限制
    membership_status TEXT CHECK(membership_status IN ('VIP', NULL)) -- 會員狀態限制
);

-- CREATE TABLE merchants (
--     merchant_id INT PRIMARY KEY,
--     user_id INT NOT NULL,
--     store_name VARCHAR(100) NOT NULL,
--     store_address VARCHAR(255),
--     store_contact VARCHAR(15),
--     start_business_hours DATETIME NOT NULL,
--     end_business_hours DATETIME NOT NULL,
--     FOREIGN KEY (user_id) REFERENCES users(user_id)
-- );
-- 商家表
CREATE TABLE merchants (
    merchant_id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    rating DECIMAL(2,1) NOT NULL,
    type VARCHAR(50) NOT NULL,
    details TEXT,
    promotions TEXT, -- 可存 JSON 格式的促銷資訊
    location VARCHAR(255),
    city VARCHAR(50)
);

-- 分類表
CREATE TABLE categories (
    category_id INT PRIMARY KEY ,
    merchant_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    display_name VARCHAR(100),
    FOREIGN KEY (merchant_id) REFERENCES merchants(merchant_id) ON DELETE CASCADE
);

-- 菜單項目表
CREATE TABLE menu_items (
    item_id INT PRIMARY KEY ,
    category_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    image VARCHAR(255),
    isPri BOOLEAN(1),
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE
);


CREATE TABLE delivery_agents (
    delivery_id INT PRIMARY KEY,
    user_id INT NOT NULL,
    availablility_status TEXT NOT NULL CHECK(availablility_status IN ('可接單', '不可接單')), -- 可用狀態限制
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE products (
    product_id INT PRIMARY KEY,
    merchant_id INT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    availability_status TEXT NOT NULL CHECK(availability_status IN ('上架', '下架')), -- 產品狀態限制
    FOREIGN KEY (merchant_id) REFERENCES merchants(merchant_id)
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    user_id INT NOT NULL,
    merchant_id INT NOT NULL,
    delivery_id INT,
    order_status TEXT NOT NULL CHECK(order_status IN ('配送中', '已完成', '已取消')), -- 訂單狀態限制
    total_price DECIMAL(10, 2) NOT NULL,
    order_time DATETIME NOT NULL,
    delivery_address VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (merchant_id) REFERENCES merchants(merchant_id),
    FOREIGN KEY (delivery_id) REFERENCES delivery_agents(delivery_id)
);

CREATE TABLE order_items (
    order_item_id INT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE payments (
    payment_id INT PRIMARY KEY,
    order_id INT NOT NULL,
    payment_method TEXT NOT NULL CHECK(payment_method IN ('信用卡', '現金', '其他')), -- 支付方式限制
    amount DECIMAL(10, 2) NOT NULL,
    payment_status TEXT NOT NULL CHECK(payment_status IN ('完成', '失敗', '待處理')), -- 支付狀態限制
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

CREATE TABLE locations (
    location_id INT PRIMARY KEY,
    delivery_id INT NOT NULL,
    latitude DECIMAL(9, 6) NOT NULL,
    longitude DECIMAL(9, 6) NOT NULL,
    timestamp DATETIME NOT NULL,
    FOREIGN KEY (delivery_id) REFERENCES delivery_agents(delivery_id)
);

-- 插入用戶資料
INSERT INTO users (user_id, username, password, email, phone, address, user_type, membership_status) VALUES
(1, 'hans', '123', 'n930827@gmail.com', '0908027950', '印尼', '會員', '');

-- 插入商家資料
INSERT INTO merchants (merchant_id, name, image, rating, type, details, promotions, location, city)
VALUES (
    1,
    '阿春台菜海鮮',
    'path/to/image6.png',
    4.9,
    '台式',
    '阿春主打新鮮的台式海鮮與家常菜，是全家聚餐的好地方。',
    '["滿 $500 享 85 折", "迎新禮：贈送小菜"]',
    '桃園市龜山區',
    '桃園市'
),(
    2,
    '小偉咖哩',
    'path/to/image6.png',
    4.9,
    '日是',
    '阿春主打新鮮的台式海鮮與家常菜，是全家聚餐的好地方。',
    '["滿 $500 享 85 折", "迎新禮：贈送小菜"]',
    '桃園市龜山區',
    '桃園市'
),(
    3,
    '紅橘子精緻早午餐 (台北光復店)',
    'https://images.deliveryhero.io/image/fd-tw/tw-logos/cf8rg-logo.jpg',
    4.6,
    '早餐，台式',
    '食品業者登錄字號：A-153933543-00002-5，產品責任險碼：1722512SC200233',
    '金額低於$ 99 的訂單，我們將收取少量訂單費用',
    '台北市松山區光復南路13巷29號',
    '台北市'
),(
    4,
    '靴子義大利餐廳',
    'https://images.deliveryhero.io/image/fd-tw/LH/z0bf-listing.jpg?width=120&height=120',
    4.7,
    '歐美',
    '食品業者登錄字號：F-187483496-00000-2
    統一編號：87483496
    營業人名稱：靴子餐飲企業社',
    '需消費滿 $ 99',
    '(△) 新北市新莊區中正路593號',
    '新北市'
),(
    5,
    '飯捲王',
    'https://images.deliveryhero.io/image/fd-tw/LH/c9ey-listing.jpg',
    4.9,
    '韓式',
    '食品業者登錄字號：B-200197578-00000-7',
    '金額低於$ 79 的訂單，我們將收取少量訂單費用。',
    '(△) 台中市西區美村路一段81號（旁邊巷內）',
    '台中市'
),(
    6,
    '純茶社',
    'https://images.deliveryhero.io/image/fd-tw/LH/gjv7-listing.jpg',
    4.9,
    '飲料',
    '本店每筆訂單酌收提袋/包材費2元。因應運輸管制規定，為確保送餐品質，餐點皆由提袋/包材包裝。',
    '金額低於$ 79 的訂單，我們將收取少量訂單費用。',
    '(O)台南市東區光明街74-1號',
    '台南市'
),(
    7,
    '素緣堂素食',
    'https://images.deliveryhero.io/image/fd-tw/LH/oaoy-listing.jpg',
    4.8,
    '素食',
    '',
    '金額低於$ 79 的訂單，我們將收取少量訂單費用。',
    '(△)台東縣台東市更生北路228號',
    '台東市'
),(
    8,
    '元寶雞蛋糕財財佛',
    'https://images.deliveryhero.io/image/fd-tw/LH/gwho-listing.jpg',
    4.9,
    '甜點',
    '食品業者登錄字號：N-278964811-00000-6',
    '金額低於$ 79 的訂單，我們將收取少量訂單費用。',
    '(△)彰化縣彰化市陳稜路191號',
    '彰化市'
),(
    9,
    '國王的菜',
    'https://images.deliveryhero.io/image/fd-tw/LH/x040-listing.jpg',
    4.9,
    '異國',
    '',
    '金額低於$ 79 的訂單，我們將收取少量訂單費用。',
    '(O)嘉義市西區林森西路280號',
    '嘉義市'
),(
    10,
    '泰上皇 泰式料理',
    'https://images.deliveryhero.io/image/fd-tw/LH/ic5v-listing.jpg',
    4.7,
    '東南亞',
    '食品業者登錄字號：A-200222426-00001-',
    '金額低於＄99的訂單，我們將收取少量訂單費用。',
    '新竹市東區南大路420號',
    '新竹市'
),(
    11,
    '幸福白糖粿',
    'https://images.deliveryhero.io/image/fd-tw/LH/d6sd-listing.jpg',
    5,
    '甜點',
    '食品業者登錄字號：U-202278949-00000-0
    產品責任險碼：178713100061',
    '金額低於＄99的訂單，我們將收取少量訂單費用。',
    '(△)花蓮縣吉安鄉慶豐村慶豐11街78號',
    '花蓮市'
),(
    12,
    '雅米韓式經典料理 (高雄建工店)',
    'https://images.deliveryhero.io/image/fd-tw/LH/tb2t-listing.jpg',
    4.5,
    '韓式',
    '食品業者登錄字號：E-200193716-00001-1',
    '金額低於$ 79 的訂單。',
    '(△)高雄市三民區山東街204號',
    '高雄市'
),(
    13,
    '車站美香齋滷味 (基隆創始店)',
    'https://images.deliveryhero.io/image/fd-tw/LH/t2ll-listing.jpg',
    4.8,
    '小吃',
    '食品業者登錄字號：C-200104960-00000-1
    產品責任險碼：0525字第24AML0004046號',
    '金額低於$ 99 的訂單。',
    '(△)基隆市仁愛區忠一路13號',
    '基隆市'
),(
    14,
    '飯丸屋 (金門金城店)',
    'https://images.deliveryhero.io/image/fd-tw/tw-logos/cg3tz-logo.jpg',
    4.8,
    '日式',
    '營業人名稱：日品町商行',
    '金額低於$ 99 的訂單。',
    '(△)金門縣金城鎮中興路162號',
    '金門縣'
),(
    15,
    'MuMu悠然時光',
    'https://images.deliveryhero.io/image/fd-tw/LH/f3ib-listing.JPG',
    4.7,
    '歐美',
    '',
    '["滿 $150 折 $40", "滿 $150 折 $30"]',
    '(△))苗栗縣公館鄉館南村9鄰館南250號',
    '苗栗市'
),(
    16,
    '小仁泉極品豆漿 (埔里忠孝店)',
    'https://images.deliveryhero.io/image/fd-tw/tw-logos/cu6pi-logo.jpg',
    5,
    '飲料',
    '本店每筆訂單酌收餐點包裝費1元。　因應環保署公告，店家不得免費提供購物用環保袋，為確保送餐品質，餐點皆由塑膠袋包裝。',
    '["滿 $150 享 8 折"]',
    '(△))南投縣埔里鎮忠孝路126-2號',
    '南投市'
),(
    17,
    '海海鬆餅',
    'https://images.deliveryhero.io/image/fd-tw/LH/zaf2-listing.jpg',
    5,
    '甜點',
    '本店每筆訂單酌收提袋/包材費1元。　因應運輸管制規定，為確保送餐品質，餐點皆由提袋/包材包裝。',
    '金額低於$ 79 的訂單，我們將收取少量訂單費用。',
    '(△)澎湖縣馬公市六合路300號',
    '澎湖縣'
),(
    18,
    '那姐創意湯包',
    'https://images.deliveryhero.io/image/fd-tw/LH/dhzc-listing.jpg',
    5,
    '中式',
    '',
    '金額低於$ 79 的訂單，我們將收取少量訂單費用。',
    '(△)屏東縣潮州鎮長興路1-35號',
    '屏東縣'
),(
    19,
    '冒大仙冒菜麻辣燙 (桃園中正店)',
    'https://images.deliveryhero.io/image/fd-tw/LH/dkmj-listing.jpg',
    3.6,
    '中式',
    '若有任何疑問，請聯繫平臺線上客服。',
    '金額低於$ 79 的訂單，我們將收取少量訂單費用。',
    '(O)桃園市桃園區信光里中正路632之1號',
    '桃園市'
),(
    20,
    'Pizza Hut必勝客披薩專賣店 (宜蘭中山店)',
    'https://images.deliveryhero.io/image/fd-tw/LH/ck1hp-listing.jpg',
    4.7,
    '披薩',
    '本餐廳發票委託foodpanda開立，電子發票會寄至郵件信箱。 訂單若有任何疑問，請聯繫foodpanda線上客服協助。',
    '嫩牛鮮蝦奢華系列75折',
    '(X)宜蘭縣宜蘭市中山路三段171號',
    '宜蘭縣'
),(
    21,
    '斗南米糕 (斗六成功店)',
    'https://images.deliveryhero.io/image/fd-tw/LH/juxe-listing.JPG',
    4.9,
    '小吃',
    '營業人名稱：李侑融即斗南米糕',
    '["滿 $200 享 85 折", "滿 $200 享 9 折"]',
    '(△) 雲林縣斗六市內環路508號',
    '雲林縣'
);


-- 插入分類資料
INSERT INTO categories (category_id, merchant_id, name, display_name)
VALUES
    (1, 1, 'seafood', '海鮮 🦐'),
    (2, 2, 'curry', '咖哩'),
    (3, 3, 'breakfast,taiwanese', '早餐，台式'),
    (4, 4, 'American', '歐美'),
    (5, 5, 'Korean', '韓式'),
    (6, 6, 'Drinks', '飲料'),
    (7, 7, 'Vegetarian', '素食'),
    (8, 8, 'Sweets', '甜點'),
    (9, 9, 'Exotic', '異國'),
    (10, 10, 'South East Asia', '東南亞'),
    (11, 11, 'Sweets', '甜點'),
    (12, 12, 'Korean', '韓式'),
    (13, 13, 'Snack', '小吃'),
    (14, 14, 'Japanese', '日式'),
    (15, 15, 'American', '歐美'),
    (16, 16, 'Drinks', '飲料'),
    (17, 17, 'Sweets', '甜點'),
    (18, 18, 'Chinese', '中式'),
    (19, 19, 'Chinese', '中式'),
    (20, 20, 'Pizza', '披薩'),
    (21, 21, 'Snack', '小吃');


-- 插入菜單項目資料
INSERT INTO menu_items (item_id, category_id, name, price, original_price, image, isPri)
VALUES
    (1, 1, '炒花枝', 320, 340, 'path/to/menu12.png', 0),
    (2, 1, '蒜香蝦仁', 280, 300, 'path/to/menu13.png', 0),
    (3, 2, '小及咖哩', 280, 300, 'path/to/menu14.png', 0),
    (4, 2, '小小咖哩', 280, 300, 'path/to/menu15.png', 0),
    (5, 3, '脆皮卡啦雞腿堡蛋', 105, 105, 'https://images.deliveryhero.io/image/fd-tw/Products/22335114.jpg?width=%25s', 0),
    (6, 3, '玉米濃湯', 65, 65, 'https://images.deliveryhero.io/image/fd-tw/Products/22335702.jpg?width=%25s', 0),
    (7, 3, '燻雞蛋可頌', 105, 105, 'https://images.deliveryhero.io/image/fd-tw/Products/3040635.jpg?width=%25s', 0),
    (8, 4, '蒜辣白酒蛤蠣', 158, 158, 'https://images.deliveryhero.io/image/fd-tw/Products/83070990.jpg?width=300&height=300', 0),
    (9, 4, '檸檬燻鮭', 183, 183, 'https://images.deliveryhero.io/image/fd-tw/Products/83071001.jpg?width=300&height=300', 0),
    (10, 4, '奶油芝士燻雞', 138, 138, 'https://images.deliveryhero.io/image/fd-tw/Products/83070941.jpg?width=300&height=300', 0),
    (11, 5, '明太子', 120, 120, 'https://images.deliveryhero.io/image/fd-tw/Products/45895713.jpg?width=300&height=300', 0),
    (12, 5, '起司培根飯捲',  87,  87, 'https://images.deliveryhero.io/image/fd-tw/Products/45895724.jpg??width=800', 0),
    (13, 5, '勁辣雞肉飯捲', 93, 93, 'https://images.deliveryhero.io/image/fd-tw/Products/45895725.jpg??width=800', 0),
    (14, 6, '芒果鮮奶', 62, 62, 'https://images.deliveryhero.io/image/fd-tw/Products/134373614.jpg??width=800', 0),
    (15, 6, '蔓越莓鮮奶', 62, 62, 'https://images.deliveryhero.io/image/fd-tw/Products/134373623.jpg??width=800', 0),
    (16, 6, '抹茶拿鐵', 62, 62, 'https://images.deliveryhero.io/image/fd-tw/Products/134373622.jpg??width=800', 0),
    (17, 7, '當歸湯', 51, 60, 'https://images.deliveryhero.io/image/fd-tw/Products/48216408.jpg??width=800', 0),
    (18, 7, '陽春湯麵', 60, 70, 'https://images.deliveryhero.io/image/fd-tw/Products/48216183.jpg??width=800', 0),
    (19, 7, '當歸刀削麵', 85, 185, 'https://images.deliveryhero.io/image/fd-tw/Products/48214158.jpg??width=800', 0),
    (20, 8, '元寶造型雞蛋糕【財裝盒】', 100, 85, 'https://images.deliveryhero.io/image/fd-tw/Products/98443970.jpg??width=800', 0),
    (21, 8, '元寶造型雞蛋糕【財入袋】', 59, 59, 'https://images.deliveryhero.io/image/fd-tw/Products/98443969.jpg??width=800', 0),
    (22, 8, '紅糖紅豆雞蛋糕', 45, 45, 'https://images.deliveryhero.io/image/fd-tw/Products/98443868.jpg??width=800', 0),
    (23, 9, 'Tikka Masala 坦都瑪莎拉雞肉咖哩', 345, 345, '', 0),
    (24, 9, 'Korma Chicken 堅果雞肉咖哩', 315, 315, '', 0),
    (25, 9, 'Butter Chicken 紅醬奶油烤雞咖哩', 345, 345, '', 0),
    (26, 10, '綠咖哩雞飯', 170, 170, 'https://images.deliveryhero.io/image/fd-tw/Products/86893939.jpg??width=800', 0),
    (27, 10, '打拋雞炒麵', 160, 160, 'https://images.deliveryhero.io/image/fd-tw/Products/86893955.jpg??width=800', 0),
    (28, 10, '椒麻雞腿飯', 220, 220, 'https://images.deliveryhero.io/image/fd-tw/Products/86893943.jpg??width=800', 0),
    (29, 11, '綜合白糖粿', 86, 95, 'https://images.deliveryhero.io/image/fd-tw/Products/112294583.jpg??width=800', 0),
    (30, 11, '芝麻白糖粿', 59, 65, 'https://images.deliveryhero.io/image/fd-tw/Products/107742887.jpg??width=800', 0),
    (31, 11, 'QQ彈彈雙色地瓜球', 54, 65, 'https://images.deliveryhero.io/image/fd-tw/Products/132627725.jpg??width=800', 0),
    (32, 12, '韓式牛五花豆腐煲김치 두부 냄비 Korean Tofu Pot', 234, 275, 'https://images.deliveryhero.io/image/fd-tw/Products/41882793.jpg??width=800', 0),
    (33, 12, '爽！中華隊世界第一！韓式泡菜辣豆腐煲김치 두부 냄비', 194, 228, 'https://images.deliveryhero.io/image/fd-tw/Products/25181863.jpg??width=800', 0),
    (34, 12, '冬天新上市養生枸杞白湯豆腐煲', 212, 249, 'https://images.deliveryhero.io/image/fd-tw/Products/134429015.jpg??width=800', 0),
    (35, 13, '豬肉片', 36, 40, 'https://images.deliveryhero.io/image/fd-tw/Products/7292574.jpg??width=800', 0),
    (36, 13, '豆皮', 27, 30, 'https://images.deliveryhero.io/image/fd-tw/Products/7292537.jpg??width=800', 0),
    (37, 13, '鳥蛋', 18, 20, 'https://images.deliveryhero.io/image/fd-tw/Products/7292517.jpg??width=800', 0),
    (38, 13, '王子麵', 18, 20, 'https://images.deliveryhero.io/image/fd-tw/Products/7292531.jpg??width=800', 0),
    (39, 14, '日式炸雞飯糰超值套餐', 179, 199, 'https://images.deliveryhero.io/image/fd-tw/Products/41913785.jpg??width=800', 0),
    (40, 14, '明太⼦⼲⾙酥飯糰超值套餐', 179, 199, 'https://images.deliveryhero.io/image/fd-tw/Products/41913790.jpg??width=800', 0),
    (41, 14, '炸蝦天婦羅飯糰超值套餐', 189, 209, 'https://images.deliveryhero.io/image/fd-tw/Products/41913784.jpg??width=800', 0),
    (42, 15, '泡菜松阪豬焗烤飯', 325, 325, 'https://images.deliveryhero.io/image/fd-tw/Products/41805783.jpg??width=800', 0),
    (43, 15, 'MUMU拼盤', 260, 260, 'https://images.deliveryhero.io/image/fd-tw/Products/5715839.jpg??width=800', 0),
    (44, 15, '白醬酥炸卡拉雞', 234, 234, 'https://images.deliveryhero.io/image/fd-tw/Products/5715823.JPG??width=800', 0),
    (45, 16, '桂圓黑木耳【罐裝 870ml】', 140, 175, 'https://images.deliveryhero.io/image/fd-tw/Products/43878538.jpg??width=800', 0),
    (46, 16, '極品豆漿【無糖｜罐裝 870ml】', 80, 100, 'https://images.deliveryhero.io/image/fd-tw/Products/43841433.jpg??width=800', 0),
    (47, 16, '黑芝麻豆漿【罐裝 870ml】', 100, 125, 'https://images.deliveryhero.io/image/fd-tw/Products/43841429.jpg??width=800', 0),
    (48, 17, '半份薑汁燒肉', 95, 95, 'https://images.deliveryhero.io/image/fd-tw/Products/125956426.jpg??width=800', 0),
    (49, 17, '全份提拉米蘇鬆餅', 185, 185, 'https://images.deliveryhero.io/image/fd-tw/Products/123208363.jpg??width=800', 0),
    (50, 17, '全份莓果乳酪鬆餅', 140, 140, 'https://images.deliveryhero.io/image/fd-tw/Products/123208366.jpg??width=800', 0),
    (51, 18, '綜合口味湯包', 120, 120, 'https://images.deliveryhero.io/image/fd-tw/Products/132904894.jpg??width=800', 0),
    (52, 18, '酸辣湯餃', 75, 75, 'https://images.deliveryhero.io/image/fd-tw/Products/132550575.jpg??width=800', 0),
    (53, 18, '養生紅麴菌菇湯包', 120, 120, 'https://images.deliveryhero.io/image/fd-tw/Products/132550565.jpg??width=800', 0),
    (54, 19, '仙氣牛套餐', 215, 215, 'https://images.deliveryhero.io/image/fd-tw/Products/133750394.jpg??width=800', 0),
    (55, 19, '牛多多套餐', 265, 265, 'https://images.deliveryhero.io/image/menu-import-gateway-prd/regions/AS/chains/dudooeatschain/791dee8e2f4b6751699bf14318f3cee3??width=800', 0),
    (56, 19, '雙人滿足套餐', 420, 420, 'https://images.deliveryhero.io/image/menu-import-gateway-prd/regions/AS/chains/dudooeatschain/a969d21e3bc78414939947e6d857b121??width=800', 0),
    (57, 20, '夏威夷個人比薩買一送一', 129, 129, 'https://images.deliveryhero.io/image/fd-tw/Products/133375233.jpg??width=800', 0),
    (58, 20, '夏威夷大比薩', 299, 299, 'https://images.deliveryhero.io/image/fd-tw/Products/114758597.jpg??width=800', 0),
    (59, 20, '嫩牛鮮蝦奢華獨饗套餐盒', 269, 269, 'https://images.deliveryhero.io/image/fd-tw/Products/134334693.jpg??width=800', 0),
    (60, 21, '排骨酥湯', 59, 65, 'https://images.deliveryhero.io/image/fd-tw/Products/26014616.JPG??width=800', 0),
    (61, 21, '乾粿仔條', 59, 65, 'https://images.deliveryhero.io/image/fd-tw/Products/26014561.JPG??width=800', 0),
    (62, 21, '乾麵', 59, 65, 'https://images.deliveryhero.io/image/fd-tw/Products/26014560.jpg??width=800', 0);
