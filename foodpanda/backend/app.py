from flask import Flask, request, jsonify
from flask_cors import CORS
from sendemail import sendEmail
from SQL import email_confirm, password_confirm
app = Flask(__name__)
CORS(app)

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

if __name__=='__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
