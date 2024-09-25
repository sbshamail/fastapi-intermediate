from sqlalchemy import Boolean, Column, Integer, String, ARRAY
from .base import Base, TimeStampedModel
from sqlalchemy.orm import relationship


class Role(TimeStampedModel, Base):
    __tablename__ = "roles"
    id = Column(Integer, primary_key=True, autoincrement=True)

    name = Column(String(80), nullable=False)
    permissions = Column(ARRAY(String), nullable=False)
    # one to many, one role have many users
    users = relationship(
        "User",
        back_populates="role",
    )
