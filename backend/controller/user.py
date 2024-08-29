from sqlalchemy.orm.session import Session
from backend.baseClass.userBase import UserBase
from backend.utils.hash import Hash
from backend.utils.models import User


## Create User Function ##
def create(db: Session, request: UserBase):
    create_user = User(
        username=request.username,
        email=request.email,
        password=Hash.crypt(request.password),
        role=request.role,
    )
    db.add(create_user)
    db.commit()
    db.refresh(create_user)
    return create_user


## Get All User Function ##
