import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from src.lib.config import sender_email,app_password_gmail,smtp_gmail_port

def send_email(subject: str, body: str, to_email: str):
    sender_email
    password = app_password_gmail  # Use app password if 2FA is enabled

    # Set up the server and port (Gmail SMTP server)
    server = smtplib.SMTP_SSL("smtp.gmail.com", smtp_gmail_port)

    try:
        server.login(sender_email, password)
        # Create the email message
        message = MIMEMultipart()
        message["From"] = sender_email
        message["To"] = to_email
        message["Subject"] = subject
        
        # Add body to email
        message.attach(MIMEText(body, "plain"))

        # Send the email
        server.sendmail(sender_email, to_email, message.as_string())
        print("Email sent successfully!")

    except Exception as e:
        print(f"Failed to send email: {e}")
    finally:
        server.quit()