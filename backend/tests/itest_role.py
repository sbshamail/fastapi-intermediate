from .utils import testRouter, TestingSessionLocal
from fastapi import status
from src.mvc.models import Role


def test_role_admin():
    request_data = {
        "name": "admin",
        "permissions": ["admin"]
    }

    response = testRouter.post("/role/create", json=request_data)
    assert response.status_code == status.HTTP_201_CREATED
    assert response.json()["name"] == request_data["name"]
    assert response.json()["permissions"] == request_data["permissions"]
    assert "created_at" in response.json()  # Check if created_at exists
    
    db = TestingSessionLocal()
    model = db.query(Role).filter(Role.name == request_data["name"]).first()  # Filter by name instead of fixed ID
    assert model is not None  # Ensure the model was created
    assert model.name == request_data.get('name')
    assert model.permissions == request_data.get('permissions')

    db.close()

def test_role_user():
    request_data = {
        "name": "user",
        "permissions": ["user"]
    }

    response = testRouter.post("/role/create", json=request_data)
    assert response.status_code == status.HTTP_201_CREATED
    assert response.json()["name"] == request_data["name"]
    assert response.json()["permissions"] == request_data["permissions"]
    assert response.json()["created_at"]
    db = TestingSessionLocal()
    model = db.query(Role).filter(Role.name == request_data["name"]).first()  # Filter by name instead of fixed ID
    assert model is not None  # Ensure the model was created
    assert model.name == request_data.get('name')
    assert model.permissions == request_data.get('permissions')

    db.close()

def list():
    response = testRouter.get("/role")
    assert response.status_code == status.HTTP_200_OK
    roles = response.json()
    
    # Ensure roles is a list and contains expected role structures
    assert isinstance(roles, list)
    
    expected_keys = {'name', 'permissions', 'created_at', 'updated_at'}
    for role in roles:
        assert isinstance(role, dict)
        assert expected_keys.issubset(role.keys())  # Ensure all keys exist
        assert role["name"] in ["admin", "user"]  # Check expected role names