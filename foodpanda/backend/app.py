from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import sqlite3
from registeremail import send_verification_email
from forgetpassword import send_forgetpassword_email
from SQL import email_confirm, password_confirm, update_password, insert_user
from randmopassword import generate_formatted_password

app = Flask(__name__)
CORS(app)

# 註冊資訊射進資料庫
@app.route('/api/register_account', methods=['POST'])
def register_account():
    data = request.json
    email = data.get('email')
    full_name = data.get('fullName')
    password = data.get('password')
    try:
        # 簡單驗證
        if not email or not full_name or not password:
            return jsonify({'error': 'All fields are required'}), 400
        # 呼叫資料庫插入函數
        result = insert_user(email, full_name, password)
        print(result)

        if result['success']:
            return jsonify({
                'success': True,
                'message': result['message'],
                'user_id': result.get('user_id')
            }), 200  # HTTP 201: Created
        else:
            return jsonify({'success': False, 'message': result['message']}), 500
    except Exception as e:
        return jsonify({'success': False, 'error': f"Server error: {str(e)}"}), 500

# 註冊時的驗證信
@app.route('/api/verify_email', methods=['POST'])
def verify_email_api():
    data = request.json
    email = data.get('email')
    try:
        if not email:
            return jsonify({'error': 'Email is required'}), 400
        
        verification_link = f"http://localhost:3000/register?email={email}"
        send_verification_email(email, verification_link)
        
        return jsonify({
            'message': 'Email sent successfully',
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
        if result:
            # Assuming the columns are: id, name, password, email, phone, country, role, extra
            user_info = {
                "id": result[0],
                "name": result[1],
                "password": result[2],
                "email": result[3],
                "phone": result[4],
                "country": result[5],
                "role": result[6],
                "extra": result[7],
            }
            print(user_info)
            return jsonify({'user_info':user_info})
        else:
            return jsonify({'user_info': None})
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

# API: 忘記密碼
@app.route('/api/forgot_password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data.get('email')
    if not email:
            return jsonify({"message": "請提供有效的電子郵件地址"}), 400
    try:
        # 查詢資料庫是否存在該電子郵件
        user_exists = email_confirm(email)  # 假設此函式執行查詢並返回布林值
        if not user_exists:
            return jsonify({"message": "該電子郵件未註冊"}), 404
        # 隨機生成一段密碼
        new_password = generate_formatted_password()
        # 更新資料庫中的密碼
        update_password(email, new_password)  # 假設此函式執行密碼更新
        # 將新密碼發送到用戶的電子郵件
        send_forgetpassword_email(email, new_password)  # 假設此函式執行電子郵件發送

        return jsonify({"message": "密碼已重置，請檢查您的電子郵件"})
    except Exception as e:
        print(f"處理錯誤: {e}")
        return jsonify({"message": "伺服器發生錯誤，請稍後再試"}), 500

@app.route('/restaurants', methods=['GET'])
def get_restaurants():
    try:
        city = request.args.get('city')

        conn = sqlite3.connect('./db/foodpanda.db')
        cursor = conn.cursor()

        if city == 'all':
            cities_query = "SELECT DISTINCT city FROM merchants"
            cursor.execute(cities_query)
            cities = cursor.fetchall()
            result = [city[0] for city in cities]
            conn.close()
            return jsonify(result), 200

        merchants_query = "SELECT * FROM merchants WHERE city = ?" if city else "SELECT * FROM merchants"
        cursor.execute(merchants_query, (city,) if city else ())
        merchants = cursor.fetchall()

        categories_query = "SELECT * FROM categories"
        cursor.execute(categories_query)
        categories = cursor.fetchall()

        menu_items_query = """
            SELECT item_id, category_id, name, price, original_price, image
            FROM menu_items
        """
        cursor.execute(menu_items_query)
        menu_items = cursor.fetchall()

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

            for category in categories:
                category_id, cat_merchant_id, cat_name, display_name = category
                if cat_merchant_id == merchant_id:
                    category_data = {
                        "category_id": category_id,
                        "merchant_id": merchant_id,
                        "name": cat_name,
                        "display_name": display_name,
                        "items": []
                    }

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

@app.route('/groceries_promotions', methods=['GET'])
def groceries_promotions():
    conn = sqlite3.connect('./db/foodpanda.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM groceries_promotions")
    promotions = [{"id": row[0], "title": row[1], "description": row[2]} for row in cursor.fetchall()]
    conn.close()
    return jsonify(promotions)

# 获取餐厅信息
@app.route('/groceries_restaurants', methods=['GET'])
def groceries_restaurants():
    conn = sqlite3.connect('./db/foodpanda.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM groceries_restaurants")
    restaurants = [{"id": row[0], "name": row[1], "delivery_time": row[2], "price_range": row[3], "offer": row[4], "image": row[5]} for row in cursor.fetchall()]
    conn.close()
    return jsonify(restaurants)

@app.route('/groceries_items', methods=['GET'])
def get_groceries_items():
    # 获取请求参数中的商家名称
    store_name = request.args.get('store_name')
    
    if not store_name:
        return jsonify({"error": "store_name is required"}), 400

    # 数据库连接
    conn = sqlite3.connect('./db/foodpanda.db')
    cursor = conn.cursor()

    try:
        # 查询商家的商品信息
        cursor.execute("""
            SELECT groceries_items.id, groceries_items.category, groceries_items.name, groceries_items.price, groceries_items.original_price, groceries_items.image
            FROM groceries_items
            JOIN groceries_restaurants ON groceries_items.restaurant_id = groceries_restaurants.id
            WHERE groceries_restaurants.name = ?
        """, (store_name,))
        
        items = [
            {
                "id": row[0],
                "category": row[1],
                "name": row[2],
                "price": row[3],
                "original_price": row[4],
                "image": row[5]
            }
            for row in cursor.fetchall()
        ]
        
        if not items:
            return jsonify({"message": f"No items found for store: {store_name}"}), 404

        return jsonify(items), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        conn.close()
        
@app.route('/order-history', methods=['GET'])
def get_order_history():
    try:
        user_id = request.args.get('user_id', type=int)
        order_status = '已完成'

        if not user_id:
            return jsonify({'error': 'User ID is required'}), 400

        conn = sqlite3.connect('./db/foodpanda.db')
        cursor = conn.cursor()

        # Fetch completed orders for the given user
        orders_query = """
            SELECT o.order_id, m.name, m.image, o.order_time, o.total_price
            FROM orders o
            JOIN merchants m ON o.merchant_id = m.merchant_id
            WHERE o.user_id = ? AND o.order_status = ?
            ORDER BY o.order_time DESC
        """
        cursor.execute(orders_query, (user_id, order_status))
        orders = cursor.fetchall()

        # Fetch menu items (limit to 3 per order)
        menu_items_query = """
            SELECT mi.item_id, mi.name, mi.price, oi.quantity
            FROM order_items oi
            JOIN menu_items mi ON oi.product_id = mi.item_id
            WHERE oi.order_id = ?
            LIMIT 3
        """

        result = []
        for order in orders:
            order_id, merchant_name, restaurant_image, order_time, total_price = order
            cursor.execute(menu_items_query, (order_id,))
            items = cursor.fetchall()

            result.append({
                "order_id": order_id,
                "restaurant_name": merchant_name,
                "restaurant_image": restaurant_image,
                "order_time": order_time,
                "total_price": total_price,
                "items": [
                    {"item_id": item[0], "name": item[1], "price": item[2], "quantity": item[3]}
                    for item in items
                ]
            })

        conn.close()
        return jsonify(result), 200

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

@app.route('/order-history-ongoing', methods=['GET'])
def get_order_history_ongoing():
    try:
        user_id = request.args.get('user_id', type=int)
        order_status = '配送中'

        if not user_id:
            return jsonify({'error': 'User ID is required'}), 400

        conn = sqlite3.connect('./db/foodpanda.db')
        cursor = conn.cursor()

        # Fetch completed orders for the given user
        orders_query = """
            SELECT o.order_id, m.name, m.image, o.order_time, o.total_price
            FROM orders o
            JOIN merchants m ON o.merchant_id = m.merchant_id
            WHERE o.user_id = ? AND o.order_status = ?
            ORDER BY o.order_time DESC
        """
        cursor.execute(orders_query, (user_id, order_status))
        orders = cursor.fetchall()

        # Fetch menu items (limit to 3 per order)
        menu_items_query = """
            SELECT mi.item_id, mi.name, mi.price, oi.quantity
            FROM order_items oi
            JOIN menu_items mi ON oi.product_id = mi.item_id
            WHERE oi.order_id = ?
            LIMIT 3
        """

        result = []
        for order in orders:
            order_id, merchant_name, restaurant_image, order_time, total_price = order
            cursor.execute(menu_items_query, (order_id,))
            items = cursor.fetchall()

            result.append({
                "order_id": order_id,
                "restaurant_name": merchant_name,
                "restaurant_image": restaurant_image,
                "order_time": order_time,
                "total_price": total_price,
                "items": [
                    {"item_id": item[0], "name": item[1], "price": item[2], "quantity": item[3]}
                    for item in items
                ]
            })

        conn.close()
        return jsonify(result), 200

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
    
@app.route('/order-detail', methods=['GET'])
def get_order_detail():
    try:
        order_id = request.args.get('order_id', type=int)
        if not order_id:
            return jsonify({'error': 'Order ID is required'}), 400

        conn = sqlite3.connect('./db/foodpanda.db')
        cursor = conn.cursor()

        # Fetch the order details
        order_query = """
            SELECT o.order_id, m.name, m.image, o.order_time, o.total_price, o.delivery_address, m.location
            FROM orders o
            JOIN merchants m ON o.merchant_id = m.merchant_id
            WHERE o.order_id = ?
        """
        cursor.execute(order_query, (order_id,))
        order = cursor.fetchone()

        if not order:
            return jsonify({'error': 'Order not found'}), 404

        order_id, restaurant_name, restaurant_image, order_time, total_price, delivery_address, merchant_location = order

        # Fetch associated menu items
        menu_items_query = """
            SELECT mi.item_id, mi.name, mi.price, oi.quantity
            FROM order_items oi
            JOIN menu_items mi ON oi.product_id = mi.item_id
            WHERE oi.order_id = ?
        """
        cursor.execute(menu_items_query, (order_id,))
        items = cursor.fetchall()

        result = {
            "order_id": order_id,
            "restaurant_name": restaurant_name,
            "restaurant_image": restaurant_image,
            "order_time": order_time,
            "total_price": total_price,
            "delivery_address": delivery_address,
            "merchant_location": merchant_location,
            "items": [
                {"item_id": item[0], "name": item[1], "price": item[2], "quantity": item[3]}
                for item in items
            ]
        }

        conn.close()
        return jsonify(result), 200

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500


@app.route('/user-details', methods=['GET'])
def get_user_details():
    try:
        user_id = request.args.get('user_id', type=int)

        if not user_id:
            return jsonify({'error': 'User ID is required'}), 400

        conn = sqlite3.connect('./db/foodpanda.db')
        cursor = conn.cursor()

        query = """
            SELECT username, email, phone, address
            FROM users
            WHERE user_id = ?
        """
        cursor.execute(query, (user_id,))
        user = cursor.fetchone()

        if not user:
            return jsonify({'error': 'User not found'}), 404

        result = {
            'firstName': user[0],  # Assuming the first name is stored in the `username` field
            'lastName': '',        # Not available in your schema; leave blank or handle as needed
            'phone': user[2],
            'email': user[1],
            'address': user[3],
        }

        conn.close()
        return jsonify(result), 200

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500


@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user_details(user_id):
    try:
        data = request.get_json()

        if not data:
            return jsonify({'error': 'No data provided'}), 400

        # Extract fields to be updated
        first_name = data.get('firstName')
        last_name = data.get('lastName')
        phone = data.get('phoneNumber')
        email = data.get('email')
        address = data.get('address')
        new_password = data.get('newPassword')

        # Validation (optional but recommended)
        if not email or not phone:
            return jsonify({'error': 'Email and phone number are required'}), 400

        conn = sqlite3.connect('./db/foodpanda.db')
        cursor = conn.cursor()

        # Update query
        update_query = """
            UPDATE users
            SET username = ?, email = ?, phone = ?, address = ?
            WHERE user_id = ?
        """
        cursor.execute(update_query, (first_name, email, phone, address, user_id))

        # Update password only if a new password is provided
        if new_password:
            password_update_query = """
                UPDATE users
                SET password = ?
                WHERE user_id = ?
            """
            cursor.execute(password_update_query, (new_password, user_id))

        conn.commit()
        conn.close()

        return jsonify({'message': 'User updated successfully'}), 200

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
