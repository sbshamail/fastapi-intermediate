from fastapi import FastAPI, status

###
from src.mvc.router import role, user, auth

from src.lib.database import engine
from src.mvc.models.base import Base

app = FastAPI()


@app.get("/hello", status_code=status.HTTP_201_CREATED)
async def root():
    return {"message": "Welcome to the FastAPI server!"}


app.include_router(user.router)
app.include_router(auth.router)
app.include_router(role.router)
# app.include_router(category.router)


# Base.metadata.drop_all(engine)
# Base.metadata.create_all(engine)
