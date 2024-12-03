import sqlite3

def email_confirm(email):
    conn = sqlite3.connect("./db/foodpanda.db")
    cursor = conn.cursor()
    query = "SELECT email FROM users WHERE email = ?"
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
