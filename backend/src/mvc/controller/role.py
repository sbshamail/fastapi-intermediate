from typing import List
from sqlalchemy.orm.session import Session
from sqlalchemy.orm.query import Query

from src.baseClass.roleBase import RoleBase
from src.mvc.models.role import Role
from src.utils.operation import createop, listop, filterRefactoring


def create(db: Session, request: RoleBase):
    create = Role(name=request.name, permissions=request.permissions)
    db.add(create)
    db.commit()
    print(create)
    return create


# def list(model: Query):
#     data = model.all()
#     return data


def list(
    db: Session,
    searchTerm: str,
    columnSearchTerms: List,
    dateRange: List,
    skip: int,
    limit: int,
):
    filters = filterRefactoring(searchTerm, columnSearchTerms, dateRange)
    results = listop(db, Role, filters, skip, limit)
    return results
