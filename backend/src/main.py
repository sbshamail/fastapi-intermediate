from fastapi import FastAPI, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic import ValidationError

###
from src.mvc.router import role, user, auth

from src.lib.database import engine
from src.mvc.models.base import Base
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:4000",  # Or any other frontend URL you want to allow
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows requests from these origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allows all headers
)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc: RequestValidationError):
    print(exc)
    error_details = []
    for error in exc.errors():
        error_details.append(
            {
                "type": error["type"],
                "loc": error["loc"],
                "msg": error["msg"],
                "input": error["input"],
            }
        )
    return JSONResponse(
        status_code=422,
        content={"detail": error_details[0]["msg"], "error_details": exc.errors()},
    )


@app.get("/hello", status_code=status.HTTP_201_CREATED)
async def root():
    return {"message": "Welcome to the FastAPI server!"}


app.include_router(user.router)
app.include_router(auth.router)
app.include_router(role.router)
# app.include_router(category.router)


# Base.metadata.drop_all(engine)
# Base.metadata.create_all(engine)
