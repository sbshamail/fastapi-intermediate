from sqlalchemy.orm.session import Session
from sqlalchemy.orm.query import Query

from src.baseClass.roleBase import RoleBase
from src.mvc.models.role import Role


def create(db: Session, request: RoleBase):
    create = Role(name=request.name, permissions=request.permissions)
    db.add(create)
    db.commit()
    print(create)
    return create


def list(model: Query):
    data = model.all()
    return data
