from typing import Annotated, Any, Dict

from fastapi import Depends
from sqlalchemy.orm.session import Session
from src.mvc.controller.user import require_token, admin_require, requireRefreshToken

from src.lib.database import get_db


db_dependency = Annotated[Session, Depends(get_db)]
require_signin = Annotated[Dict[str, Any], require_token]
require_admin = Annotated[Dict[str, Any], admin_require]
require_refresh_token = Annotated[Dict[str, Any], requireRefreshToken]
