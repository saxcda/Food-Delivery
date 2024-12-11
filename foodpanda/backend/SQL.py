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
