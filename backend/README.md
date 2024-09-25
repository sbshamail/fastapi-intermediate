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

```
 poetry shell
 uvicorn src.main:app --port 8002 --reload
```

# Alembic Commands

- install

```
poetry run alembic
poetry run alembic init migration

```

## - in .env.py

```
import models

config = context.config

fileConfig(config.config_file_name)

target_metadata = models.Base.metadata

```

## in - alembic.ini

```
script_location = migrations
```

## - commands cli

```
poetry run alembic revision --autogenerate -m "msg"
poetry run alembic upgrade head
```
