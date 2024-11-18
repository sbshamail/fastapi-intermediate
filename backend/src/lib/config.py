import os
from dotenv import load_dotenv

# from pydantic_settings import BaseSettings

load_dotenv()
# print(type(int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))))

# class Settings(BaseSettings):
#     SECRET_KEY: str
#     ALGORITHM: str
#     ACCESS_TOKEN_EXPIRE_MINUTES: int

#     class Config:
#         env_file = ".env"


# env = Settings()


# SECRET_KEY = env.SECRET_KEY
# ALGORITHM = env.ALGORITHM
# ACCESS_TOKEN_EXPIRE_MINUTES = env.ACCESS_TOKEN_EXPIRE_MINUTES

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))
#-> db
db = os.getenv("db")
testdb = os.getenv("testdb")
# db = "postgresql://postgres:123@localhost:5432/marketdb"
# testdb = "postgresql://postgres:123@localhost:5432/testdb"
#<-db
#-> smtp
app_password_gmail=os.getenv("app_password_gmail")
sender_email=os.getenv("sender_email")
smtp_gmail_port=os.getenv("smtp_gmail_port")
#<-smtp
#-> app urls
authurl=os.getenv("authurl")
clienturl=os.getenv("clienturl")
#<-app urls






