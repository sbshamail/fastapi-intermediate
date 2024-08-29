from datetime import datetime, timedelta, timezone
from typing import Annotated, Dict, Optional
from fastapi import Depends, HTTPException, Request, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt, JWTError
from sqlalchemy.orm.session import Session

##
from backend.baseClass.userBase import Login
from backend.utils.database import get_db
from backend.utils.hash import Hash
from backend.utils.models import User


# SECRET_KEY = "fba012a2a0c9c3d884fdf15843f2aa438bac1b5e8527875ecd7187e3ce494158"
# ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

db_dependency = Annotated[Session, Depends(get_db)]


def get_token_from_header_or_cookie(request: Request):
    # Extract token from the 'Authorization' header or 'jwt' cookie
    token = request.cookies.get("jwt")
    if not token:
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header.split(" ")[1]
    return token


def authenticate_user(token: str):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        identifier: str = payload.get("sub")
        if identifier is None:
            raise credentials_exception
        return {"identifier": identifier}
    except JWTError:
        raise credentials_exception


async def require_signin(request: Request):
    token = get_token_from_header_or_cookie(request)
    print(token)
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized!, Auth Token Not Found",
        )
    user = authenticate_user(token)
    return user


def authorize_require(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        user_id: int = payload.get("id")
        email = payload.get("sub")
        role = payload.get("role")
        if email is None:
            raise ValueError
        return {"email": email, "user_id": user_id, "role": role}
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate user.",
            headers={"WWW-Authenticate": "Bearer"},
        )


def get_user(user: Dict[str, str], db: Session = Depends(get_db)):
    if user is None or user.get("id") is None:
        raise HTTPException(status_code=401, detail="Authentication Failed")
    return db.query(User).filter(User.id == user.get("id")).first()


def admin_require(user: str = Depends(authorize_require)):
    if user is None or user.get("role") != "admin":
        raise HTTPException(status_code=401, detail="Authentication Failed")
    return user


def create_access_token(
    username: str,
    email: str,
    user_id: int,
    role: str,
    expires_delta: Optional[timedelta] = None,
):
    now = datetime.now(timezone.utc)
    if expires_delta:
        expires = now + expires_delta
    else:
        expires = now + timedelta(minutes=15)
    to_encode = {
        "sub": email,
        "username": username,
        "id": user_id,
        "role": role,
    }
    to_encode.update({"exp": expires})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# def authenticate_user(email: str, password: str, db):
#     user = db.query(User).filter(User.email == email).first()

#     if not Hash.verify(password, user.password):
#         print("Password verification failed")

#     return user


def get_token(request: Login, db: Session = Depends(get_db)):
    print(request)
    user = authenticate_user(request.email, request.password, db)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Invalid credentials"
        )

    access_token = create_access_token(
        username=user.username,
        email=user.email,
        user_id=user.id,
        role=user.role,
        expires_delta=timedelta(minutes=20),
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": user.id,
        "email": user.email,
        "username": user.username,
        "role": user.role,
        "exp": datetime.now(timezone.utc)
        + timedelta(minutes=20),  # 20 minutes expiry time
    }
