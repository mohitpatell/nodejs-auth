#!/usr/bin/env bash
./scripts/down.sh

docker-compose up -d

docker exec -it master /bin/bash

sleep 1

if [[ -z "$NODE_ENV" ]]; then
    export NODE_ENV=development
fi

echo "NODE_ENV is: $NODE_ENV"
