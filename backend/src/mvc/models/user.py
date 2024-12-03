from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from .base import Base, TimeStampedModel
from sqlalchemy.orm import relationship


class User(TimeStampedModel, Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=True)
    firstname = Column(String(20), nullable=False)
    lastname = Column(String(20), nullable=True)
    password = Column(String, nullable=False)
    phone = Column(String(11), unique=True, nullable=False)
    is_active = Column(Boolean, default=True)
    role_id = Column(Integer, ForeignKey("roles.id"))  # dynamic add roles
    role = relationship(
        "Role", back_populates="users", uselist=False
    )  # Indicates one-to-one

    def __repr__(self):
        return f"<User(id={self.id}, email='{self.email}', username='{self.username}')>"
