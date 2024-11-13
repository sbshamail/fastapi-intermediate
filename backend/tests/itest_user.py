import pytest
from sqlalchemy import text
from .utils import testRouter, TestingSessionLocal,engine
from src.mvc.models import User
from fastapi import status
from src.mvc.controller.user import authenticate_user,create_access_token
from src.mvc.models.user import User
from src.mvc.models.role import Role
from src.lib.hash import Hash

# def test_create_user():
#     request_data = {
#         "username": "test2",
#         "email": "test2@example.com",
#         "phone": "02234319442",
#         "password": "123",
   
#     }

#     response = testRouter.post("/user/create", json=request_data)
#     assert response.status_code == status.HTTP_201_CREATED
#     assert response.json()["username"] == request_data["username"]
#     assert response.json()["email"] == request_data["email"]
#     assert response.json()["phone"] == request_data["phone"]
#     # Optionally, check if user is actually in the database
#     db = TestingSessionLocal()
#     db_user = db.query(User).filter(User.username == request_data["username"]).first()
#     assert db_user is not None
#     assert db_user.email == request_data["email"]
#     db.close()
    


@pytest.fixture(scope='module')
def db():
    """Create a new database session for a test."""
    connection = engine.connect()
    transaction = connection.begin()
    session = TestingSessionLocal(bind=connection)

    yield session  # This is where the testing happens

    session.close()
    transaction.rollback()
    connection.close()

@pytest.fixture
def test_role_create(db):
    role = Role(name="admin", permissions=["admin"])
    db.add(role)
    db.commit()
    db.refresh(role)
    yield role
    db.delete(role)
    db.commit()
    with engine.connect() as connection:
        connection.execute(text("DELETE FROM roles;"))
        connection.commit()


@pytest.fixture
def test_user_create(db, test_role_create):
    user = User(
        username="admin",
        email="admin@gmail.com",
        password=Hash.crypt("123"),
        phone="03321904013",
        role_id=test_role_create.id
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    yield user
    db.delete(user)
    db.commit()
    with engine.connect() as connection:
        connection.execute(text("DELETE FROM users;"))
        connection.commit()


@pytest.fixture
def authenticate_admin(db, test_user_create):
    authenticated_user = authenticate_user("admin@gmail.com", '123', db)
    role = {
        "id": authenticated_user.role.id,
        "name": authenticated_user.role.name,
        "permissions": authenticated_user.role.permissions,
    }

    access_token = create_access_token(
        user_data={"email": authenticated_user.email, "id": authenticated_user.id, "role": role},
    )
    return access_token

def test_update_user(db, authenticate_admin):
    request_data = {
        'username': 'testuser'
    }

    # Ensure the user is in the database
    user_to_update = db.query(User).filter(User.email == "admin@gmail.com").first()
    assert user_to_update is not None, "User should exist in the database"

    # Send update request
    response = testRouter.put(
        '/user/update',
        json=request_data,
        headers={"Authorization": f"Bearer {authenticate_admin}"}
    )

    assert response.status_code == status.HTTP_200_OK

    updated_user = db.query(User).filter(User.id == user_to_update.id).first()
    assert updated_user.username == 'testuser'
