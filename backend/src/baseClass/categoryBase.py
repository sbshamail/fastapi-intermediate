from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel


class CategoryBase(BaseModel):
    parent_id: Optional[int] = None
    name: str
    image: Optional[str] = None


class CategoryCreate(CategoryBase):
    pass


class CategoryDisplay(CategoryBase):
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True


class Category(CategoryBase):
    children: List["Category"] = []

    class Config:
        from_attributes = True
