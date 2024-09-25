from sqlalchemy import Column, ForeignKey, Integer, String
from .base import Base, TimeStampedModel


class Category(TimeStampedModel, Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    image = Column(String)
    parent_id = Column(Integer, ForeignKey("categories.id"))  # for child category
