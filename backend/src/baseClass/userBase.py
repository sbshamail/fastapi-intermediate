from typing import Any, List, Optional, Union
from pydantic import BaseModel, EmailStr, Field, field_validator, model_validator, root_validator
from datetime import datetime
from src.baseClass.roleBase import RoleDisplay


class UserBase(BaseModel):
    username: str = Field(min_length=3)
    email: str = Field(EmailStr)
    phone: str = Field(min_length=11)
    password: str = Field(min_length=3)

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v):
        if not v.isdigit():
            raise ValueError("Phone number must contain only digits")
        if len(v) < 11:
            raise ValueError("Phone number must be at least 11 digits long")
        return v


class LoginBase(BaseModel):
    email: str
    password: str

class ForgetBase(BaseModel):
    email: str
    
class ResetPasswordBase(BaseModel):
    new_password: Optional[str] = Field(None, min_length=3)
    password_match:Optional[str] = Field(None, min_length=3)
     # Root validator to ensure that the new_password and password_match match
    @model_validator(mode='before')
    def check_password_match(cls, values):
        new_password = values.get('new_password')
        password_match = values.get('password_match')

        # Check if the passwords match
        if new_password != password_match:
            raise ValueError('Passwords do not match')

        return values

class UpdateUserBase(BaseModel):
    username: Optional[str] = Field(None, min_length=3)
    email: Optional[str] = Field(None)
    phone: Optional[str] = Field(None, min_length=11)
    password: Optional[str] = Field(None, min_length=3)

    class Config:
        from_attributes = True


class UserDisplay(BaseModel):
    id: int
    username: str
    email: str
    phone: Optional[str]
    role_id: Optional[int]
    role: Optional[RoleDisplay]
    is_active: bool
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True

class ResponseBase(BaseModel):
    data: Union[List[UserDisplay], UserDisplay]
    message: str = "ok"
    total: Optional[int]=1
    

