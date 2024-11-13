from datetime import timedelta, timezone, datetime
from typing import Any, Dict, Optional, Union
from fastapi import Depends, HTTPException, Request, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pytest import Session
from jose import jwt, JWTError

from src.lib.hash import Hash
from src.mvc.models import User


SECRET_KEY = "fba012a2a0c9c3d884fdf15843f2aa438bac1b5e8527875ecd7187e3ce494158"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 10


def exist_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def authenticate_user(email: str, password: str, db):
    user = exist_email(db, email)
    if not user:
        return False
    if not Hash.verify(password, user.password):
        print("Password verification failed")
        return False
    return user


def create_access_token(
    user_data: dict, expiry: Optional[timedelta] = None, refresh: Optional[bool] = False
):
    payload = {
        "user": user_data,
        "exp": datetime.now(timezone.utc)
        + (
            expiry
            if expiry is not None
            else timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        ),
        "refresh": refresh,
    }

    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token


def decode_token(token: str) -> Optional[Dict]:
    try:
        token_data = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
            options={"verify_exp": True},  # Ensure expiration is verified
        )

        return token_data

    except JWTError as e:
        print(f"Token decoding failed: {e}")
        return None


def admin_require(auth: dict = Depends(decode_token)):
    if auth is None or auth.get("role") != "admin":
        raise HTTPException(status_code=401, detail="you are not authorized user")
    return auth


class RequireTokenClass(HTTPBearer):
    def __init__(self, auto_error=True):
        super().__init__(auto_error=auto_error)

    async def __call__(self, request: Request) -> Union[Dict[str, Any], None]:
        creds: Optional[HTTPAuthorizationCredentials] = await super().__call__(request)
        if creds is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Authorization credentials are missing",
            )

        token = creds.credentials
        token_data = decode_token(token)
        if token_data is None:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="401 Error,Invalid or expired token",
            )

        # print(token_data)
        if not self.token_valid:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, detail="Invalid or expired token"
            )

        self.verify_token_data(token_data)

    def token_valid(self, token: str) -> bool:

        token_data = decode_token(token)

        return token_data is not None

    def verify_token_data(self, token_data: Dict[str, Any]) -> None:
        return token_data
        raise NotImplementedError("Please override this method in child classes")


class AccessTokenBearer(RequireTokenClass):
    def verify_token_data(self, token_data: dict) -> None:
        if token_data and token_data["refresh"]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Please provide an access token",
            )


class RefreshTokenBearer(RequireTokenClass):
    def verify_token_data(self, token_data: dict) -> None:
        if token_data and not token_data["refresh"]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Please provide a refresh token",
            )
