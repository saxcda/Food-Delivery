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
    merchant_id INT PRIMARY KEY ,
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
INSERT INTO merchants (name, image, rating, type, details, promotions, location, city)
VALUES (
    '阿春台菜海鮮',
    'path/to/image6.png',
    4.9,
    '台式',
    '阿春主打新鮮的台式海鮮與家常菜，是全家聚餐的好地方。',
    '[\"滿 $500 享 85 折\", \"迎新禮：贈送小菜\"]',
    '桃園市龜山區',
    '桃園市'
),(
    '小偉咖哩',
    'path/to/image6.png',
    4.9,
    '日是',
    '阿春主打新鮮的台式海鮮與家常菜，是全家聚餐的好地方。',
    '[\"滿 $500 享 85 折\", \"迎新禮：贈送小菜\"]',
    '桃園市龜山區',
    '桃園市'
);

-- 插入分類資料
INSERT INTO categories (merchant_id, name, display_name)
VALUES
    (1, 'seafood', '海鮮 🦐'),
    (2, 'curry', '咖哩');


-- 插入菜單項目資料
INSERT INTO menu_items (category_id, name, price, original_price, image, isPri)
VALUES
    (1, '炒花枝', 320, 340, 'path/to/menu12.png', 0),
    (1, '蒜香蝦仁', 280, 300, 'path/to/menu13.png', 0),
    (2, '小及咖哩', 280, 300, 'path/to/menu14.png', 0),
    (2, '小小咖哩', 280, 300, 'path/to/menu15.png', 0);



