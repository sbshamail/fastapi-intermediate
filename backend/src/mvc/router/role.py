from typing import List
from fastapi import APIRouter
from src.baseClass.roleBase import RoleBase, RoleDisplay
from src.lib.dependency import db_dependency
from src.utils.helpers import dbModel
from src.mvc.models import Role


from src.mvc.controller import role

router = APIRouter(prefix="/role", tags=["role"])


@router.post("/create", response_model=RoleDisplay)
def create_role(request: RoleBase, db: db_dependency):
    return role.create(db, request)


@router.get("", response_model=List[RoleDisplay])
def list(db: db_dependency):
    return role.list(dbModel(db, Role))
