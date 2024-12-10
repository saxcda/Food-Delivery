from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib

EMAIL = 'travelers.heaven.workspace@gmail.com'
APCODE = 'ttof bkjh mpax gjbc'

def send_forgetpassword_email(user_email, new_password):
    content = MIMEMultipart()
    content["subject"] = "您的foodpanda密碼！"
    content["from"] = EMAIL
    content["to"] = user_email
    # Email HTML 內容
    email_body = f"""
                  <div style="width:100%; background-color:#ffffff; margin:0; padding:0; font-family:'Avenir Next LT Pro',Helvetica,Arial,'Roboto',sans-serif;">
                    <center>
                      <div style="max-width:700px; margin:auto;">
                        <!-- Header -->
                        <div style="background-color:#F7C6CC; text-align:center; padding:50px 0;">
                          <h1 style="color:#ffffff; font-size:32px; font-weight:bold; margin:0;">您的foodpanda密碼</h1>
                        </div>
                        <!-- Body -->
                        <div style="background-color:#ffffff; padding:20px;">
                          <p style="font-size:16px; color:#02171a; line-height:1.6; text-align: left;">
                            <br><br>
                            我們收到了您變更密碼的需求，你的新密碼為: {new_password}。<br>
                            <strong>提示：</strong>新密碼可能需要幾分鐘更新，如無法立即登入，請稍後2分鐘再試。
                          </p>
                        </div>
                        <!-- Footer -->
                        <div style="background-color:#F7C6CC; text-align:center; padding:20px 0;">
                          <p style="font-size:12px; color:#000000;">
                            <a href="https://www.foodpanda.com.tw/contents/privacy.htm" style="color:#000; text-decoration:none;">隱私條款</a> | 
                            <a href="https://www.foodpanda.com.tw/contents/terms-and-conditions.htm" style="color:#000; text-decoration:none;">服務使用規範</a>
                          </p>
                          <p style="font-size:12px; color:#000000;">
                            106 台北市大安區敦化南路二段 319 號
                          </p>
                          <p style="font-size:14px; color:#D70F64; font-weight:bold;">
                            © foodpanda Taiwan
                          </p>
                        </div>
                      </div>
                    </center>
                  </div>
                  """
    # 將 HTML 添加到郵件內容
    content.attach(MIMEText(email_body, "html"))
    # 發送郵件
    try:
        with smtplib.SMTP(host="smtp.gmail.com", port=587) as smtp:
            smtp.ehlo()
            smtp.starttls()
            smtp.login(EMAIL, APCODE)
            smtp.send_message(content)
            print("驗證信發送成功！")
    except Exception as e:
        print("發送驗證信時發生錯誤：", e)

