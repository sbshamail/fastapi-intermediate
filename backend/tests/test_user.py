from tests import *
from tests.functions.user_test_functions import *


def test_update_user(client, login_as_user):
    headers = {
        "Authorization": f"Bearer {login_as_user}",
    }
    response_data = update_user(client, headers)
    assert response_data["data"]["phone"] == "03321901224"
    assert "updated_at" in response_data["data"]


def test_update_user_by_admin(client, login_as_admin):
    headers = {
        "Authorization": f"Bearer {login_as_admin}",
    }
    response_data = update_user_by_admin(client, headers)
    assert response_data["data"]["phone"] == "03321901220"
    assert "updated_at" in response_data["data"]


def test_read_user_by_admin(client, login_as_user):
    headers = {
        "Authorization": f"Bearer {login_as_user}",
    }
    response_data = read_user_by_wrong_admin(client, headers)
    assert response_data["detail"] == "You do not have access to this resource"


def test_delete_user_by_admin(
    client,
    login_as_admin,
):
    headers = {
        "Authorization": f"Bearer {login_as_admin}",
    }
    response_data = delete_user_by_admin(client, headers)
    assert response_data["message"] == "Delete User Sucessfully where id is 3"


def test_delete_many_user_by_admin(client, login_as_admin):
    headers = {
        "Authorization": f"Bearer {login_as_admin}",
    }
    response_data = delete_many_user_by_admin(client, headers)
    assert response_data["message"] == "Users deleted successfully"
    assert response_data["deleted_count"] == 2


def test_list_user_by_filter(client, login_as_admin):
    # Now test fetching the user list with the Bearer token
    headers = {
        "Authorization": f"Bearer {login_as_admin}",
    }
    # Call the endpoint with the Bearer token
    response = client.get(
        "/user?searchTerm=admin@gmail.com&columnSearchTerms=[('firstname', 'admin'), ('id', 1)]",
        headers=headers,
    )

    # Assert the response status and content
    assert response.status_code == 200
    response_data = response.json()

    # Ensure the response contains user data
    assert "data" in response_data
    assert "total" in response_data
    assert "message" in response_data
    assert response_data["total"] > 0
