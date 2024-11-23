
from tests import *
from tests.functions.user_test_functions import *



# ->Test Cases

@pytest.mark.usefixtures("user_initiate")
def test_admin_signin(login_as_admin):
    print("test_signin OK")
    assert login_as_admin is not None  # Ensure the token is returned
    
def test_signin_wrong_password(login_wrong_password):
    print("test_signin_wrong_password OK")
    assert login_wrong_password["detail"] == "Invalid credentials" 
    
def test_get_auth(client):
    json_data={"email": "user@gmail.com", "password": "123"}
    auth = get_auth(client,json_data)
    assert auth["user"]["email"] =="user@gmail.com"
    assert auth["message"] =="Login successful"
    assert "refresh_token" in auth

def test_list_user(client, login_as_admin):
    # Now test fetching the user list with the Bearer token
    headers = {
        "Authorization": f"Bearer {login_as_admin}",
    }
    # Call the endpoint with the Bearer token
    response = client.get("/user", headers=headers)
    
    # Assert the response status and content
    assert response.status_code == 200
    response_data = response.json()
    
    print("list user")
    # Ensure the response contains user data
    assert "data" in response_data
    assert "total" in response_data
    assert "message" in response_data
    assert response_data["total"] > 0 
    
def test_list_user_without_admin(client, login_as_user):
    # Now test fetching the user list with the Bearer token
    headers = {
        "Authorization": f"Bearer {login_as_user}",
    }
    # Call the endpoint with the Bearer token
    response = client.get("/user", headers=headers)
    assert response.status_code == 403
    assert response.json()["detail"] == "You do not have access to this resource"
    

