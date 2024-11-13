from typing import Any, Dict
from fastapi import APIRouter

##
from src.mvc.controller.user import login, require_token, admin_require, refresh_token
from src.baseClass.userBase import Login, UserDisplay
from src.lib.dependency import db_dependency, require_refresh_token


router = APIRouter(tags=["auth"])


@router.post("/login")
def signin(request: Login, db: db_dependency):
    return login(request, db)


@router.get("/refresh_token")
def refreshToken(token_details: require_refresh_token):
    print(token_details)
    return refresh_token(token_details)


@router.get("/test-auth")
def token_require(auth: Dict[str, Any] = require_token):
    print(auth)
    return {"auth_data": auth}


@router.get("/test-admin")
def admin_only(auth: Dict[str, Any] = admin_require):
    return {"message": "Welcome, admin!", "auth_data": auth}
