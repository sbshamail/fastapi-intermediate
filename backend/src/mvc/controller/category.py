import logging
from fastapi import HTTPException, status
from sqlalchemy.orm.session import Session


from src.baseClass.categoryBase import CategoryCreate, CategoryDisplay
from src.utils.models import Category

logger = logging.getLogger(__name__)


## Create Category Function ##
def create(db: Session, request: CategoryCreate):
    if request.parent_id:
        parent = db.query(Category).filter(Category.id == request.parent_id).first()
        if not parent:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Parent category with id {request.parent_id} not found",
            )
            # Check if the parent category is a child of another category (i.e., is at level 2)
        if parent.parent_id:
            grandparent = (
                db.query(Category).filter(Category.id == parent.parent_id).first()
            )
            if not grandparent:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Grandparent category with id {parent.parent_id} not found",
                )

            # Ensure we are not creating a category beyond the third level
            if grandparent.parent_id:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Cannot create category: exceeds maximum depth of 3 levels",
                )
    entry = Category(
        name=request.name, image=request.image, parent_id=request.parent_id
    )
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry


def nestedCategories(categories, parent_id: int = None):
    result = []
    for category in categories:
        if category.parent_id == parent_id:
            children = nestedCategories(categories, category.id)
            result.append(
                {
                    "id": category.id,
                    "name": category.name,
                    "image": category.image,
                    "parent_id": category.parent_id,
                    "children": children,
                }
            )

    return result


## List Category Function ##
def list(db: Session):
    categories = db.query(Category).all()
    result = nestedCategories(categories)
    return result


## List Category Function ##
def read(db: Session, id: int):
    article = db.query(Category).filter(Category.id == id).first()
    if not article:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Article with id {id} not found",
        )
    return article


## Update Category Function ##
def update(db: Session, id: int, request: CategoryCreate):
    data = db.query(Category).filter(Category.id == id).first()
    if not data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Category with id {id} not found",
        )
    data.name = request.name
    data.image = request.image
    data.parent_id = request.parent_id
    db.commit()
    return data


## Delete Category Function ##
def delete(db: Session, id: int):
    data = db.query(Category).filter(Category.id == id).first()
    if data is None:
        return {"error": "not found id"}
    db.delete(data)
    db.commit()
    return {"message": "delete Successfully"}
