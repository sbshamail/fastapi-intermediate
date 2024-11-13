import logging
from sqlalchemy.orm.session import Session


def dbModel(db: Session, model: str):
    return db.query(model)


# Logger configuration


def log_error(name, msg):
    logging.basicConfig(level=logging.INFO)
    return logging.getLogger(name).error(msg)


logging.basicConfig(level=logging.INFO)
log = logging.getLogger(__name__)
