`curl -sSL https://install.python-poetry.org | python3 - --preview`

# export PATH="/home/hamail/.local/bin:$PATH"

## Links

- `https://python-poetry.org/docs`
- `https://github.com/panaverse/learn-generative-ai/tree/main/05_microservices_all_in_one_platform/09_create_project`
- `https://github.com/panaverse/learn-generative-ai/tree/main/05_microservices_all_in_one_platform/10_microservice_helloworld`

- `https://src.tiangolo.com/tutorial`

## command to run server

- `poetry run uvicorn src.main:app --host 0.0.0.0 --port 8002`

### hot reload

- `--reload`

## configure poetry that run server with uvicorn directly

```cli
 poetry shell
 uvicorn src.main:app --port 8002 --reload
```

# Alembic Commands

- install

```cli
poetry run alembic
poetry run alembic init migration

```

## - in .env.py

```write in envpy
from logging.config import fileConfig
from sqlalchemy import engine_from_config
from sqlalchemy import pool
from alembic import context
from src.lib.config import db
from src.mvc.models.base import Base

SQLALCHEMY_DATABASE_URL = db

config = context.config
config.set_main_option("sqlalchemy.url", SQLALCHEMY_DATABASE_URL)

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = Base.metadata
```

## in - alembic.ini

```text
script_location = migrations
```

## - commands cli

```cli
poetry run alembic revision --autogenerate -m "msg"
poetry run alembic upgrade head
```

## - test

```cli
poetry add pytest #package install
poetry run pytest
# print is working with flag s
poetry run pytest -s
```

## alembic recreate

```cli
rm -rf migrations/*
rm alembic.ini
poetry run alembic init migrations
poetry run alembic revision --autogenerate -m "Initial migration"
poetry run alembic upgrade head
```
