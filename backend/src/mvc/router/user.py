from typing import Optional
from fastapi import APIRouter, Depends, Query
from starlette import status
from sqlalchemy.orm.session import Session

###
from src.lib.database import get_db
from src.baseClass.userBase import UserBase, UpdateUserBase, ResponseBase
from src.mvc.controller import user
from src.lib.dependency import db_dependency, require_signin, require_admin


router = APIRouter(prefix="/user", tags=["user"])


@router.post(
    "/create", status_code=status.HTTP_201_CREATED, response_model=ResponseBase
)
def createUser(request: UserBase, db: db_dependency):
    return user.create(db, request)


# Auth
@router.put("/update", status_code=status.HTTP_200_OK, response_model=ResponseBase)
def updateUser(request: UpdateUserBase, auth: require_signin, db: db_dependency):
    return user.update(db, auth, request)


# ADMIN
@router.put(
    "/update_by_admin", status_code=status.HTTP_200_OK, response_model=ResponseBase
)
def updateUser(
    request: UpdateUserBase, auth: require_admin, id: int, db: db_dependency
):
    return user.update_by_admin(db, id, request)


# ADMIN #list
@router.get("", response_model=ResponseBase)
def pipeline(
    auth: require_admin,
    db: db_dependency,
    searchTerm: Optional[str] = Query(None),
    columnSearchTerms: Optional[str] = Query(None),
    dateRange: Optional[str] = Query(None),
    skip: Optional[int] = Query(0),
    limit: Optional[int] = Query(10),
):
    return user.list(
        db,
        searchTerm,
        columnSearchTerms,
        dateRange,
        skip,
        limit,
    )


# ADMIN
@router.get("/read", status_code=status.HTTP_200_OK, response_model=ResponseBase)
def read(
    auth: require_admin,
    db: Session = Depends(get_db),
    id: Optional[int] = Query(None),
    firstname: Optional[str] = Query(None),
    lastname: Optional[str] = Query(None),
    email: Optional[str] = Query(None),
):
    return user.read(db, id, firstname, lastname, email)


# ADMIN
@router.get("/read_many", response_model=ResponseBase)
def read(
    auth: require_admin,
    ids: str = Query(str),
    db: Session = Depends(get_db),
):
    return user.read_many(db, ids)


# ADMIN
@router.delete("/delete/{id}")
def delete(auth: require_admin, db: db_dependency, id: int):
    return user.delete(db, id)


# ADMIN
@router.delete("/delete_many")
def delete_many(auth: require_admin, db: db_dependency, ids: str = Query(str)):
    return user.deleteMany(db, ids)
