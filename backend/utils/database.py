from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import logging
from sqlalchemy.exc import SQLAlchemyError, OperationalError

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# "sqlite:///./todosapp.db"
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:123@localhost/marketdb"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
# , connect_args={"check_same_thread": False}

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    except OperationalError as e:
        logger.error(f"OperationalError: {e}")
        db.rollback()
    except SQLAlchemyError as e:
        logger.error(f"SQLAlchemyError: {e}")
        db.rollback()
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        db.rollback()
    finally:
        db.close()
