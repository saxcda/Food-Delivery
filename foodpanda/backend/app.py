from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

from sendemail import sendEmail
from SQL import email_confirm, password_confirm

app = Flask(__name__)
CORS(app)

# API: 發送電子郵件
@app.route('/api/send_email', methods=['POST'])
def send_email_api():
    data = request.json
    email = data.get('email')
    try:
        if not email:
            return jsonify({'error': 'Email is required'}), 400
        
        verification_code = sendEmail(email)
        
        return jsonify({
            'message': 'Email sent successfully',
            'verification_code': verification_code
        }), 200
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

# API: 驗證電子郵件
@app.route('/api/check_email', methods=['POST'])
def check_email_api():
    data = request.json
    email = data.get('email')
    print(email)
    try:
        if not email:
            return jsonify({'error': 'Email is required'}), 400
        result = email_confirm(email)
        exists = bool(result)
        return jsonify({'exists': exists}), 200
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

# API: 驗證密碼
@app.route('/api/check_password', methods=['POST'])
def check_password_api():
    data = request.json
    email = data.get('email')
    password_input = str(data.get('password'))
    print(password_input)
    try:
        if not password_input:
            return jsonify({'error': 'Password is required'}), 400
        result = password_confirm(email)
        if result != password_input:
            return jsonify({'error': 'Password is incorrect'}), 404
        return jsonify({'message': 'Login successful', 'email': email}), 200
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

@app.route('/restaurants', methods=['GET'])
def get_restaurants():
    try:
        # 從請求中獲取查詢參數 city
        city = request.args.get('city')

        # 連接 SQLite 資料庫
        conn = sqlite3.connect('./db/foodpanda.db')
        cursor = conn.cursor()

        if city == 'all':
            # 返回所有城市名稱
            cities_query = "SELECT DISTINCT city FROM merchants"
            cursor.execute(cities_query)
            cities = cursor.fetchall()
            result = [city[0] for city in cities]  # 提取城市名稱列表
            conn.close()
            return jsonify(result), 200

        # 查詢商家資料，根據 city 過濾
        merchants_query = "SELECT * FROM merchants WHERE city = ?" if city else "SELECT * FROM merchants"
        cursor.execute(merchants_query, (city,) if city else ())
        merchants = cursor.fetchall()

        # 查詢分類資料
        categories_query = "SELECT * FROM categories"
        cursor.execute(categories_query)
        categories = cursor.fetchall()

        # 查詢菜單項目資料
        menu_items_query = "SELECT * FROM menu_items"
        cursor.execute(menu_items_query)
        menu_items = cursor.fetchall()

        # 整理數據
        result = []
        for merchant in merchants:
            merchant_id, name, image, rating, m_type, details, promotions, location, city_name = merchant
            merchant_data = {
                "merchant_id": merchant_id,
                "name": name,
                "image": image,
                "rating": rating,
                "type": m_type,
                "details": details,
                "promotions": promotions,
                "location": location,
                "city": city_name,
                "categories": []
            }

            # 添加分類
            for category in categories:
                category_id, cat_merchant_id, cat_name, display_name = category
                if cat_merchant_id == merchant_id:
                    category_data = {
                        "category_id": category_id,
                        "name": cat_name,
                        "display_name": display_name,
                        "items": []
                    }

                    # 添加菜單項目
                    for item in menu_items:
                        item_id, item_category_id, item_name, price, original_price, item_image = item
                        if item_category_id == category_id:
                            category_data["items"].append({
                                "item_id": item_id,
                                "name": item_name,
                                "price": price,
                                "original_price": original_price,
                                "image": item_image
                            })
                    merchant_data["categories"].append(category_data)
            result.append(merchant_data)

        conn.close()
        return jsonify(result), 200

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
