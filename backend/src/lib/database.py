from fastapi import HTTPException
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import SQLAlchemyError, OperationalError
from src.lib.config import db
from src.utils.helpers import log_error
import re

SQLALCHEMY_DATABASE_URL = db
# "sqlite:///./todossrc.db"

connection_string = str(SQLALCHEMY_DATABASE_URL).replace(
    "postgresql", "postgresql+psycopg"
)

engine = create_engine(connection_string, connect_args={}, pool_recycle=300)
# , connect_args={"check_same_thread": False}

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    except OperationalError as e:
        log_error(__name__, f"OperationalError: {e}")
        db.rollback()
        raise HTTPException(status_code=500, detail="Database operational error")
    except SQLAlchemyError as e:
        log_error(__name__, f"SQLAlchemyError: {e.orig}")
        error_message = "Database error"
        if hasattr(e, "orig") and e.orig:
            orig_error = str(e.orig)

            if "duplicate key value violates unique constraint" in orig_error:
                match = re.search(r"Key \((\w+)\)=\(([\w\-\s]+)\)", orig_error)
                if match:
                    field = match.group(1)
                    value = match.group(2)
                error_message = f"{field.capitalize()} '{value}' already exists."
            elif "is not present in table" in orig_error:
                match = re.search(
                    r"Key \((\w+)\)=\((\d+)\) is not present in table \"(\w+)\"",
                    orig_error,
                )
                if match:
                    field = match.group(1)  # This is 'role_id'
                    value = match.group(2)  # This is '3'
                    table_name = match.group(3)  # This is 'roles'
                    error_message = f"{field.capitalize()} '{value}' is not present in table '{table_name}'."

        db.rollback()
        raise HTTPException(status_code=400, detail=error_message)
    # except Exception as e:
    #     log.error(f"Unexpected error: {e}")
    #     db.rollback()
    #     raise HTTPException(status_code=500, detail="Unexpected error")
    finally:
        db.close()
