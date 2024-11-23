from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from fastapi.testclient import TestClient
import pytest
from src.lib.database import get_db
from src.lib.config import testdb
from src.main import app
from src.mvc.models.base import Base


@pytest.fixture(scope="function")
def db_engine():
    # Use the test database URL
    connection_string = str(testdb).replace("postgresql", "postgresql+psycopg")
    engine = create_engine(connection_string, connect_args={}, pool_recycle=300)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    
    # Create all tables before the test
    Base.metadata.create_all(bind=engine)

    # Yield the engine and session to the test function
    yield engine, SessionLocal

    # Cleanup after the test run
    engine.dispose()


@pytest.fixture()
def override_get_db(db_engine):
    engine, SessionLocal = db_engine  # Get the engine and session from db_engine fixture
    # Return a function that provides the db session
    def _get_db():
        db = SessionLocal()
        try:
            yield db  # This will provide the db session to the test
        finally:
            db.close()

    return _get_db


@pytest.fixture()
def client(override_get_db):
    app.dependency_overrides[get_db] = override_get_db
    return TestClient(app)


@pytest.fixture()
def initiate(db_engine):
    engine, SessionLocal = db_engine
    Base.metadata.drop_all(bind=engine)  # Clean the database before each test
    Base.metadata.create_all(bind=engine)  # Recreate tables
