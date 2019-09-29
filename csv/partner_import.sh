#!/bin/sh
mongoimport --host myfirstcluster-shard-0/myfirstcluster-shard-00-00-zbcul.mongodb.net:27017,myfirstcluster-shard-00-01-zbcul.mongodb.net:27017,myfirstcluster-shard-00-02-zbcul.mongodb.net:27017 --ssl --username mike --password Password123 --authenticationDatabase admin --db missioncontrol --collection partners --type csv --file ./partners.csv --headerline
