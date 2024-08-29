from typing import List
from pydantic import BaseModel


class UserBase(BaseModel):
    username: str
    email: str
    password: str
    role: str


class Login(BaseModel):
    email: str
    password: str


class UserDisplay(BaseModel):
    username: str
    email: str
    role: str

    class Config:
        from_attributes = True
