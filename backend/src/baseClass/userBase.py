from typing import Any, List, Optional, Union
from pydantic import (
    BaseModel,
    EmailStr,
    Field,
    ValidationError,
    field_validator,
    model_validator,
    AfterValidator,
)
from datetime import datetime
from src.baseClass.roleBase import RoleDisplay


class UserBase(BaseModel):

    firstname: str = Field(..., min_length=3)  # don't contain spaces
    lastname: Optional[str] = Field(None, min_length=3)  # Optional
    email: Optional[EmailStr] = Field(None)  # Optional
    phone: str = Field(..., min_length=11, pattern=r"^\d{11}$")
    password: str = Field(min_length=3)
    confirmPassword: str = Field(min_length=3)

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v):
        if not v.isdigit():
            raise ValueError("Phone number must contain only digits")
        if len(v) < 11:
            raise ValueError("Phone number must be at least 11 digits long")
        return v

    @model_validator(mode="before")
    def check_password_match(cls, values):
        password = values.get("password")
        confirmPassword = values.get("confirmPassword")

        # Check if the passwords match
        if password != confirmPassword:
            raise ValueError("Passwords do not match")
        return values

        # Root validator to remove undefined or empty fields

    @model_validator(mode="before")
    def remove_empty_fields(cls, values):
        # Remove None or empty string values
        return {key: value for key, value in values.items() if value not in [None, ""]}


class LoginBase(BaseModel):
    email: str
    password: str


class ForgetBase(BaseModel):
    email: str


class ResetPasswordBase(BaseModel):
    new_password: Optional[str] = Field(None, min_length=3)
    password_match: Optional[str] = Field(None, min_length=3)

    # Root validator to ensure that the new_password and password_match match
    @model_validator(mode="before")
    def check_password_match(cls, values):
        new_password = values.get("new_password")
        password_match = values.get("password_match")

        # Check if the passwords match
        if new_password != password_match:
            raise ValueError("Passwords do not match")

        return values


class UpdateUserBase(BaseModel):
    firstname: Optional[str] = Field(None, min_length=3)
    lastname: Optional[str] = Field(None)
    email: Optional[EmailStr] = Field(None)  # Optional
    phone: Optional[str] = Field(None, min_length=11)
    password: Optional[str] = Field(None, min_length=3)

    class Config:
        from_attributes = True


class UserDisplay(BaseModel):
    id: int
    firstname: str
    lastname: Optional[str]
    email: Optional[str]
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
    total: Optional[int] = 1
