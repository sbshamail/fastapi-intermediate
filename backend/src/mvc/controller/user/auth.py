from datetime import datetime, timedelta, timezone
from typing import Any, Dict, Optional, Union
from fastapi import Depends, HTTPException, Request, status
from fastapi.responses import JSONResponse

from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm.session import Session

##
from src.baseClass.userBase import Login
from src.lib.database import get_db
from src.lib.config import ACCESS_TOKEN_EXPIRE_MINUTES

from .auth_dependency import authenticate_user, create_access_token, decode_token


def login(request: Login, db: Session = Depends(get_db)):
    user = authenticate_user(request.email, request.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Invalid credentials"
        )
    role = {
        "id": user.role.id,
        "name": user.role.name,
        "permissions": user.role.permissions,
    }

    access_token = create_access_token(
        user_data={"email": user.email, "id": user.id, "role": role},
    )
    refresh_token = create_access_token(
        user_data={"email": user.email, "id": user.id, "role": role},
        refresh=True,
        expiry=timedelta(days=30),
    )
    exp_time = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    return JSONResponse(
        content={
            "message": "Login successful",
            "token_type": "bearer",
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user": {"email": user.email, "id": user.id, "role": role},
            "exp": exp_time.isoformat(),
        }
    )


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
        return token_data

    def token_valid(self, token: str) -> bool:

        token_data = decode_token(token)

        return token_data is not None

    def verify_token_data(self, token_data: Dict[str, Any]) -> None:
        return
        # raise NotImplementedError("Please override this method in child classes")


require_token = Depends(RequireTokenClass())


class AdminRequireClass(RequireTokenClass):
    def verify_token_data(self, token_data: Dict[str, Any]) -> None:
        role = token_data["user"]["role"]["name"]
        if role != "admin":

            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have access to this resource",
            )


admin_require = Depends(AdminRequireClass())


class RefreshTokenBearer(RequireTokenClass):
    def verify_token_data(self, token_data: dict) -> None:
        if token_data and not token_data["refresh"]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Please provide a refresh token",
            )


requireRefreshToken = Depends(RefreshTokenBearer())


def refresh_token(token_details):
    if token_details:
        user_data = token_details["user"]
        access_token = create_access_token(user_data)
        exp_time = datetime.now(timezone.utc) + timedelta(
            minutes=ACCESS_TOKEN_EXPIRE_MINUTES
        )
        return JSONResponse(
            content={
                "access_token": access_token,
                "user": user_data,
                "exp": exp_time.isoformat(),
            }
        )
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token"
    )
