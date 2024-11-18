from fastapi import APIRouter, Depends, HTTPException
from pytest import Session
from starlette import status

from src.baseClass.categoryBase import CategoryCreate, CategoryDisplay
from lib.database import get_db
from src.lib.dependency import db_dependency, require_token_dependency
from src.mvc.controller import category

router = APIRouter(prefix="/category", tags=["category"])


@router.post("/create", response_model=CategoryDisplay)
def create(request: CategoryCreate, db: db_dependency):
    return category.create(db, request)


@router.get("/list")
def list(db: db_dependency):
    result = category.list(db)
    return {"data": result}


@router.get("/{id}")
def read(id: int, db: db_dependency):
    result = category.read(db, id)
    return {"data": result}


@router.put("/{id}", response_model=CategoryDisplay, status_code=status.HTTP_200_OK)
def update(
    auth: require_token_dependency, id: int, db: db_dependency, request: CategoryCreate
):
    return category.update(db, id, request)


@router.delete("/{id}", status_code=status.HTTP_200_OK)
def delete(id: int, db: db_dependency):
    return category.delete(db, id)
