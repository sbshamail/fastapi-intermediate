
from src.mvc.models.role import Role
from src.lib.hash import Hash
from src.mvc.models.user import User
from tests import *


# def admin_create

@pytest.fixture()
def user_initiate(db_engine,initiate):
    engine, SessionLocal = db_engine
    db = SessionLocal()

    # Create the roles first, only if they don't exist
    admin_role = db.query(Role).filter(Role.name == "admin").first()
    if not admin_role:
        admin_role = Role(id=1, name="admin", permissions=["all"])
        db.add(admin_role)

    user_role = db.query(Role).filter(Role.name == "user").first()
    if not user_role:
        user_role = Role(id=2, name="user", permissions=["view"])
        db.add(user_role)

    db.commit()  # Commit the roles to the database
    # create admin user
    admin_user = db.query(User).filter(User.username == "admin").first()
    if not admin_user:
        admin_create = User(
            id=1, 
            username="admin", 
            email="admin@gmail.com",  # Set a real email or an empty one if needed
            password=Hash.crypt("123"),  # Hash the password
            phone="03321904013", 
            role_id=admin_role.id  # Ensure correct role association
         )
        db.add(admin_create)
    # create default user
    default_user = db.query(User).filter(User.username == "user").first()
    if not default_user:
        user_create = User(
            id=2, 
            username="user", 
            email="user@gmail.com",  # Set a real email or an empty one if needed
            password=Hash.crypt("123"),  # Hash the password
            phone="03321904023", 
            role_id=user_role.id  # Ensure correct role association
        )
        db.add(user_create)
    # create test user
    test_user = db.query(User).filter(User.username == "test").first()
    if not test_user:
        test_user_create = User(
            id=3, 
            username="test", 
            email="test@gmail.com",  # Set a real email or an empty one if needed
            password=Hash.crypt("123"),  # Hash the password
            phone="03321904021", 
            role_id=user_role.id  # Ensure correct role association
        )
        db.add(test_user_create)

    db.commit()  # Commit the admin user

    db.refresh(admin_role)  
    db.refresh(user_role)  
    db.refresh(admin_create)
    db.refresh(user_create)
    db.refresh(test_user_create)
    
    # return admin_create, admin_role, user_role,user_create  # Optionally return the created objects

@pytest.fixture()
def recreate_auth_initiate(db_engine, user_initiate):
    engine, SessionLocal = db_engine
    db = SessionLocal()
    
    # Check if roles and users exist in the DB
    admin_role = db.query(Role).filter(Role.name == "admin").first()
    user_role = db.query(Role).filter(Role.name == "user").first()
    admin_user = db.query(User).filter(User.username == "admin").first()
    default_user = db.query(User).filter(User.username == "user").first()
    test_user = db.query(User).filter(User.username == "test").first()
    
    # If any required entity is missing, ensure that the user setup fixture runs
    if not all([admin_role, user_role, admin_user, default_user, test_user]):
        # user_initiate is automatically invoked as it's passed in as a fixture
        pass
    
    return admin_role, user_role, admin_user, default_user, test_user

def get_auth(client,json_data):
    # Log in as the admin user to obtain a JWT token
    response = client.post(
        "/login",
        json=json_data if json_data else {"email": "admin@gmail.com", "password": "123"},
    )
    assert response.status_code == 200
    response_data = response.json()
    assert "access_token" in response_data
    return response_data 

@pytest.fixture()
def login_as_admin(client,db_engine):
    engine, SessionLocal = db_engine
    db = SessionLocal()
    
    admin_user = db.query(User).filter(User.username == "admin").first()
    if not admin_user:
        admin_create = User(
            id=1, 
            username="admin", 
            email="admin@gmail.com",  # Set a real email or an empty one if needed
            password=Hash.crypt("123"),  # Hash the password
            phone="03321904013", 
            role_id=1  # Ensure correct role association
         )
        db.add(admin_create)
        db.commit()
    
    response = client.post(
        "/login",
        json={"email": "admin@gmail.com", "password": "123"},
    )
    assert response.status_code == 200
    response_data = response.json()
    assert "access_token" in response_data
    return response_data["access_token"]  # Return the access token

@pytest.fixture()
def login_as_user(client):
    # Log in as the admin user to obtain a JWT token
    response = client.post(
        "/login",
        json={"email": "user@gmail.com", "password": "123"},
    )
    assert response.status_code == 200
    response_data = response.json()
    assert "access_token" in response_data
    return response_data["access_token"]  # Return the access token

@pytest.fixture()
def login_wrong_password(client):
    # Log in as the admin user to obtain a JWT token
    response = client.post(
        "/login",
        json={"email": "user@gmail.com", "password": "123ab"},
    )
    assert response.status_code == 401
    return response.json()
    


def update_user(client,headers):
    response = client.put(
        "/user/update",
        headers=headers,
        json={
            "username": "user",
            "email": "user@gmail.com",
            # "password": Hash.crypt("123"),
            "phone": "03321901224",
        },
    )
    assert response.status_code == 200
    return response.json()

def update_user_by_admin(client,headers):
    response = client.put(
        "/user/update_by_admin?id=3",
        headers=headers,
        json={
            "username": "test",
            "email": "test1@gmail.com",
            "password": Hash.crypt("123"),
            "phone": "03321901220",
        },
    )
    assert response.status_code == 200
    return response.json()

def read_user_by_admin(client,headers):
    response = client.get(
        "/user/read?id=2&email=user@gmail.com&username=user ",
        headers=headers,
    )
   
    assert response.status_code == 200
    return response.json()

def read_user_by_wrong_admin(client,headers):
    response = client.get(
        "/user/read?id=2&email=user@gmail.com&username=user ",
        headers=headers,
    )
   
    assert response.status_code == 403
    return response.json()

def read_user_many_by_admin(client,headers):
    response = client.get(
        "/user/read_many?ids=[1,2]",
        headers=headers,
    )
   
    assert response.status_code == 200
    return response.json()

def delete_user_by_admin(client,headers):
    response = client.delete(
        "/user/delete/3",
        headers=headers,
    )
   
    assert response.status_code == 200
    return response.json()


def delete_many_user_by_admin(client,headers):
    response = client.delete(
        "/user/delete_many?ids=[1,2]",
        headers=headers,
    )
   
    assert response.status_code == 200
    return response.json()








