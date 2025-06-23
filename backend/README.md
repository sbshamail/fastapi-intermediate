# Step 1: Set up your environment

## If not already done:

`curl -sSL https://install.python-poetry.org | python3 - --preview`

## Then add Poetry to your PATH:

`export PATH="/home/hamail/.local/bin:$PATH"`

## Step 2: Install dependencies , This installs all packages listed in your pyproject.toml.

`poetry install`

## Step 3: Enter the Poetry shell

`poetry shell`

## Step 4: Run the FastAPI server

`uvicorn src.main:app --host 0.0.0.0 --port 8002 --reload`

## Step 5: Alembic setup and migrations

```bash
rm -rf migrations/
rm alembic.ini
poetry run alembic init migrations
```

### Update alembic.ini

`script_location = migrations`

### Update migrations/env.py

#### write in envpy

```bash
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

## Step 6: Generate & apply migrations

```bash
poetry run alembic revision --autogenerate -m "Initial migration"
poetry run alembic upgrade head
```

## - test

```bash
poetry add pytest #package install
poetry run pytest -v -s
# flag -v(show passed failed) -s(show print value)
```

## Links

- `https://python-poetry.org/docs`
- `https://github.com/panaverse/learn-generative-ai/tree/main/05_microservices_all_in_one_platform/09_create_project`
- `https://github.com/panaverse/learn-generative-ai/tree/main/05_microservices_all_in_one_platform/10_microservice_helloworld`

- `https://src.tiangolo.com/tutorial`
