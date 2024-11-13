from typing import Annotated
from sqlalchemy.orm.session import Session
from fastapi import FastAPI, Depends, status
from sqlalchemy import StaticPool, create_engine, text
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import DeclarativeMeta, declarative_base
from fastapi.testclient import TestClient
import pytest
from src.lib.database import get_db
from src.lib.config import testdb
from src.lib.hash import Hash
from src.mvc.models.role import Role
from src.mvc.models.user import User
from src.main import app
from src.mvc.models.base import Base


# Create the engine using the test database URL
SQLALCHEMY_DATABASE_URL = testdb

connection_string = str(SQLALCHEMY_DATABASE_URL).replace(
    "postgresql", "postgresql+psycopg"
)

# Use this engine in your tests
# engine = create_engine(
#     SQLALCHEMY_DATABASE_URL,
#     connect_args={"check_same_thread": False},  # SQLite-specific argument
# )
# engine = create_engine(connection_string, connect_args={}, pool_recycle=300)

# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# Base.metadata.create_all(bind=engine)


# Create engine and sessionmaker for the test database
@pytest.fixture(scope="function")
def db_engine():
    # Use the test database URL
    engine = create_engine(connection_string, connect_args={}, pool_recycle=300)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    # Drop all tables after the test
    Base.metadata.drop_all(bind=engine)
    # Create all tables before the test
    Base.metadata.create_all(bind=engine)

    # Yield the engine and session to the test function
    yield engine, SessionLocal


# Dependency to get the database session for FastAPI
@pytest.fixture()
def override_get_db(db_engine):
    engine, SessionLocal = db_engine

    def _get_db():
        db = SessionLocal()
        try:
            yield db
        finally:
            db.close()

    # Override the dependency in FastAPI
    app.dependency_overrides[get_db] = _get_db
    yield _get_db  # Return the dependency for the test

    # Reset the dependency overrides after the test
    del app.dependency_overrides[get_db]


# def override_get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()


# Override the get_db dependency to use the test database session
# app.dependency_overrides[get_db] = override_get_db

# client = TestClient(app)


@pytest.fixture()
def client():
    return TestClient(app)


# Test database cleanup (ensure database state is reset after each test)
# @pytest.fixture(scope="function", autouse=True)
# def cleanup():
#     # Reset all tables (use SQLite's own syntax for resetting tables)
#     with engine.connect() as connection:
#         connection.execute(text("DELETE FROM roles"))
#         connection.execute(text("DELETE FROM users"))
#         connection.commit()
#     yield
#     with engine.connect() as connection:
#         connection.execute(text("DELETE FROM roles"))
#         connection.execute(text("DELETE FROM users"))
#         connection.commit()


@pytest.fixture()
def test_role(db_engine):
    engine, SessionLocal = db_engine
    db = SessionLocal()
    # Create the role using the API's /role/create endpoint
    role = Role(name="admin", permissions=["admin"])

    db.add(role)
    db.commit()  # Commit role to the database
    db.refresh(role)  # Refresh to get the role's id after commit
    yield role
    with engine.connect() as connection:
        connection.execute(text("DELETE FROM roles"))
        connection.commit()


def test_create_role(client, test_role):
    response = client.post(
        "/role/create", json={"name": "admin", "permissions": ["admin"]}
    )
    assert response.status_code == 201
    role = test_role
    # assert response.json() == {
    #     "id": 18,
    #     "name": "admin",
    #     "permissions": ["admin"],
    #     "created_at": role.created_at.isoformat(),
    #     "updated_at": None,
    # }
    print(f"id:{role.id} name:{role.name}")


def test_list_role(test_role):
    response = client.get("/role")
    assert response.status_code == 200
    print(test_role)
    # assert response.json() == [
    #     {
    #         "id": test_role.id,
    #         "name": "admin",
    #         "permissions": ["admin"],
    #         "created_at": test_role.created_at.isoformat(),
    #         "updated_at": None,
    #     }
    # ]


# json={"name": "admin", "permissions": ["admin"]}
# @pytest.fixture
# def test_user_create(db, test_role_create):
#     # Create a user linked to the 'admin' role
#     user = User(
#         username="admin",
#         email="admin@gmail.com",
#         password=Hash.crypt(
#             "123"
#         ),  # Assuming Hash.crypt is your password hashing method
#         phone="03321904013",
#         role_id=test_role_create.id,  # Associate with the 'admin' role
#     )
#     db.add(user)
#     db.commit()  # Commit user to the database
#     db.refresh(user)  # Refresh to get the user's id after commit
#     return user  # Return the created user
