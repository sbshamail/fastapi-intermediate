from typing import Any, Dict
from fastapi import APIRouter, HTTPException

##
from src.mvc.controller.user.auth import (
    forget,
    login,
    require_token,
    admin_require,
    refresh_token,
    reset_password,
)
from src.baseClass.userBase import LoginBase, ForgetBase, ResetPasswordBase, UserDisplay
from src.lib.dependency import db_dependency, require_refresh_token, require_signin
from src.utils.smtp import send_email

router = APIRouter(tags=["auth"])


@router.post("/login")
def signin(request: LoginBase, db: db_dependency):
    return login(db, request)


@router.post("/forget")
def forget_password(request: ForgetBase, db: db_dependency):
    return forget(db, request)


@router.post("/reset-password")
def reset_passw(request: ResetPasswordBase, auth: require_signin, db: db_dependency):
    return reset_password(db, auth, request)


@router.get("/refresh_token")
def refreshToken(token_details: require_refresh_token):
    print(token_details)
    return refresh_token(token_details)


@router.post("/send-email/")
async def send_email():
    try:
        send_email("Test Email", "this is the email", "mhamail021@gmail.com")
        return {"message": "Email sent successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/test-auth")
def token_require(auth: Dict[str, Any] = require_token):
    print(auth)
    return {"auth_data": auth}


@router.get("/test-admin")
def admin_only(auth: Dict[str, Any] = admin_require):
    return {"message": "Welcome, admin!", "auth_data": auth}
