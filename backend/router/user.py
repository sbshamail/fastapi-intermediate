from fastapi import APIRouter, Depends
from typing import Annotated, Dict
from fastapi.security import OAuth2PasswordRequestForm
from starlette import status
from sqlalchemy.orm.session import Session

###
from backend.utils.database import get_db
from backend.baseClass.userBase import UserBase, Login
from backend.controller import user, auth

router = APIRouter(prefix="/user", tags=["user"])

db_dependency = Annotated[Session, Depends(get_db)]


@router.post("/signin")
def signin(request: Login = Depends(), db: Session = Depends(get_db)):
    return auth.get_token(request, db)


@router.post("/create", status_code=status.HTTP_201_CREATED)
def createUser(request: UserBase, db: db_dependency):
    return user.create(db, request)


@router.get("/read")
def read(
    user: Dict[str, str] = Depends(auth.authorize_require),
    db: Session = Depends(get_db),
):
    print(user)
    # return auth.get_user(user, db)
