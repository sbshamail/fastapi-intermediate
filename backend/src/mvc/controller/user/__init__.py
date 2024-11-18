import json
from typing import Any, Dict, List, Optional
from fastapi import HTTPException

from fastapi.responses import JSONResponse
from sqlalchemy import or_
from sqlalchemy.orm.session import Session

##src
from src.baseClass.userBase import UserBase
from src.lib.hash import Hash
from src.mvc.models import User, Role
from src.utils.operation import createop, updateOp, listop, filterRefactoring

# auth
from .auth_dependency import exist_user

# on first user create role
def first_user_create_role(db: Session,user):
    if db.query(User).count() == 0:
        # Create the "admin" role if it's the first user
        admin_role = Role(id=1, name="admin", permissions=["all"])
        user_role = Role(id=2, name="user", permissions=["view"])
        db.add(admin_role)
        db.add(user_role)
        db.flush()  # Make sure the admin role has an ID before proceeding
        # Assign the "admin" role to the user being created
        role_id = admin_role.id
        user.id = 1
    else:
        # Assign the default role (if it's not the first user)
        role_id = 2
    return role_id
    
## Create User Function ##
def create(db: Session, request: UserBase):
    db_user = exist_user(db, email=request.email)
    if db_user:
        raise HTTPException(status_code=400, detail="this user already exist")

    fields = ["username", "email", "phone"]
    create_doc = createop(User, request, fields)
    create_doc.password = Hash.crypt(request.password)
    # Assign the role_id (either admin or default)
    create_doc.role_id = first_user_create_role(db,create_doc)  
    db.add(create_doc)
    db.commit()
    db.refresh(create_doc)
    return {
        "data": create_doc,  # The created user
        "message": "User Create Successfully",  # Success message
     }
 

def get_user(user: Dict[str, str], db: Session):
    if user is None or user.get("id") is None:
        raise HTTPException(status_code=401, detail="Authentication Failed")
    return db.query(User).filter(User.id == user.get("id")).first()


def list(
    db: Session,
    searchTerm: str,
    columnSearchTerms: List,
    dateRange: List,
    skip: int,
    limit: int,
):
    filters = filterRefactoring(searchTerm, columnSearchTerms, dateRange)
    results = listop(db, User, filters, skip, limit)
    return results


def update(db: Session, auth: Dict[str, Any], request: UserBase):
    # print(auth["user"])
    if auth["user"] is None and auth["user"]["id"] is None:
        raise HTTPException(status_code=401, detail="Auth Required")
    id = auth["user"]["id"]

    instance = db.query(User).filter(User.id == id).first()

    # Update only the fields that are provided in the request
    update_fields = ["phone", "username", "email"]
    updateOp(instance, request, update_fields)

    # Commit the changes
    db.commit()

    # Refresh the session to get the updated item
    db.refresh(instance)
    return {
        "data": instance,
        "message": "Update User Successfully",  # Success message
     }


def update_by_admin(db: Session, id: int, request: UserBase):
    item = db.query(User).filter(User.id == id).first()
    if item is None:
        raise HTTPException(status_code=401, detail="Item not found.")

    # Update only the fields that are provided in the request
    update_fields = ["phone", "username", "email", "role_id"]
    updateOp(item, request, update_fields)

    # Commit the changes
    db.commit()

    # Refresh the session to get the updated item
    db.refresh(item)
    # Return the updated item
    return {
        "data": item,
        "message": "Update User Successfully",  # Success message
     }


def read(
    db: Session,
    id: Optional[int] = None,
    username: Optional[str] = None,
    email: Optional[str] = None,
):
    filters = []
    if id:
        filters.append(User.id == id)
    if email:
        filters.append(User.email.like(f"%{email}%"))
    if username:
        filters.append(User.username.like(f"%{username}%"))

    item = db.query(User).filter(or_(*filters)).first()

    if item is None or id is None and username is None and email is None:
        raise HTTPException(status_code=404, detail="Item not found.")
    return {
        "data": item,
        "message": "ok",  # Success message
     }


def read_many(db: Session, ids: List[int]):
    parse_ids = json.loads(ids)  # parse
    user = db.query(User).filter(User.id.in_(parse_ids)).all()
    if user is None:
        raise HTTPException(status_code=404, detail="Item not found.")
    return {"data": user, "total": len(user)}


def delete(db: Session, id: int):
    item = db.query(User).filter(User.id == id).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found.")
    db.delete(item)
    db.commit()
    return {"detail": f"Delete User Sucessfully where id is {item.id}"}


def deleteMany(db: Session, ids: List[int]):
    deleted_count = (
        db.query(User).filter(User.id.in_(ids)).delete(synchronize_session=False)
    )

    if deleted_count == 0:
        raise HTTPException(status_code=404, detail="Items not found.")

    db.commit()  # Commit the transaction

    return {"deleted_count": deleted_count, "detail": "Users deleted successfully"}
