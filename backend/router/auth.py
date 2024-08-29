from fastapi import Depends, HTTPException, APIRouter
from fastapi.security import OAuth2PasswordRequestForm
from pytest import Session

##
from backend.controller import user, auth
from backend.utils.database import get_db
from backend.baseClass.userBase import Login

router = APIRouter(tags=["auth"])


@router.post("/token")
def login(request: Login = Depends(), db: Session = Depends(get_db)):
    return auth.get_token(request, db)
