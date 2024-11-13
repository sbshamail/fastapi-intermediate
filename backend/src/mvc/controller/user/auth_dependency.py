from fastapi import HTTPException, status
from fastapi.responses import JSONResponse
from src.lib.config import ACCESS_TOKEN_EXPIRE_MINUTES, ALGORITHM, SECRET_KEY
from sqlalchemy.orm.session import Session
from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone
from typing import Dict, Optional

##
from src.lib.hash import Hash
from src.mvc.models.user import User


## get user
def exist_user(db: Session, email: str):
    user = db.query(User).filter(User.email == email).first()
    return user


def authenticate_user(email: str, password: str, db: Session):
    user = exist_user(db, email)
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
