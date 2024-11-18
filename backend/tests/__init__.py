
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

    def _get_db():
        db = SessionLocal()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = _get_db

    # Yield the dependency to the test

    yield engine, SessionLocal

    del app.dependency_overrides[get_db]
    engine.dispose()


@pytest.fixture()
def client():
    return TestClient(app)


# @pytest.fixture()
# def initiate(db_engine):
#     engine, SessionLocal = db_engine
#     Base.metadata.drop_all(bind=engine)  # Clean the database before each test
#     Base.metadata.create_all(bind=engine)  # Recreate tables

