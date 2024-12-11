import sqlite3

def email_confirm(email):
    conn = sqlite3.connect("./db/foodpanda.db")
    cursor = conn.cursor()
    query = "SELECT * FROM users WHERE email = ?"
    cursor.execute(query, (email,))
    result = cursor.fetchone()
    print(f"Query executed: {query} with parameter: {email}")
    print(f"Result: {result}")
    conn.close()
    return result

def password_confirm(email):
    conn = sqlite3.connect("./db/foodpanda.db")
    cursor = conn.cursor()
    query = "SELECT password FROM users WHERE email = ?"
    cursor.execute(query, (email,))
    result = cursor.fetchone()
    print(email)
    print(f"Query executed: {query} with parameter: {email}")
    print(result)
    conn.close()
    return result[0] if result else None

def update_password(email, new_password):
    try:
        conn = sqlite3.connect("./db/foodpanda.db")
        cursor = conn.cursor()
        query = "UPDATE users SET password = ? WHERE email = ?"
        cursor.execute(query, (new_password, email))
        conn.commit()
        result = cursor.fetchone()
        print(result)
        conn.close()
        if cursor.rowcount > 0:
            conn.close()
            return {"success": True, "message": "密碼更新成功"}
        else:
            conn.close()
            return {"success": False, "message": "密碼更新失敗"}
    except sqlite3.Error as e:
        # 處理資料庫錯誤
        return {"success": False, "message": f"資料庫錯誤: {e}"}

def insert_user(email, full_name, password):
    try:
        conn = sqlite3.connect("./db/foodpanda.db")
        cursor = conn.cursor()
        cursor.execute("SELECT MAX(user_id) FROM users")
        max_user_id = cursor.fetchone()[0]
        # 設置新用戶的 user_id
        new_user_id = (max_user_id or 0) + 1
        query = """
        INSERT INTO users (user_id, username, password, email, phone, address, user_type, membership_status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """
        cursor.execute(query, (new_user_id, full_name, password, email, None, None, '會員', None))
        conn.commit()
        result = cursor.fetchone()
        print(result)
        conn.close()
        if cursor.rowcount > 0:
            conn.close()
            return {"success": True, "message": "個人資訊插入成功"}
        else:
            conn.close()
            return {"success": False, "message": "個人資訊插入失敗"}
    except sqlite3.Error as e:
        # 處理資料庫錯誤
        return {"success": False, "message": f"資料庫錯誤: {e}"}
    

def insert_order(user_id, merchant_id, delivery_id, order_status, total_price, order_time, delivery_address):
    try:
        # Connect to the SQLite database
        conn = sqlite3.connect("./db/foodpanda.db")
        cursor = conn.cursor()

        # Get the next available order_id
        cursor.execute("SELECT MAX(order_id) FROM orders")
        max_order_id = cursor.fetchone()[0]
        new_order_id = (max_order_id or 0) + 1

        # Insert the order into the orders table
        query = """
        INSERT INTO orders (order_id, user_id, merchant_id, delivery_id, order_status, total_price, order_time, delivery_address)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """
        cursor.execute(query, (
            new_order_id, user_id, merchant_id, delivery_id, order_status, total_price, order_time, delivery_address
        ))

        conn.commit()
        rows_affected = cursor.rowcount
        conn.close()

        if rows_affected > 0:
            return {"success": True, "message": "訂單插入成功", "order_id": new_order_id}
        else:
            return {"success": False, "message": "訂單插入失敗"}

    except sqlite3.Error as e:
        # Handle database errors
        return {"success": False, "message": f"資料庫錯誤: {e}"}

def insert_order_item(order_id, product_id, quantity, price):
    try:
        # Connect to the SQLite database
        conn = sqlite3.connect("./db/foodpanda.db")
        cursor = conn.cursor()

        # Get the next available order_item_id
        cursor.execute("SELECT MAX(order_item_id) FROM order_items")
        max_order_item_id = cursor.fetchone()[0]
        new_order_item_id = (max_order_item_id or 0) + 1

        # Insert the order item into the order_items table
        query = """
        INSERT INTO order_items (order_item_id, order_id, product_id, quantity, price)
        VALUES (?, ?, ?, ?, ?)
        """
        cursor.execute(query, (new_order_item_id, order_id, product_id, quantity, price))

        conn.commit()
        rows_affected = cursor.rowcount
        conn.close()

        if rows_affected > 0:
            return {"success": True, "message": "訂單項目插入成功"}
        else:
            return {"success": False, "message": "訂單項目插入失敗"}

    except sqlite3.Error as e:
        # Handle database errors
        return {"success": False, "message": f"資料庫錯誤: {e}"}

