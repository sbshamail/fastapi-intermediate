from typing import List, Optional
from fastapi import APIRouter, Query, status
from src.baseClass.roleBase import RoleBase, RoleDisplay, ListDisplay
from src.lib.dependency import db_dependency, require_admin
from src.utils.helpers import dbModel
from src.mvc.models import Role
from src.mvc.controller import role

router = APIRouter(prefix="/role", tags=["role"])


@router.post("/create", status_code=status.HTTP_201_CREATED, response_model=RoleDisplay)
def create_role(request: RoleBase, auth: require_admin, db: db_dependency):
    return role.create(db, request)


# @router.get("", response_model=List[RoleDisplay])
# def list(db: db_dependency):
#     return role.list(dbModel(db, Role))


# list
@router.get("", response_model=ListDisplay)
def pipeline(
    db: db_dependency,
    searchTerm: Optional[str] = None,
    columnSearchTerms: Optional[str] = Query(None),
    dateRange: Optional[str] = Query(None),
    skip: Optional[int] = Query(0),
    limit: Optional[int] = Query(10),
):
    return role.list(
        db,
        searchTerm,
        columnSearchTerms,
        dateRange,
        skip,
        limit,
    )
