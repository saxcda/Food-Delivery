import json
from bs4 import BeautifulSoup

# 讀取 HTML 文件
file_path = "臺北市 美食外送┃線上訂立即送_ foodpanda.html"

try:
    with open(file_path, "r", encoding="utf-8") as file:
        html_content = file.read()
except FileNotFoundError:
    print(f"無法找到檔案: {file_path}")
    exit()

# 使用 BeautifulSoup 解析 HTML
soup = BeautifulSoup(html_content, "html.parser")
script_tags = soup.find_all("script", type="application/ld+json")

if len(script_tags) > 1:
    script_tag = script_tags[1]
    data = json.loads(script_tag.string)
    restaurants = data.get("itemListElement", [])

    sql_statements = []

    for idx, restaurant in enumerate(restaurants, start=1):
        item = restaurant.get("item", {})
        if isinstance(item, dict) and item.get("@type") == "Restaurant":
            name = item.get("name", "未知名稱").replace("'", "''")
            image = item.get("image", "path/to/default_image.png")
            price_range = item.get("priceRange", "未知價格範圍")
            telephone = item.get("telephone", "未知電話")
            address = item.get("address", {})
            location = address.get("streetAddress", "未知地址").replace("'", "''")
            city = address.get("addressLocality", "未知城市")

            # 插入商家資訊
            merchant_sql = f"""
            INSERT INTO merchants (name, image, rating, type, details, promotions, location, city)
            VALUES (
                '{name}',
                '{image}',
                4.5,  -- 預設評分
                '未知類型',
                '這是一家很受歡迎的餐廳。',
                '[]',  -- 預設促銷信息
                '{location}',
                '{city}'
            );
            """
            sql_statements.append(merchant_sql.strip())

            # 插入分類資訊
            category_sql = f"""
            INSERT INTO categories (merchant_id, name, display_name)
            VALUES
                ({idx}, 'general', '一般分類');
            """
            sql_statements.append(category_sql.strip())

            # 插入菜單項目 (樣本)
            menu_items_sql = f"""
            INSERT INTO menu_items (category_id, name, price, original_price, image, isPri)
            VALUES
                ({idx}, '招牌菜', 300, 350, 'path/to/menu_item.png', 0);
            """
            sql_statements.append(menu_items_sql.strip())

    # 輸出 SQL 語句
    with open("restaurant_insert.sql", "w", encoding="utf-8") as sql_file:
        sql_file.write("\n".join(sql_statements))

    print("SQL 語句已生成，保存在 restaurant_insert.sql 文件中。")
else:
    print("無法找到足夠的 <script> 標籤或 JSON 數據。")
