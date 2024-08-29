from fastapi import Depends, FastAPI, HTTPException

from pydantic import BaseModel
from starlette.responses import JSONResponse
from sqlalchemy.exc import SQLAlchemyError
from starlette.requests import Request
import logging
from jose import jwt, JWTError


###
from backend.controller.auth import require_signin
from backend.router import auth
from backend.utils import models
from backend.utils.database import engine
from backend.router import user

app = FastAPI()
# Logger configuration
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("uvicorn")


@app.exception_handler(SQLAlchemyError)
async def database_exception_handler(request: Request, exc: SQLAlchemyError):
    logger.error(f"Database error: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": "A database error occurred. Please try again later."},
    )


@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unexpected error: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": "An unexpected error occurred. Please try again later."},
    )


class Login(BaseModel):
    identifier: str
    password: str


@app.get("/hello")
async def root():
    return {"message": "Welcome to the FastAPI server!"}


@app.post("/token")
def login(login: Login):
    # Implement your authentication logic here
    if login.identifier == "test@gmail.com" and login.password == "123":
        # Example JWT token creation
        token = jwt.encode(
            {"sub": login.identifier}, "your_secret_key", algorithm="HS256"
        )
        return {"access_token": token, "token_type": "bearer"}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")


@app.get("/secure-endpoint")
async def secure_endpoint(
    user: dict = Depends(require_signin),
):
    return {"user": user}


# app.include_router(user.router)
# app.include_router(auth.router)

models.Base.metadata.create_all(engine)
