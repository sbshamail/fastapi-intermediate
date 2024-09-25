from src.testclient import TestClient
from src.main import app


# Test case : Test Sample
def test_root_path():
    client = TestClient(app=app)
    response = client.get("/hello")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to the FastAPI server!"}
