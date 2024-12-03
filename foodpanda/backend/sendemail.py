from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib
import random
import string

EMAIL = 'travelers.heaven.workspace@gmail.com'
APCODE = 'ttof bkjh mpax gjbc'

def generate_random_string(length):
    characters = string.ascii_uppercase + string.digits
    return ''.join(random.choice(characters) for _ in range(length))

def sendEmail(userEmail):
    random_string = generate_random_string(6)

    content = MIMEMultipart()  #建立MIMEMultipart物件
    content["subject"] = "Account verification"  #郵件標題
    content["from"] = EMAIL  #寄件者
    content["to"] = userEmail #收件者
    content.attach(MIMEText("Hello! We are travelers.heaven.workspace, Your verification code is: " + random_string))  #郵件內容

    with smtplib.SMTP(host="smtp.gmail.com", port="587") as smtp:  # 設定SMTP伺服器
        try:
            smtp.ehlo()  # 驗證SMTP伺服器
            smtp.starttls()  # 建立加密傳輸
            smtp.login(EMAIL, APCODE)  # 登入寄件者gmail
            smtp.send_message(content)  # 寄送郵件
            print("Complete!")
        except Exception as e:
            print("Error message: ", e)

    return random_string
