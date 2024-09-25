from datetime import datetime
from typing import Optional
from pydantic import Field, BaseModel


class RoleBase(BaseModel):
    name: str = Field(min_length=3)
    permissions: list = Field(...)


class RoleDisplay(BaseModel):
    name: str
    id: int
    permissions: Optional[list]
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True
