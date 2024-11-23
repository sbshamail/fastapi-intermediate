import bcrypt
from passlib.context import CryptContext


pwd_cxt = CryptContext(schemes=["bcrypt"], deprecated="auto")


class Hash:
    @staticmethod
    def crypt(password: str) -> str:
        """Hash a password."""
        return pwd_cxt.hash(password)

    @staticmethod
    def verify(plain_password: str, hashed_password: str) -> bool:
        """Verify a password against a hashed password."""
        is_verified = pwd_cxt.verify(plain_password, hashed_password)
        return is_verified
       
    
    # test
        # plain_password = "123456"
        # hashed_password = bcrypt.hashpw(plain_password.encode('utf-8'), bcrypt.gensalt())
        # is_verified = bcrypt.checkpw("123456".encode('utf-8'), hashed_password)
        # print("Password verification:", is_verified)
        # print("Hashed password:", hashed_password)
