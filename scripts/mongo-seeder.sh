#!/bin/sh
mongoimport --host mongo --db yensesa --collection users --type json --file /users.json --jsonArray