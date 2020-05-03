#!/usr/bin/env bash

docker-compose down -t 0 --rmi local -v

docker container prune -f
docker image prune -f
docker network prune -f
docker volume prune -f

#docker rmi $(docker images --filter "dangling=true" -q --no-trunc)

# echo "remove all old data"
# rm -rf .database
