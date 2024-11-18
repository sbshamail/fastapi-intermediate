
from src.lib.hash import Hash
from src.mvc.models.user import User
from tests import client,db_engine,initiate




def test_create_user_first_admin(client, db_engine):
    engine, SessionLocal = db_engine
    response = client.post(
        "/user/create",
        json={
            "username": "admin",
            "email": "admin@gmail.com",
            "password": Hash.crypt("123"),
            "phone": "03321904013",
        },
    )
    assert response.status_code == 201  # Assert that the user is created successfully

    # Validate that the first user has been assigned the "admin" role
    with SessionLocal() as db:
        user = db.query(User).filter_by(email="admin@gmail.com").first()
        assert user is not None
        assert user.role.name == "admin"  # Ensure the role is admin

 
# @pytest.fixture()
# def test_role(db_engine, initiate):
#     engine, SessionLocal = db_engine
#     db = SessionLocal()
#     # Create the role using the API's /role/create endpoint
#     role = Role(name="admin", permissions=["admin"])

#     db.add(role)
#     db.commit()  # Commit role to the database
#     db.refresh(role)  # Refresh to get the role's id after commit
#     yield role
#     with engine.connect() as connection:
#         connection.execute(text("DELETE FROM roles"))
#         connection.commit()


# def test_list_role(client, test_role):
#     # List all roles using the client
#     response = client.get("/role")

#     assert response.status_code == 200
#     # assert response.json == [
#     #     {
#     #         "name": "admin",
#     #         "permissions": ["admin"],
#     #         "id": test_role.id,
#     #         "created_at": test_role.created_at.isoformat(),
#     #         "updated_at": None,
#     #     }
#     # ]
#     roles = response.json()  # This should be a list of roles
#     assert len(roles) > 0  # You should have at least 1 role (test_role)
#     print(response.json()[-1])
#     role_names = [role["name"] for role in roles]
#     assert "admin" in role_names


# def test_create_role(client, db_engine):
#     engine, SessionLocal = db_engine
#     response = client.post(
#         "/role/create", json={"name": "admin", "permissions": ["admin"]}
#     )
#     assert response.status_code == 201

#     # print(f"{response}")
#     with engine.connect() as connection:
#         connection.execute(text("DELETE FROM roles"))
#         connection.commit()


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
