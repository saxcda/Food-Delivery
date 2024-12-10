from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import sqlite3

from sendemail import sendEmail
from SQL import email_confirm, password_confirm

app = Flask(__name__)
# Configuration for SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////Users/YPLab/AppData/Local/anaconda3/envs/foodpanda/Code/Food-Delivery/foodpanda/backend/db/foodpanda.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
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
    restaurants = [{"id": row[0], "name": row[1], "delivery_time": row[2], "price_range": row[3], "offer": row[4]} for row in cursor.fetchall()]
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

class User(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(100))
    phone = db.Column(db.String(15))
    address = db.Column(db.String(255))
    user_type = db.Column(db.Text, nullable=False)
    membership_status = db.Column(db.Text)

# Route to fetch user data by ID
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify({
            "firstName": user.username.split(" ")[0] if " " in user.username else user.username,
            "lastName": user.username.split(" ")[1] if " " in user.username else "",
            "phone": user.phone,
            "email": user.email,
            "address": user.address,
        })
    return jsonify({"error": "User not found"}), 404

# Route to update user data by ID
@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.json
    user.username = f"{data.get('firstName')} {data.get('lastName')}".strip()
    user.phone = data.get("phoneNumber", user.phone)
    user.email = data.get("email", user.email)
    user.address = data.get("address", user.address)
    db.session.commit()
    return jsonify({"message": "User updated successfully"})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
