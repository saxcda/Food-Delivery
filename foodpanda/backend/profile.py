from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)

# Configuration for SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////Users/hans/Documents/軟體工程/FoodPanda/Food-delivery/foodpanda/backend/db/foodpanda.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app)  # Enable CORS for cross-origin requests

# Define the `users` table
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

# Run the server
if __name__ == '__main__':
    app.run(debug=True)
