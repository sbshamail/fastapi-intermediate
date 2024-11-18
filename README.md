# docker commands

```
docker ps -ls
docker rmi <image>
docker image prune --all --force
```

## delete all stopped containers

```
docker system prune
```

## inside docker

```
docker exec -it myapi-fastapi-1 /bin/sh
ls
poetry show
exit
```

## docker log

```
docker logs -f <container>
```

## validate or test compose file before up

```
 docker compose config
```

## start compose

```
docker compose up -d
```

## down compose

```
docker compose down
# -v remove competely
docker compose down -v
```

## docker build rebuild the image

```
docker compose up -d --build
```

## docker compose log

f means Follow the log output

```
docker compose logs -f fastapi
```
