from fastapi.testclient import TestClient
from src.main import app
from fastapi import status

# from .utils import *


# Test case : Test Sample
def test_root_path():
    client = TestClient(app)

    response = client.get("/hello")

    assert response.status_code == status.HTTP_201_CREATED
    assert response.json() == {"message": "Welcome to the FastAPI server!"}
